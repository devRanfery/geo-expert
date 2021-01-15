const printActivities = async (activitiesList) => {
  await $('.actividades').empty();
  await $.each(activitiesList, (key, value) => {
    $('.actividades').append(
      `
      <div class="col-lg-4" data-unit-key=${value._id}>
      <div class="single-destinations">
        <div class="details">
          <h4 class="d-flex justify-content-between">
            <span>${value.Descripcion}</span>
          </h4>
          <p>Puntaje | ${value.Puntaje}</p>
          <p>
            ${value.Descripcion}
          </p>
          <button class="btn bb-btn" onclick="getActivitiesUnit" >Comenzar</button>
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
  var ruta = 'https://geoexpert.herokuapp.com/api/actividades/' + unidad;
  await $.ajax({
    url: ruta,
    method: 'GET',
    success: (response) => {
      var data = response['activities'];
      printActivities(data);
    },
  });
};

getActivitiesUnit();
