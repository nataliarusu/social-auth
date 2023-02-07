function html(title, navbar, content) {
  return /*html*/ `
      <DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="main.css">
    <script src="main.js" defer></script>
   <title>${title}</title>
</head>
<body>
    ${navbar}
    <main>
    ${content}
    </main>
    </body>
    </html>
    `;
}
module.exports = { html };
