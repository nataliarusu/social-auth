const express = require("express");
const path = require("path");
const server = express();

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const home = require("./routes/home");
const logIn = require("./routes/log-in");
const events = require("./routes/userEvents");
const signUp = require("./routes/sign-up");
const logOut = require("./routes/log-out");
const { getSession, removeSession } = require("./model/session");
const { socialAuth } = require("./routes/social-auth");

server.use(bodyParser.urlencoded({ extended: false }));
server.use(express.static(path.join(__dirname, "public")));
server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(sessions);

server.get("/", home.get);
server.get("/log-in", logIn.get);
server.post("/log-in", logIn.post);
server.get("/sign-up", signUp.get);
server.post("/sign-up", signUp.post);
server.post("/log-out", logOut.post);

server.get("/add-event", events.addEvent); //add middleware
server.post("/add-event", events.postEvent); //add middleware

server.post("/interested/:id", events.addInterested);

// this is the route GitHub redirects users back to after the log in
// we need to POST this code to GH to get an access_token for talking to their API

server.get("/path", socialAuth);

function sessions(req, res, next) {
  const sid = req.signedCookies.sid; //undefined if there is not a sid
  const session = getSession(sid); //undefined if there is no session
  if (session) {
    const expiry = new Date(session.expires_at);
    const today = new Date();
    if (expiry < today) {
      removeSession(sid);
      res.clearCookie(sid);
    } else {
      req.session = session;
    }
  }
  next();
}

module.exports = server;
