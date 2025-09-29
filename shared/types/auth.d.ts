// declare module "jsonwebtoken" {
//     export interface JwtPayload {
//         id: number;
//     }
// }

interface CustomJwtPayload extends JwtPayload {
    id: number;
}
