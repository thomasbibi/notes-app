import { verifyToken } from "../../utils/jwt.js";

export const userAuthenticate = async (req, res, next) => {
    try {

        const { headers } = req;
        const authorizationHeader = headers["authorization"];

        if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
            throw new Error("Bearer token missing or invalid");
        }

        const token = authorizationHeader.split(" ")[1];
        const decodedToken = await verifyToken(token);
        req.session = decodedToken;
        next();
    } catch (error) {
        res.status(401).json({message : error.message});

    }
};

