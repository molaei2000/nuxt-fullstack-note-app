import jwt from "jsonwebtoken";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig(event);
        const id = getRouterParam(event, "id");

        const cookies = parseCookies(event);
        const token = cookies.NoteNestJWT;

        if (!token) {
            throw createError({
                statusCode: 401,
                statusMessage: "Not authorized to update",
            });
        }

        const decodedToken = jwt.verify(
            token,
            config.jwtSecret
        ) as CustomJwtPayload;

        const noteTryingToDelete = await prisma.note.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!noteTryingToDelete) {
            throw createError({
                statusCode: 401,
                statusMessage: "Note does not exist",
            });
        }

        if (noteTryingToDelete.userId !== decodedToken.id) {
            throw createError({
                statusCode: 401,
                statusMessage: "Does not have permission to update note",
            });
        }

        await prisma.note.delete({
            where: {
                id: Number(id),
            },
        });
    } catch (err) {
        console.log(err);
    }
});
