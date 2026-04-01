import Hapi from "@hapi/hapi";
import hapiAuthJwt2 from "hapi-auth-jwt2";

// Interface for decoded JWT payload
interface JwtPayload {
    id: string;
    username: string;
}

// Interface for validation result
interface ValidationResult {
    isValid: boolean;
}

// Validation function to check if decoded JWT payload is valid
const validate = async (decoded: JwtPayload): Promise<ValidationResult> => {
    if (!decoded.id) return { isValid: false };
    return { isValid: true };
};

// Register JWT authentication plugin and strategy
export const registerJwt = async (server: Hapi.Server): Promise<void> => {
    // Register JWT plugin
    await server.register(hapiAuthJwt2);

    // Ensure JWT_SECRET is defined in environment variables
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    // Define JWT authentication strategy
    server.auth.strategy("jwt", "jwt", {
        key: secret,
        validate,
        verifyOptions: { algorithms: ["HS256"] }, // 
    });

    // Set JWT as the default authentication for all routes
    server.auth.default("jwt");
};