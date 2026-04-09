import Hapi from "@hapi/hapi";
import dotenv from "dotenv";
import { connectDB } from "./db/db";
import { registerJwt } from "./plugins/jwt";
import { authRoutes } from "./routes/authRoutes";
import { productRoutes } from "./routes/productsRoutes";

// Load environment variables from .env file
dotenv.config();

// Initialize and start server
const init = async (): Promise<void> => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Create Hapi server instance
    const server = Hapi.server({
      port: process.env.PORT || 3000,
      host: "0.0.0.0",

      // Enable CORS for all routes
      routes: {
        cors: {
          origin: ["*"],
          headers: ["Accept", "Content-Type", "Authorization"],
        },
      },
    });

    // Log server errors
    server.events.on("request", (request, event, tags) => {
      if (tags.error) {
        console.error("Request error:", event);
      }
    });

    // Register JWT authentication plugin
    await registerJwt(server);

    // Register routes
    server.route([...authRoutes, ...productRoutes]);

    // Start the server
    await server.start();
    console.log(`Server körs på ${server.info.uri}`);

  } catch (err) {
    console.error("Server failed to start:", err);
    process.exit(1);
  }
};

init();