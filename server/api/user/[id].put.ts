import { user } from "../../dbModels";

export default defineEventHandler(async (event: any) => {
  const userId = event.context.params.id;
  console.log("PUT /api/user/[id]");
  const body = await readBody(event);
  try {
    const newUserData = await user.findByIdAndUpdate(userId, { ...body });
    return {
      code: "SUCCESS",
      message: "User data updated successfully.",
      updatedUserData: newUserData,
    };
  } catch (err: any) {
    console.error(err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
      error: err.message, // Include the error message for debugging
    };
  }
});