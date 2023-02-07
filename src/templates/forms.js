function userForm(path, errors = {}, values = {}) {
  return /*html*/ `
        <form method="POST" action="${path}">
          <div class="form-item">
            <label for="email">email</label>
            <input type="email" id="email" name="email" required>
          </div>
          <div class="form-item">
            <label for="password">password</label>
            <input type="password" id="password" name="password" required >
          </div>
          <button class="form-btn" type="submit">Submit</button>
        </form>
    `;
}

function addEventForm(errors = {}, values = {}) {
  return /*html*/ `
    <form method="POST" action="/add-event">
    <div class="form-item">
        <label for="title">Title</label>   
        <input type="text" id="title" name="title"/>
    </div>
    <div class="form-item">
        <label for="content">About</label> 
        <input type="text" id="content" name="content" />
    </div>
    <div class = "form-item">
        <label for="date">Event's date</label>
        <input type="datetime-local" id="date" name="date" required>   
   </div>
   <div class = "form-item">
     <label for="address">Address:</label>
     <input type="text"id="address" name="address">   
   </div>
    <button class="Button" type="Submit">Add &plus;</button>
    </form>
    `;
}

module.exports = { userForm, addEventForm };
