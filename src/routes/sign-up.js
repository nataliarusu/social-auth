const { userForm } = require('../templates/forms');
const { html } = require('../templates/html');
const { navbar } = require('../templates/nav');
const bcrypt = require('bcryptjs');
const { createUser } = require('../model/user');
const { createSession } = require('../model/session');

// should this have a redirect if already logged in?
function get(request, response) {
  const title = 'Social Agenda | Create an Account';
  const navBar = navbar(false); //isAuth should be implemented
  const content = userForm('/sign-up');
  response.send(html(title, navBar, content));
}

function post(request, response) {
  const { email, password } = request.body;
  if (!email || !password) {
    response.status(400).send('<h1>Please choose a valid combination</h1>');
  } else {
    bcrypt.hash(password, 12).then((hash) => {
      const user = createUser(email, hash);
      const session_id = createSession(user.id);
      response.cookie('sid', session_id, {
        signed: true,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24, // one day
        sameSite: 'lax',
      });
      response.redirect('/');
    });
  }
}

module.exports = { get, post };
