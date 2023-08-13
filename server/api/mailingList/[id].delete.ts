import { email } from "../../dbModels";

export default defineEventHandler(async (event: any) => {
const emailId = event.context.params.id;
  console.log("DELETE /api/mailingList/[id].delete");
  console.log("emailId: ", emailId);
  try {
      const deletedEmailData = await email.deleteOne({
        id: emailId,
      });
      return {
      ...deletedEmailData,
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