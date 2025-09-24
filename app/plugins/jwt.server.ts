import jwt from "jsonwebtoken";

export default defineNuxtPlugin(() => {
    return {
        provide: {
            verifyJwtToken: (
                token: string,
                secret: jwt.Secret,
                options?: jwt.VerifyOptions
            ) => {
                return jwt.verify(token, secret, options);
            },
        },
    };
});
