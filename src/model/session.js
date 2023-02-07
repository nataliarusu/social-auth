const crypto = require('node:crypto');
const db = require('../database/db.js');

//set the expiry to current.date +7 days
const insert_session = db.prepare(/*sql*/ `
    INSERT INTO sessions (id, user_id, expires_at) 
    VALUES ($id, $user_id, DATE('now', '+7 days'))
`);

//generate a random string in node & return the ID to the cookie
function createSession(user_id) {
  const id = crypto.randomBytes(18).toString('base64');
  insert_session.run({ id, user_id });
  return id;
}

/////////////

// retrieve session
const select_session = db.prepare(/*sql*/ `
    SELECT id, user_id, expires_at
    FROM sessions WHERE id = ?
    `);

function getSession(sid) {
  return select_session.get(sid);
}

////////////

// remove session
const delete_session = db.prepare(/*sql*/ `
    DELETE FROM sessions WHERE id = ?
`);

function removeSession(sid) {
  return delete_session.run(sid);
  // returns { changes: 0, lastInsertRowid: 0}
}

////////////

module.exports = { createSession, getSession, removeSession };
