import prisma from "~~/lib/prisma";
import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(body.password, salt);
    await prisma.user.create({
        data: {
            email: body.email,
            password: passwordHash,
        },
    });
    console.log(body);
    return { data: { success: true } };
});
