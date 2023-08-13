import { email } from "../../dbModels";

export default defineEventHandler(async (event) => {
  console.log("POST /api/email.post");
  const body = await readBody(event);
  try {
    const emailData = await email.findOne({
      ...body,
    });
    if (emailData) {
      console.log(`User with email ${body.email} already exists`);
      event.node.res.statusCode = 409;
      return {
        code: "EMAIL_EXISTS",
        message: "Email already exists.",
      };
    } else {
      await email.create({
        ...body
      });
      return
    }
  } catch (err) {
    console.dir(err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something wrong.",
    };
  }
});