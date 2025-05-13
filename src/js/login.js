import axios from 'axios';
sessionStorage.removeItem('userInfo');
async function loginUser(email, password) {
    const BASE_URL = 'https://cna-cms.onrender.com';

    document.getElementById('spinner').style.display = 'inline-block';
    const endpoint = `${BASE_URL}/auth/login`;
    // Datos de inicio de sesión. Estos deberían ser recopilados de alguna forma segura, por ejemplo, un formulario.
    const loginData = {
        email, // Reemplaza con el email del usuario
        password, // Reemplaza con la contraseña del usuario
    };

    try {
        const response = await axios.post(endpoint, loginData);
        console.log('Datos recibidos:', response.data);
        const jwtPayload = decodeJWT(response.data.data.access_token);

        const userInfo = await axios.get(
            `${BASE_URL}/users/${jwtPayload.id}?fields=*.*`,
            loginData
        );
        console.log('Datos recibidos:', userInfo.data);
        sessionStorage.setItem('userInfo', JSON.stringify(userInfo.data.data));
        window.location = 'index.html';
        // Aquí puedes gestionar la respuesta. Por ejemplo, guardar tokens, redirigir al usuario, etc.
    } catch (error) {
        console.error('Error al iniciar sesión:', error.response.data);
        const errorMessage = document.getElementById('error-message');
        errorMessage.innerHTML = 'Datos Incorrectos';
        errorMessage.style.display = 'block';
    } finally {
        document.getElementById('spinner').style.display = 'none';
    }
}

document.getElementById('btnLogin').addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('txtUser').value;
    const password = document.getElementById('txtPass').value;
    loginUser(email, password);
}); //

const decodeJWT = (token) => {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    const payload = JSON.parse(atob(base64));

    return payload;
};
