import jwt from "jsonwebtoken";
import prisma from "~~/lib/prisma";

export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig(event);
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

        const newNote = await prisma.note.create({
            data: {
                text: "",
                title: "new note",
                userId: decodedToken.id,
            },
        });

        return newNote;
    } catch (err) {
        throw createError({
            statusCode: 500,
            statusMessage: "Could not verify jwt",
        });
    }
});
