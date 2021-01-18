const login = async (user, unidad, actividad, ejercicio) => {
  var newActivity = {
    IdUnidad: unidad,
    Descripcion: actividad,
    Puntaje: 0,
    Total: 3,
    Usuario: user,
    Ejercicio: ejercicio,
  };

  await fetch('https://geoexpert.herokuapp.com/api/actividades', {
    method: 'POST',
    body: JSON.stringify(newActivity),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message) {
        consele.error(data.message);
      } else {
        data['data'];
      }
    });
};

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
        var myData = data['data'];
        var user = myData._id;
        // var unidad1 = '600108db3ae5b100155d035f';
        var unidad1 = '60013ca4b03ca10015e08f3d';
        var unidad2 = '60059aae7cb58eaf2051612a';
        var introduccion = 'Introducción';
        var ejerIntro = 'introduccion.html';
        var actividad1 = 'Actividad 1';
        var actividad2 = 'Actividad 2';
        var actividad3 = 'Actividad 3';
        var ejercicio1 = 'Actividad_1.html';
        var ejercicio2 = 'Actividad_2.html';
        var ejercicio3 = 'Actividad_3.html';
        login(user, unidad1, introduccion, ejerIntro);
        login(user, unidad2, actividad1, ejercicio1);
        login(user, unidad2, actividad2, ejercicio2);
        // login(user, unidad2, actividad3, ejercicio3);

        // login(user, unidad1, actividad2, ejercicio2);
        // login(user, unidad2, actividad2, ejercicio2);
        // location.href = './login.html';
        alert('REGISTRADO EXITOSAMENTE');
        location.href = './login.html';
        // var myData = data['data'];
        // console.log(myData);
        // console.log(myData._id);
      }
    });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  register(formData);
});
