const verifyToken = async () => {
  let myToken = sessionStorage.getItem('Token');

  if (myToken) {
    const username = sessionStorage.getItem('Username');
    document.getElementById('nameUserName').innerHTML = username;
  } else {
    location.href = 'login.html';
  }
};
verifyToken();

const cerrarsesion = async () => {
  sessionStorage.removeItem('Username');
  sessionStorage.removeItem('Token');
  location.href = 'login.html';
};
