import jwt from "jsonwebtoken";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig(event);
        const body = await readBody(event);
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

        const noteTryingToUpdate = await prisma.note.findUnique({
            where: {
                id: Number(id),
            },
        });

        if (!noteTryingToUpdate) {
            throw createError({
                statusCode: 401,
                statusMessage: "Note does not exist",
            });
        }

        if (noteTryingToUpdate.userId !== decodedToken.id) {
            throw createError({
                statusCode: 401,
                statusMessage: "Does not have permission to update note",
            });
        }

        console.log(id);

        await prisma.note.update({
            where: {
                id: Number(id),
            },
            data: {
                text: body.updatedNote,
            },
        });
        console.log(body);
    } catch (err) {
        console.log(err);
    }
});
