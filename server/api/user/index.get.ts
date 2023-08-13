import { user } from "../../dbModels";
export default defineEventHandler(async (event) => {
  console.log("GET /api/user.get");
  try {
    const Data = await user.find();
    return Data.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      title: user.title,
      organizationName: user.organizationName,
      role: user.role,
      workLocation: user.workLocation,
      employeeCount: user.employeeCount,
      primaryReason: user.primaryReason,
      howDidYouHearAboutUs: user.howDidYouHearAboutUs,
      score: user.score,
      results: user.results,
      createdAt: user.createdAt,
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