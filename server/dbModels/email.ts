import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    
  },
  { timestamps: true, strict: true, strictQuery: true }
);
export default mongoose.model("Email", schema, "email");