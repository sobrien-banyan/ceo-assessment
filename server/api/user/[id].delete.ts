import { user } from "../../dbModels";

export default defineEventHandler(async (event: any) => {
const userId = event.context.params.id;
  console.log("DELETE /api/user/[id].delete");
  console.log("userId: ", userId);
  try {
      const deletedUserData = await user.deleteOne({
        id: userId,
      });
      return {
      ...deletedUserData,
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