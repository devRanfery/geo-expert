const form = document.querySelector('#FormLogin');

function login(FormData) {
  const myData = {
    Email: FormData.get('email'),
    Passwrd: FormData.get('passwrd'),
  };

  fetch('https://geoexpert.herokuapp.com/api/login/start', {
    method: 'POST',
    body: JSON.stringify(myData),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        $('#alert-login').css('display', 'block');
        $('#alert-login').text(data.message);
      } else {
        $('#alert-login').css('display', 'none');
        location.href = '../unidades.html';
        sessionStorage.setItem('Token', data.token);
        sessionStorage.setItem('Username', data.usuario);
        sessionStorage.setItem('Id', data.id);
      }
    });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  login(formData);
});
