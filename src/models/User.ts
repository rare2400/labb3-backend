import mongoose, { Document, Schema } from "mongoose";

// Interface for User document
export interface IUser extends Document {
    username: string;
    password: string;
}

// User collection schema
const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true, trim: true, minlength: 3 },
    password: { type: String, required: true }
},
{
    timestamps: true,
});

// Export User model
export default mongoose.model<IUser>("User", userSchema);