import axios from "axios";

const conexApi = axios.create({
  baseURL: 'https://cna-cms.onrender.com/'
});



// "id": "9682d972-c050-482b-bf1e-5b3db6653f12",
// "name": "Administrator",

// "id": "140de75d-8d7c-47e3-8ba9-f7e60cdb3ba4",
// "name": "Vendedor",

// "id": "55f783e6-5f39-4966-bec6-8b71d3631075",
// "name": "Operativo",

// "id": "afdc94bb-c280-400c-b3b7-85a6158a0201",
// "name": "Contador",

// "id": "dbb74e25-bea2-4a87-a337-1c971307c3bf",
// "name": "Cliente",

function LimpiarFormUsuario() {
  document.getElementById('fusu_nombre').value = "";
  document.getElementById('fusu_apellido').value = "";
  document.getElementById('fusu_email').value = "";
  document.getElementById('fusu_telefono').value = "";
  document.getElementById('fusu_dni').value = "";
  document.getElementById('fusu_contrasena').value = "";
  document.getElementById('fusu_contrasena2').value = "";
  document.getElementById('fusu_comision').value = 0.00;
}



//Actualizar cliente
const agregarUsuarioSButton = document.getElementById('btnRegistrarUsuarioSesion')
agregarUsuarioSButton.addEventListener('click', () => {
  const fusu_nombre = document.getElementById('fusu_nombre').value;
  const fusu_apellido = document.getElementById('fusu_apellido').value;
  const fusu_email = document.getElementById('fusu_email').value;
  const fusu_telefono = document.getElementById('fusu_telefono').value;
  const fusu_comision = document.getElementById('fusu_comision').value;
  const fusu_dni = document.getElementById('fusu_dni').value;

  const fusu_rol = document.getElementById('selectRolUsuario').value;
  const fusu_contrasena = document.getElementById('fusu_contrasena').value;
  const fusu_contrasena2 = document.getElementById('fusu_contrasena2').value;


  const data = {
    first_name: fusu_nombre,
    last_name: fusu_apellido,
    email: fusu_email,
    password: fusu_contrasena,
    tel_usu_dir: fusu_telefono,
    status: "active",
    role: fusu_rol,
    dni: fusu_dni,
    comision: fusu_comision
  }






  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!fusu_nombre.trim()) {
    Swal.fire({
      icon: "error",
      title: "El nombre es obligatorio",
      text: "Something went wrong!",
    });
  } else if (!fusu_apellido.trim()) {
    Swal.fire({
      icon: "error",
      title: "El apellido es obligatorio",
      text: "Something went wrong!",
    });
  } else if (fusu_dni.length === 8) {
    if (emailRegex.test(fusu_email)) {
      if (fusu_contrasena === fusu_contrasena2) {
        // conexApi.get(`users`).then((res) => {
        // })
        //   .catch((error) => {
        //     console.error('Hubo un error:', error);
        //   });
        // Lógica para el caso de éxito
        conexApi.post(`users`, data).then((res) => {
          console.log(res)
          Swal.fire({
            icon: "success",
            title: "Usuario creado",
            text: "Se creó el usuario correctamente!",
          }).then(() => {
            // Redirige después de mostrar el alert
            window.location.href = "listarusuariosadm.html";
        });
        })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Error el correo o DNI ya existe!",
            });
            console.error('Hubo un error:', error);
          });
      

        // Limpieza del formulario
      } else {
        Swal.fire({
          icon: "error",
          title: "Las contraseñas no coinciden",
          text: "Something went wrong!",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "El formato del correo electrónico no es válido",
        text: "Something went wrong!",
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "El DNI debe tener 8 caracteres",
      text: "Something went wrong!",
    });
  }


});
