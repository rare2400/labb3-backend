import { ResponseToolkit, ServerRoute, Request } from "@hapi/hapi";
import Product, { IProduct } from "../models/Product";


export const productRoutes: ServerRoute[] = [
  {
    // GET /api/products: fetch all products
    method: "GET",
    path: "/api/products",
    options: { auth: false }, // No authentication required
    handler: async (_request: Request, h: ResponseToolkit) => {
      const products = await Product.find().sort({ createdAt: -1 });

      return h.response(products).code(200);
    },
  },
  {
    // GET /api/products/{id}: fetch one product by ID
    method: "GET",
    path: "/api/products/{id}",
    options: { auth: false }, // No authentication required
    handler: async (request: Request, h: ResponseToolkit) => {
      const product = await Product.findById(request.params.id);

      if (!product) {
        return h.response({ message: "Produkten hittades inte" }).code(404);
      }

      return h.response(product).code(200);
    },
  },
  {
    // POST /api/products: create new product (protected)
    method: "POST",
    path: "/api/products",
    handler: async (request: Request, h: ResponseToolkit) => {
      const product = await Product.create(request.payload as Partial<IProduct>);

      return h.response(product).code(201);
    },
  },
  {
    // PUT /api/products/{id}: update existing product (protected)
    method: "PUT",
    path: "/api/products/{id}",
    handler: async (request: Request, h: ResponseToolkit) => {
      const product = await Product.findByIdAndUpdate(
        request.params.id,
        request.payload as Partial<IProduct>,
        { new: true, runValidators: true }
      );

      if (!product) {
        return h.response({ message: "Produkten hittades inte" }).code(404);
      }

      return h.response(product).code(200);
    },
  },
  {
    // DELETE api/products/{id}: delete product based on id (protected)
    method: "DELETE",
    path: "/api/products/{id}",
    handler: async (request: Request, h: ResponseToolkit) => {
      const product = await Product.findByIdAndDelete(request.params.id);
      
      if (!product) {
        return h.response({ message: "Produkten hittades inte" }).code(404);
      }

      return h.response({ message: "Produkt borttagen" }).code(200);
    },
  },
];