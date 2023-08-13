import mongoose from "mongoose";
// import bcrypt from "mongoose-bcrypt";
const schema = new mongoose.Schema(
  {
    name: String,
    email: String,
    title: String,
    role: String,
    organizationName: String,
    workLocation: String,
    employeeCount: String,
    primaryReason: String,
    howDidYouHearAboutUs: String,
    score: Number,
    results: String,

  },
  { timestamps: true, strict: true, strictQuery: true }
);
// schema.plugin(bcrypt);
export default mongoose.model("User", schema, "user");