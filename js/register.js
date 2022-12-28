let usersLength

function loadUsersId() {
  fetch('http://localhost:3000/users')
  .then(response => response.json())
  .then(data => {
    usersLength = data.length
  })
}

function registerUser() {
  fetch('http://localhost:3000/users', {
  method: 'POST',
  body: JSON.stringify({
    id: usersLength+1,
    email: document.getElementById('email-register').value,
    password: document.getElementById('pass-register').value
  }),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then(() => window.location.reload());
}