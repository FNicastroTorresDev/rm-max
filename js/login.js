const loginOk = {
  value: false
}

function login() {
  const emailUser = document.getElementById('email-login').value
  const passUser = document.getElementById('pass-login').value
  let isLogin = false

  fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(data => {
      data.forEach(user => {
        if ((user.email === emailUser) && (user.password === passUser)) {
          isLogin = true
          return
        }
      });
    })
    .then(() => {
      if (isLogin) {
        alert('Logueado!')
        loginOk.value = true
        window.sessionStorage.setItem('loginOk',JSON.stringify(loginOk))
        window.location.href = '../index.html'
      } else {
        loginOk.value = false
        window.sessionStorage.setItem('loginOk',JSON.stringify(loginOk))
        alert('Usuario y/o contraseña incorrecto/s.')
      }
    })
}

function closeLogin() {
  loginOk.value = false
  window.sessionStorage.setItem('loginOk',JSON.stringify(loginOk))
  alert('Sesión cerrada.')
  window.location.reload()
}

