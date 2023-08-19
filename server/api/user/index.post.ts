import { user } from "../../dbModels";

export default defineEventHandler(async (event) => {
  console.log("POST /api/user.post");
  const body = await readBody(event);
  try {
      const newUserData = await user.create({
        ...body,
        score: 0,
      });
      return {
      id: newUserData._id,
      name: newUserData.name,
      email: newUserData.email,
      };
  
  } catch (err) {
    console.dir(err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something wrong.",
    };
  }
});