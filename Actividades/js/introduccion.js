const contenedor = document.getElementById('test');
const botonRes = document.getElementById('boton');
const resultadoTest = document.getElementById('resultado');

const preguntas = [
  {
    pregunta: '1. ¿Cuáles son elementos básicos de un mapa?',
    respuestas: {
      a: 'Escala, descripción de los elementos y fecha',
      b: 'Titulo, gráficas y nombres de las zonas',
      c: 'Leyenda, escala y titulo',
      d: 'Croqus, nombre del autor titulo',
    },
    respuestaCorrecta: 'b',
  },
  {
    pregunta: '2. Que indica la escala de un mapa?',
    respuestas: {
      a: 'La proporción entre las representación y la realidad',
      b: 'La diferencia de tamaño de dos superficies terrestres',
      c: 'La medida del área de un terreno',
      d: 'El tamaño de un mapa con relación a otro',
    },
    respuestaCorrecta: 'b',
  },
  {
    pregunta: '3. Para conocer la orientación de un mapa debo apoyarme en...',
    respuestas: {
      a: 'La rosa de los vientos',
      b: 'El titulo',
      c: 'La simbologia o leyenda',
      d: 'la escula',
    },
    respuestaCorrecta: 'a',
  },
  {
    pregunta: '4. La radiación solar se concentra más en la región',
    respuestas: {
      a: 'Polar',
      b: 'Norte',
      c: 'Templada',
      d: 'Ecuatorial',
    },
    respuestaCorrecta: 'b',
  },
  {
    pregunta:
      '5. Tanto la _________ como la _________ son dos de los movimiento de la Tierra',
    respuestas: {
      a: 'Nutación - Convección',
      b: 'Rotacion - Traslacíon',
      c: 'Circulacion - altitud',
      d: 'subdcción - rotación',
    },
    respuestaCorrecta: 'b',
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
          <div><strong class="message" style="text-decoration-line: underline;"></strong></div>
          <br>
          `
    );
  });

  contenedor.innerHTML = preguntasYrespuestas.join('');
}

mostrarTest();

function mostrarResultado() {
  const respuestas = contenedor.querySelectorAll('.respuestas');
  const message = contenedor.querySelectorAll('.message');
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
      console.log(
        (message[numeroDePregunta].innerHTML =
          'Respuesta correcta: ' +
          preguntaActual.respuestas[preguntaActual.respuestaCorrecta])
      );
      console.log(preguntaActual.respuestas[preguntaActual.respuestaCorrecta]);

      respuestas[numeroDePregunta].style.color = 'red';
    }
  });

  resultadoTest.innerHTML =
    'Usted ha acertado ' +
    respuestasCorrectas +
    ' preguntas de un total de ' +
    preguntas.length;

  UpdateScore(respuestasCorrectas, preguntas.length);
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

const UpdateScore = async (puntaje, total) => {
  var actividad = obtenerValorParametro('act');

  var score = {
    Usuario: sessionStorage.getItem('Id'),
    Actividad: actividad,
    Puntaje: puntaje,
    Total: total,
  };
  console.log(score);

  await $.ajax({
    url: 'https://geoexpert.herokuapp.com/api/actividades/score',
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    data: JSON.stringify(score),
    success: (response) => {
      // console.log('Respuesta' + response);
    },
  });
};

const volver = async () => {
  var unit = sessionStorage.getItem('Unidad');
  sessionStorage.removeItem('Unidad');

  location.href = '../actividades.html?id=' + unit;
};
