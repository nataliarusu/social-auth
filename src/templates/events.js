function eventsTemplate(eventsFromDB, isAuth) {
  const secretsUL = /*html*/ `
    <ul class="event-list">${eventsFromDB
      .map((event) => evTemplate(event, isAuth))
      .join('')}</ul>
    `;
  return secretsUL;
}

function evTemplate(event, isAuth) {
  return /*html*/ `
    <li class="event-item" id=${event.id}>
                <h2 class="event-title">${event.title}</h2>
                <p class="event-content">${event.content}</p>
                <p class="event-time">${event.event_date.replace(/T/, ' ')}</p>
                <p class="event-address">${event.event_address}</p>
                <div class="event-interest">
                    <p class="event-interest--total">1</p>
                    ${
                      isAuth
                        ? `<form method="post" action="/interested/${event.id}" class="event-interest--counter">
                     
                  <button type="submit" class="event-interest--counter-btn">Interested</button>
</form></div> `
                        : ''
                    }
                    
                             
            </li>
    `;
}

module.exports = { eventsTemplate };
