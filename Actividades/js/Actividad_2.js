const contenedor = document.getElementById('test');
const botonRes = document.getElementById('boton');
const resultadoTest = document.getElementById('resultado');

const preguntas = [
  {
    pregunta:
      '1. La región es espacio terrestre con caracteristicas naturales, sociales, culturales y económicas semejantes que le dan identidad y la diferencian de otras.',
    respuestas: {
      a: 'Verdadero',
      b: 'Falso',
    },
    respuestaCorrecta: 'a',
  },
  {
    pregunta:
      '2. El territorio es el espacio terrestre delimitado politicamente y dividido en terminos politicos-administrativos, como los paises, estados o municipios.',
    respuestas: {
      a: 'Verdadero',
      b: 'Falso',
    },
    respuestaCorrecta: 'a',
  },
  {
    pregunta:
      '3. El paisaje es el espacio de la superficie terrestre que se observa, producto de la interaccion del relieve, clima, agua, suelo, vegetación y fauna y de las modificaciones hechas por los grupos humanos a lo largo del tiempo',
    respuestas: {
      a: 'Verdadero',
      b: 'Falso',
    },
    respuestaCorrecta: 'a',
  },
  {
    pregunta:
      '3. El lugar es el espacio mas cercano y la escala mas pequeña de analisis del espacio geográfico. Se reconoce a partir de su nombre y se localiza por medio de sus coordenadas geográficas.',
    respuestas: {
      a: 'Verdadero',
      b: 'Falso',
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
