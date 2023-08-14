export default defineEventHandler(async (event) => {
    console.log("POST /api/auth");
    const config = useRuntimeConfig();
    const body = await readBody(event);
    const user = {name: config.authUser, password: config.authPassword };
    const secret = config.authSecret;

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