const { addEventForm } = require('../templates/forms');
const { html } = require('../templates/html');
const { navbar } = require('../templates/nav');

const dbEventsHandler = require('../model/event');

function addEvent(req, res) {
  const title = 'Add event';
  const navBar = navbar(true); // isAuth should be implemented
  const content = addEventForm();

  res.send(html(title, navBar, content));
}

function postEvent(req, res) {
  const { title, content, date, address } = req.body;
  const userId = req.session.user_id;
  dbEventsHandler.createEvent(title, content, date, address, userId); //1 will be session user id

  res.redirect('/');
}

function addInterested(req, res) {
  const id = req.params.id;
  console.log(id);

  //dbEventsHandler.updateInterested(id);
}
module.exports = { addEvent, postEvent, addInterested };
