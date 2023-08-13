import { email } from "../../dbModels";
export default defineEventHandler(async (event) => {
  console.log("GET /api/email.get");
  try {
    const Data = await email.find();
    return Data.map((record) => ({
      id: record._id,
      email: record.email,
      createdAt: record.createdAt,
    }));
  } catch (err) {
    console.dir(err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});