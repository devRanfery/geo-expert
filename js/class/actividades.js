const printActivities = async (activitiesList) => {
  await $('.actividades').empty();
  await $.each(activitiesList, (key, value) => {
    var unidad = String(value._id);
    $('.actividades').append(
      `
      <div class="col-lg-4" data-unit-key=${value._id}>
      <div class="single-destinations">
        <div class="details">
          <h4 class="d-flex justify-content-between">
            <span>${value.Descripcion}</span>
          </h4>
          <p>Puntaje | ${value.Puntaje}</p>
          <input type="range" value="${value.Puntaje}" min="0" max="${value.Total}">
          <input type="text" value="${unidad}" id="idEjercicio${key}" style="display:none;">
          <a href="Actividades/${value.Ejercicio}?act=${value._id}" class="btn bb-btn">Comenzar</a>
        </div>
      </div>
    </div>
    `
    );
  });
};

function obtenerValorParametro(sParametroNombre) {
  var sPaginaURL = window.location.search.substring(1);
  var sURLVariables = sPaginaURL.split('&');
  for (var i = 0; i < sURLVariables.length; i++) {
    var sParametro = sURLVariables[i].split('=');
    if (sParametro[0] == sParametroNombre) {
      return sParametro[1];
    }
  }
  return null;
}

const getActivitiesUnit = async () => {
  var unidad = obtenerValorParametro('id');
  sessionStorage.setItem('Unidad', unidad);
  var user = sessionStorage.getItem('Id');

  var data = { usuario: user };
  console.log(data);
  console.log(unidad);

  var ruta = 'https://geoexpert.herokuapp.com/api/actividades/unit/' + unidad;
  await $.ajax({
    url: ruta,
    method: 'POST',
    data: JSON.stringify(data),
    headers: {
      'Content-type': 'application/json',
    },
    success: (response) => {
      var data = response['data'];
      printActivities(data);
      console.log(data);
    },
  });
};

getActivitiesUnit();

const printPractices = async (practicesList) => {
  await $('.logros').empty();
  await $.each(practicesList, (key, value) => {
    $('.logros').append(
      `
      <div class="col-lg-4" data-unit-key=${value._id}>
      <div class="single-destinations">
        <div class="details">
          <h4 class="d-flex justify-content-between">
            <span>${value.Actividad}</span>
          </h4>
          <p>Puntaje ${value.Puntaje} | ${value.Total}</p>

          <input type="range" value="${value.Puntaje}" min="0" max="${value.Total}">

        </div>
      </div>
    </div>
    `
    );
  });
};

const getProgressByPractices = async () => {
  var usuario = sessionStorage.getItem('Id');
  var unidad = sessionStorage.getItem('Unidad');

  var data = {
    usuario: usuario,
    unidad: unidad,
  };
  console.log(data);

  var ruta = 'https://geoexpert.herokuapp.com/api/ejercicios/students';
  await $.ajax({
    url: ruta,
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    data: JSON.stringify(data),
    success: (response) => {
      var data = response['practices'];
      // printPractices(data);
      // console.log(data);
    },
  });
};

getProgressByPractices();
