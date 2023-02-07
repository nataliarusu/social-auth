const api = require("../api"); //handle /path I added as callback url in github

function socialAuth(req, res) {
  const code = req.query.code; //?code=xxx
  api
    .getToken(code)
    .then(api.getUser)
    .then((user) => {
      // probably create a new user in your own DB here
      // do some proper session cookie stuff etc
      // this is just an over-simplified example
      // so we just stick the username into the cookie
      console.log(user, " user social-auth");
      res.cookie("user", user.login, {
        httpOnly: true,
        signed: true,
        maxAge: 1000 * 60 * 60 * 24, // 1 day
        sameSite: "lax",
      });
      res.redirect("/");
    });
}

module.exports = { socialAuth };
