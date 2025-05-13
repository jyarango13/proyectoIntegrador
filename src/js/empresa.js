import axios from "axios";

const conexApi = axios.create({
  baseURL: 'https://cna-cms.onrender.com/'
});

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

let url = new URL(window.location.href);

// Usar URLSearchParams para obtener el valor de 'miVariable'
let id = url.searchParams.get("id");




//Actualiza Usuario

const actualizarUsuarioButton = document.getElementById('btnActualizarUsuario')
actualizarUsuarioButton.addEventListener('click', () => {
  const idCliente = document.getElementById('fidCliente').value
  const fusu_dni = document.getElementById('fusu_dni').value
  const fusu_nombre = document.getElementById('fusu_nombre').value;
  const fusu_apellido = document.getElementById('fusu_apellido').value;
  const fusu_email = document.getElementById('fusu_email').value;
  const fusu_contrasena = document.getElementById('fusu_contrasena').value;
  const fusu_telefono = document.getElementById('fusu_telefono').value;
  //const fusu_direccion = document.getElementById('fusu_direccion').value;
  const fusu_rol = document.getElementById('selectRolUsuario').value;
  const fusu_comision = document.getElementById('fusu_comision').value;
  var otherData = {
    comision: fusu_comision,
    first_name: fusu_nombre,
    last_name: fusu_apellido,
    dni: fusu_dni,
    email: fusu_email,
    // password: fusu_contrasena,
    tel_usu_dir: fusu_telefono,
    //location: fusu_direccion,
    role: fusu_rol,
  }
  // if(fusu_contrasena!= null){
     
  // }

  var data = {
    ...otherData,
    // Incluir el campo de contraseña solo si no está vacío
    ...(fusu_contrasena && { password: fusu_contrasena })
};
  

  console.log(data)

  conexApi.patch(`users/${idCliente}`, data).then((res) => {
    Swal.fire({
      icon: "success",
      title: "Usuario actualizado correctamente!",
    }).then(() => {
      // Redirige después de mostrar el alert
      window.location.href = "listarusuariosadm.html";
  });
    console.log('Se agrego correctamente los datos')
  })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Hubo un error al actualizar el usuario, el DNI o correo ya existe!",
        text: error,
      });
      console.error('Hubo un error:', error);
    });
});


async function cargarEditarUsuario() {
  conexApi.get(`users?filter[id]=${id}`).then((res) => {
    console.log(res)
    const usuario = res.data.data[0]
    console.log(usuario)
    document.getElementById('fidCliente').value = usuario.id
    document.getElementById('fusu_dni').value = usuario.dni
    document.getElementById('fusu_nombre').value = usuario.first_name
    document.getElementById('fusu_apellido').value = usuario.last_name
    document.getElementById('fusu_email').value = usuario.email
    document.getElementById('fusu_contrasena').value = ''
    document.getElementById('fusu_telefono').value = usuario.tel_usu_dir
   // document.getElementById('fusu_direccion').value = usuario.location
    document.getElementById('selectRolUsuario').value = usuario.role
    if(usuario.comision!= null || usuario.comision=== 0){
      document.getElementById('fusu_comision').value = usuario.comision
    }else{
      document.getElementById('fusu_comision').value =''
      document.getElementById('fusu_comision').disabled=true
    }

  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });
}


window.addEventListener('load', function () {
  if (window.location.href.includes('nuevo-usuario.html')) {
    //cargarNombre();
  } if (window.location.href.includes('adm-editar-usuario.html')) {
    cargarEditarUsuario();
  }
});