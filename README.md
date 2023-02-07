# week-4-gnk: Social Agenda 🥳

---

Contributors : Georgia, Natalia, Konstantina

## a Node/Express server-rendered application with a SQLite database, that allows users to post their events. 💃

#### Technical criteria

- [x] Express server
- [x] Well-organised modular codebase
- [x] SQLite database
- [ ] Hosted on Fly.io
- [ ] The spike topic choses: Social Login (OAuth)
- [ ] Validate user-submitted data on the server
- [ ] Handle errors and inform the user
- [x] Styled appropriately

### Social login (OAuth)

- Allow users to log in using 3rd party accounts like Google or GitHub.

1.  https://www.npmjs.com/package/dotenv?activeTab=readme,

        npm install node-fetch
        npm install node-fetch@2//node-fetch can't be called as require, so we should add next package
        // OR use async import('node-fetch').then(...)

        npm install dotenev --save

2.  create .env

    //inside with values
    CLIENT_ID='';
    CLIENT_SECRET='';
