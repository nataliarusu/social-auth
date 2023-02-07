const { userForm } = require("../templates/forms");
const { html } = require("../templates/html");
const { navbar } = require("../templates/nav");
const bcrypt = require("bcryptjs");
const { getUserByEmail } = require("../model/user");
const { createSession } = require("../model/session");

//add social auth
const client_id = process.env.CLIENT_ID;
const LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=${client_id}`;

function get(request, response) {
  const title = "Social Agenda | Log-in";
  const navBar = navbar(false); // isAuth should be implemented
  const content = userForm("/log-in");
  const socialAuthbtn = `<button><a href="${LOGIN_URL}">Log in with GitHub</a></button>`;

  response.send(html(title, navBar, content.concat(socialAuthbtn)));
}

function post(request, response) {
  const { email, password } = request.body;
  const user = getUserByEmail(email);
  if (!email || !password || !user) {
    const title = "Social Agenda | Log-in";
    const navBar = navbar(false); // isAuth should be implemented
    const content = userForm("/log-in");
    const err = "<h1>Login failed</h1>";
    return response.status(400).send(html(title, navBar, err.concat(content)));
  }
  bcrypt.compare(password, user.hash).then((match) => {
    if (!match) {
      return response.status(400).send("<h1>Login failed</h1>");
    } else {
      const session_id = createSession(user.id);
      response.cookie("sid", session_id, {
        signed: true,
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        sameSite: "lax",
        httpOnly: true,
      });
      response.redirect(`/`);
    }
  });
}

module.exports = { get, post };
