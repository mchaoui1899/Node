import mongoose, { Schema, Document } from "mongoose";

// 1. Interface TypeScript pour le typage dans le code
export interface IUser extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
  role: "user" | "admin";
  createdAt: Date;
  updatedAt: Date;
}

// 2. Schéma Mongoose définissant les règles et contraintes dans MongoDB
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Le nom est obligatoire"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "L'email est obligatoire"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Le nom d'utilisateur est obligatoire"],
      unique: true,
      trim: true,
      minlength: [1, "Le nom d'utilisateur doit contenir au moins 1 caractère"],
      maxlength: [20, "Le nom d'utilisateur ne peut pas dépasser 20 caractères"],
    },
    password: {
      type: String,
      required: [true, "Le mot de passe est obligatoire"],
      minlength: [6, "Le mot de passe doit contenir au moins 6 caractères"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true, // Ajoute automatiquement createdAt et updatedAt
  }
);

// 3. Export du Modèle Mongoose
export const User = mongoose.model<IUser>("User", userSchema);
export default User;

