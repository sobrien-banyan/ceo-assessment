export default defineEventHandler(async (event) => {
    console.log("POST /api/auth");
    const body = await readBody(event);
    const user = {name: process.env.AUTH_USER_NAME, password: process.env.AUTH_PASSWORD };
    const secret = process.env.AUTH_SECRET;

    try {
        if (body.username === user.name && body.password === user.password) {
            console.log('User authenticated successfully');
            return {status: 'authenticated', token: secret};
        } else {
            console.error('Warning: Malicious login attempt registered, bad credentials provided')
            return null
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