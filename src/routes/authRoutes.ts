import { ServerRoute, ResponseToolkit, Request } from "@hapi/hapi";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User";

// Routes for user authentication and management
export const authRoutes: ServerRoute[] = [
    // POST /api/auth/register: register new user with username and password
    {
        method: "POST",
        path: "/api/auth/register",
        options: { auth: false }, // no authentication required
        handler: async (request: Request, h: ResponseToolkit) => {
            try {
                const { username, password } = request.payload as { username: string; password: string };

                // Check if username already exists
                const existing = await User.findOne({ username });
                if (existing) {
                    return h.response({ message: "Användarnamnet är upptaget" }).code(409);
                }

                // Hash the password and create new user
                const hashed = await bcrypt.hash(password, 10);
                const user = await User.create({ username, password: hashed });

                return h.response({ message: "Registrering lyckades", userId: user._id }).code(201);
            } catch (err) {
                console.error("Registration error:", err);
                return h.response({ message: "Något gick fel vid registrering" }).code(500);
            }
        }
    },
    // POST /api/auth/login: login user with username and password, return JWT token
    {
        method: "POST",
        path: "/api/auth/login",
        options: { auth: false }, // No authentication required
        handler: async (request: Request, h: ResponseToolkit) => {
            try {
                const { username, password } = request.payload as { username: string; password: string };

                // Find user by username
                const user = await User.findOne({ username });
                if (!user) {
                    return h.response({ message: "Felaktiga uppgifter" }).code(401);
                }

                // Compare password with hashed password in database
                const valid = await bcrypt.compare(password, user.password);
                if (!valid) {
                    return h.response({ message: "Felaktiga uppgifter" }).code(401);
                }

                // Generate JWT with 8 hours expiration
                const token = jwt.sign(
                    { id: user._id, username: user.username },
                    process.env.JWT_SECRET as string,
                    { expiresIn: "8h" }
                );

                return h.response({ token }).code(200);
            }
            catch (err) {
                console.error("Login error:", err);
                return h.response({ message: "Något gick fel vid inloggning" }).code(500);
            }
        }
    },
    // GET /api/users: get all users (protected route)
    {
        method: "GET",
        path: "/api/users",
        handler: async (_request: Request, h: ResponseToolkit) => {
            const users = await User.find()
                .select("-password") // Exclude password field
                .sort({ createdAt: -1 });
            return h.response(users).code(200);
        },
    },
    // GET /api/users/{id}: get user by id (protected route)
    {
        method: "GET",
        path: "/api/users/{id}",
        handler: async (_request: Request, h: ResponseToolkit) => {
            const user = await User.findById(_request.params.id)
                .select("-password"); // Exclude password field
            if (!user) return h.response({ message: "Användaren hittades inte" }).code(404);
            return h.response(user).code(200);
        },
    },
    // PUT /api/users/{id}: update user by id (protected route)
    {
        method: "PUT",
        path: "/api/users/{id}",
        handler: async (request: Request, h: ResponseToolkit) => {
            try {
                const payload = request.payload as { username?: string; password?: string };

                // Hash new password if updated
                if (payload.password) {
                    payload.password = await bcrypt.hash(payload.password, 10);
                }

                // Update user and return updated document without password
                const user = await User.findByIdAndUpdate(
                    request.params.id,
                    payload,
                    { new: true, runValidators: true }
                ).select("-password");

                if (!user) {
                    return h.response({ message: "Användaren hittades inte" }).code(404);
                }

                return h.response(user).code(200);
            } catch (err) {
                console.error("Update user error:", err);
                return h.response({ message: "Något gick fel vid uppdatering" }).code(500);
            }
        },
    },
    // DELETE /api/users/{id}: delete user by id (protected route)
    {
        method: "DELETE",
        path: "/api/users/{id}",
        handler: async (request: Request, h: ResponseToolkit) => {
            const user = await User.findByIdAndDelete(request.params.id);
            if (!user) {
                return h.response({ message: "Användaren hittades inte" }).code(404);
            }
            return h.response({ message: "Användare borttagen" }).code(200);
        }
    }
];