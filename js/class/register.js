const form = document.querySelector('#FormRegister');

function register(FormData) {
  const myData = {
    Nombre: FormData.get('Nombre'),
    Apellidos: FormData.get('Apellidos'),
    Correo: FormData.get('Correo'),
    Contrasena: FormData.get('Contrasena'),
    Estatus: 1,
  };

  fetch('https://geoexpert.herokuapp.com/api/login', {
    method: 'POST',
    body: JSON.stringify(myData),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        console.log(data.message);
      } else {
        location.href = './login.html';
        // sessionStorage.setItem('Token', data.token);
        // sessionStorage.setItem('Username', data.usuario);
        // sessionStorage.setItem('Id', data.id);
      }
    });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  register(formData);
});
