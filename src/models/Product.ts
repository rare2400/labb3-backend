import mongoose, { Document, Schema } from "mongoose";

// Interface for Product document
export interface IProduct extends Document {
  name: string;
  price: number;
  quantity: number;
  category?: string;
}

// Define schema for Product collection
const productSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, default: 0 , min: 0 },
    category: { type: String },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// export Product model
export default mongoose.model<IProduct>("Product", productSchema);