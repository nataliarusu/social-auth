function navbar(isAuth) {
  return /*html*/ `
  <nav>
        <ul class="main-nav">
            <li><a href='/'>Home</a></li>
            ${
              isAuth ? `<li><a href='/add-event'>Add event</a></li>` : ''
            }                
        </ul>
        <ul class="auth-nav">
        ${
          !isAuth
            ? `<li><a href='/log-in'>Log in</a></li>
            <li><a href='/sign-up'>Sign up</a></li>`
            : `<li><form method='post' action='/log-out'><button type='submit'>Log out</button></form></li>`
        }
        </ul>

        
    </nav>
  `;
}

module.exports = { navbar };
