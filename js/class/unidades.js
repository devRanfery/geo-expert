const printUnits = async (unitsList) => {
  await $('.unidades').empty();
  await $.each(unitsList, (key, value) => {
    var unidad = String(value._id);

    $('.unidades').append(
      `
      <div class="col-lg-4" data-unit-key=${value._id}>
      <div class="single-destinations">
        <div class="thumb">
          <img src="img/unidades/${value.Imagen}" alt="" style="width: 400px;
          height: 200px;" />
        </div>
        <div class="details">
          <h4 class="d-flex justify-content-between" style="height: 40px;">
            <span>${value.Nombre}</span>
          </h4>
          <p>Total de actividades | ${value.NoActividades}</p>
          <p style="height: 200px;">
            ${value.Descripcion}
          </p>
          <input type="text" value="${unidad}" id="idUnidad${key}">
          <button type="submit" class="btn bb-btn" onclick="getActivitiesUnit(${key})">Iniciar</button>
        </div>
      </div>
    </div>
    `
    );
  });
};

const getUnits = async () => {
  await $.ajax({
    url: 'https://geoexpert.herokuapp.com/api/unidades',
    method: 'GET',
    success: (response) => {
      var data = response['units'];
      printUnits(data);
    },
  });
};

getUnits();

const getActivitiesUnit = async (key) => {
  var elem = '#idUnidad' + key;
  var unidad = $(elem).val();

  location.href = '../actividades.html?id=' + unidad;
};
