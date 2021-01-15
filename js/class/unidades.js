const printUnits = async (unitsList) => {
  console.log(unitsList);
  await $('.unidades').empty();
  await $.each(unitsList, (key, value) => {
    $('.unidades').append(
      `
      <div class="col-lg-4" data-unit-key=${value._id}>
      <div class="single-destinations">
        <div class="thumb">
          <img src="img/unidades/${value.Imagen}" alt="" />
        </div>
        <div class="details">
          <h4 class="d-flex justify-content-between">
            <span>${value.Nombre}</span>
          </h4>
          <p>Total de actividades | ${value.NoActividades}</p>
          <p>
            ${value.Descripcion}
          </p>
          <button class="btn bb-btn" onclick="getActivitiesUnit(${value._id})" >Iniciar</button>
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
      console.log(data);
    },
  });
};

getUnits();
