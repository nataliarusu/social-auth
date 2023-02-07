const { html } = require('../templates/html');
const { navbar } = require('../templates/nav');
const { eventsTemplate } = require('../templates/events');

const eventsFromDB = require('../model/event');

console.log(eventsFromDB.listEvents(), 'home.js');

function get(req, res, next) {
  const isAuth = req.session ? req.session.id : '';
  const title = 'Social ';
  const navBar = navbar(isAuth);
  const events = eventsFromDB.listEvents();
  const content = eventsTemplate(events, isAuth);
  res.send(html(title, navBar, content));
}

module.exports = { get };
