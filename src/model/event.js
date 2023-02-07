const db = require('../database/db.js');

const insert_event = db.prepare(/*sql*/ `
  INSERT INTO events (title, content, event_date, event_address, user_id)
  VALUES ($title, $content, $event_date, $event_address, $user_id)
  RETURNING id
`);

function createEvent(title, content, event_date, event_address, user_id) {
  return insert_event.get({
    title,
    content,
    event_date,
    event_address,
    user_id,
  });
}

const select_event_by_id = db.prepare(/*sql*/ `
  SELECT id, interested FROM events WHERE id = ?
`);

function getEventByID(id) {
  return select_event_by_id.get(id);
}
const update_interested = db.prepare(/*sql*/ `
  UPDATE events SET interested=$interested WHERE id = ?
`);

function updateInterested(id) {
  let interestedINdb = getEventByID(id).interested; //2
  interestedINdb += 1;
  console.log(interestedINdb);
  console.log({ interested: interestedINdb, id: id });
  return update_interested.run({ interested: interestedINdb, id: id });
}

const select_all_events = db.prepare(/*sql*/ `
    SELECT 
        id,
        title,
        content,
        event_date,
        event_address,
        interested
    FROM events
    
`);

function listEvents() {
  return select_all_events.all();
}

module.exports = { createEvent, getEventByID, listEvents, updateInterested };
