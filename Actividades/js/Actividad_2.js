const contenedor = document.getElementById('test');
const botonRes = document.getElementById('boton');
const resultadoTest = document.getElementById('resultado');

const preguntas = [
  {
    pregunta: '1. Característica del espacio geográfico',
    respuestas: {
      a: 'Distribución',
      b: 'Geolocalizacion',
      c: 'Otra',
    },
    respuestaCorrecta: 'a',
  },
  {
    pregunta: '2. Para que se utilizan los puntos cardinales?',
    respuestas: {
      a: 'Busqueda de personas especificas',
      b: 'Localizar lugar especificos',
      c: 'Localizar superficies planas',
    },
    respuestaCorrecta: 'b',
  },
  {
    pregunta: '3. Coordenadas geograficas?',
    respuestas: {
      a: 'Latitud, Longitud, Altitud',
      b: 'Polo norte, Ecuador, Polo sur',
      c: 'Ninguna de las anteriores',
    },
    respuestaCorrecta: 'a',
  },
];

function mostrarTest() {
  const preguntasYrespuestas = [];

  preguntas.forEach((preguntaActual, numeroDePregunta) => {
    const respuestas = [];

    for (letraRespuesta in preguntaActual.respuestas) {
      respuestas.push(
        `<label style="margin-right: 20px;">
            <input type="radio" name="${numeroDePregunta}" value="${letraRespuesta}" />
            ${letraRespuesta} : ${preguntaActual.respuestas[letraRespuesta]}
        </label>`
      );
    }

    preguntasYrespuestas.push(
      `<div class="cuestion" style="margin-bottom: 10px;">${preguntaActual.pregunta}</div>
          <div class="respuestas"> ${respuestas.join('')} </div>
          <br>
          `
    );
  });

  contenedor.innerHTML = preguntasYrespuestas.join('');
}

mostrarTest();

function mostrarResultado() {
  const respuestas = contenedor.querySelectorAll('.respuestas');
  let respuestasCorrectas = 0;

  preguntas.forEach((preguntaActual, numeroDePregunta) => {
    const todasLasRespuestas = respuestas[numeroDePregunta];
    const checkboxRespuestas = `input[name='${numeroDePregunta}']:checked`;
    const respuestaElegida = (todasLasRespuestas.querySelector(checkboxRespuestas) || {})
      .value;

    if (respuestaElegida === preguntaActual.respuestaCorrecta) {
      respuestasCorrectas++;

      respuestas[numeroDePregunta].style.color = 'blue';
    } else {
      respuestas[numeroDePregunta].style.color = 'red';
    }
  });

  resultadoTest.innerHTML =
    'Usted ha acertado ' +
    respuestasCorrectas +
    ' preguntas de un total de ' +
    preguntas.length;

  getData(respuestasCorrectas, preguntas.length);
}

botonRes.addEventListener('click', mostrarResultado);

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

const getData = async (puntaje, total) => {
  var actividad = obtenerValorParametro('act');
  var Ejercicio = {
    Usuario: sessionStorage.getItem('Id'),
    Unidad: sessionStorage.getItem('Unidad'),
    Actividad: actividad,
    Puntaje: puntaje,
    Total: total,
  };

  await $.ajax({
    url: 'https://geoexpert.herokuapp.com/api/ejercicios',
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    data: JSON.stringify(Ejercicio),
    success: (response) => {
      console.log(response);
    },
  });
  //   console.log(Ejercicio);
};

const volver = async () => {
  var unit = sessionStorage.getItem('Unidad');
  sessionStorage.removeItem('Unidad');

  location.href = '../actividades.html?id=' + unit;
};
