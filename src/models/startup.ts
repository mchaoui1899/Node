import mongoose, { Schema, Document } from "mongoose";

export interface IFounder {
  name: string;
  role: string;
}

export interface IBusinessAddress {
  street: string;
  city: string;
  state: string;
}

export interface IStartup extends Document {
  id: number;
  name: string;
  industry: string;
  founded: number;
  country: string;
  continent: string;
  business_address: IBusinessAddress;
  founders: IFounder[];
  employees: number;
  website: string;
  mission_statement: string;
  description: string;
  is_seeking_funding: boolean;
  has_mvp: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const startupSchema = new Schema<IStartup>(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    industry: { type: String, required: true },
    founded: { type: Number, required: true },
    country: { type: String, required: true },
    continent: { type: String, required: true },
    business_address: {
      street: { type: String, default: "" },
      city: { type: String, default: "" },
      state: { type: String, default: "" },
    },
    founders: [
      {
        name: { type: String, required: true },
        role: { type: String, required: true },
      },
    ],
    employees: { type: Number, default: 0 },
    website: { type: String, default: "" },
    mission_statement: { type: String, default: "" },
    description: { type: String, default: "" },
    is_seeking_funding: { type: Boolean, default: false },
    has_mvp: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

export const Startup = mongoose.model<IStartup>("Startup", startupSchema);
export default Startup;
