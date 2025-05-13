import axios from "axios";

const conexApi = axios.create({
  baseURL: 'https://cna-cms.onrender.com/'
});

let url = new URL(window.location.href);

// Usar URLSearchParams para obtener el valor de 'miVariable'
let id = url.searchParams.get("id");

//Agregar empresa
const agregarButton = document.getElementById('btnAgregarEmpresa')
agregarButton.addEventListener('click', () => {
  const ruc = document.getElementById('fruc').value;
  const razonSocial = document.getElementById('frazonSocial').value;
  const telefono = document.getElementById('fusu_telefono').value;
  const direccion = document.getElementById('fusu_direccionE').value;

  const data = {
    emp_ruc: ruc,
    emp_razon_social: razonSocial,
    emp_direccion: direccion,
    emp_telefono: telefono
  }

  conexApi.post(`items/empresa`, data).then((res) => {

    const id3 =res.data.data
     document.getElementById('fidEmpresa').value =id3.emp_id
     const vari =document.getElementById('fidEmpresa').value;
     console.log(vari)
    Swal.fire({
      icon: "success",
      title: "Empresa creada correctamente",
    }).then(() => {
      // Redirige después de mostrar el alert
      activar()
  });
  })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Ya existe una empresa con el mismo RUC",
      });
      console.error('Hubo un error:', error);
    });
});


function activar(){
  // Obtener referencias a los campos
const nombresInput = document.getElementById('fusu_nombre');
const apellidosInput = document.getElementById('fusu_apellido');
const dniInput = document.getElementById('fusu_dni');
const emailInput = document.getElementById('fusu_email');
const celularInput = document.getElementById('fusu_celular');
const direccionC = document.getElementById('fusu_direccionC');
nombresInput.disabled = false;
  apellidosInput.disabled = false;
  dniInput.disabled = false;
  emailInput.disabled = false;
  celularInput.disabled = false;
  direccionC.disabled = false;
}

//Buscar empresa por ruc
const buscarButton = document.getElementById('btnBuscarEmpresa')
buscarButton.addEventListener('click', () => {
  const ruc = document.querySelector('#fruc').value;
  //axios.get(`https://cna-cms.onrender.com/items/empresa?filter[emp_ruc]=${ruc}`).then((res) => {
  conexApi.get(`items/empresa?filter[emp_ruc]=${ruc}`).then((res) => {
    const empresa = res.data.data[0]
    console.log(empresa)
    console.log(empresa.emp_ruc)
    //console.log(emp_ruc)
    document.getElementById('frazonSocial').value = empresa.emp_razon_social
    document.getElementById('fruc').value = empresa.emp_ruc
    document.getElementById('fusu_telefono').value = empresa.emp_telefono
    document.getElementById('fusu_direccionE').value = empresa.emp_direccion
    document.getElementById('fidEmpresa').value = empresa.emp_id
    Swal.fire({
      icon: "success",
      title: `Empresa con RUC: ${ruc} fue encontrada`,
    }).then(() => {
      // Redirige después de mostrar el alert
      activar()
  });
  })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: `No se encontró empresa con el RUC:  ${ruc} `,
      })
      console.error('Hubo un error:', error);
    });
});


//Agregar cliente
const agregarUsuarioButton = document.getElementById('btnRegistrarUsuario')
agregarUsuarioButton.addEventListener('click', () => {
  const fusu_nombre = document.getElementById('fusu_nombre').value;
  //const fid_empresa = document.getElementById('fidEmpresa').value;
  const fusu_apellido = document.getElementById('fusu_apellido').value;
  const fusu_dni = document.getElementById('fusu_dni').value;
  const fusu_email = document.getElementById('fusu_email').value;

  //contraseña el dni
  const fusu_contrasena = document.getElementById('fusu_dni').value;
  //const fusu_contrasena = document.getElementById('fusu_contrasena').value;
  const fusu_telefono = document.getElementById('fusu_telefono').value;
  const fusu_direccion = document.getElementById('fusu_direccionC').value;
  const femp_id = document.getElementById('fidEmpresa').value

  const fusu_rol = "dbb74e25-bea2-4a87-a337-1c971307c3bf";

  //const fusu_comision =document.getElementById('fusu_comision').value;
  //const fusu_comision = 0;


  const data = {
    first_name: fusu_nombre,
    last_name: fusu_apellido,
    dni: fusu_dni,
    email: fusu_email,
    password: fusu_contrasena,
    tel_usu_dir: fusu_telefono,
    location: fusu_direccion,
    role: fusu_rol,
    emp_id: femp_id
    //usu_comision: fusu_comision
  }
  console.log(data)

  conexApi.post(`users`, data).then((res) => {
    console.log(res)
    Swal.fire({
      icon: "success",
      title: "Cliente creado correctamente",
    }).then(() => {
      // Redirige después de mostrar el alert
      window.location.href = "listarusuarios.html";
  });
    console.log('Se agrego correctamente los datos')
  })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Hubo un error al crear el cliente, el DNI o correo ya existe!",
      });
      console.error('Hubo un error:', error);

    });
});

async function cargarEditarUsuarios() {
  conexApi.get(`users?filter[id]=${id}&fields=*.*`).then((res) => {
    const usuario = res.data.data[0]
    console.log(usuario)

    document.getElementById('frazonSocial').value = usuario.emp_id.emp_razon_social
    document.getElementById('fruc').value = usuario.emp_id.emp_ruc
    document.getElementById('fusu_telefono').value = usuario.emp_id.emp_telefono
    document.getElementById('fusu_direccionE').value = usuario.emp_id.emp_direccion
    document.getElementById('fidEmpresa').value = usuario.emp_id.emp_id
    // document.getElementById('fidCliente').value = usuario.usu_id
    document.getElementById('fusu_dni').value = usuario.dni
    document.getElementById('fusu_nombre').value = usuario.first_name
    document.getElementById('fusu_apellido').value = usuario.last_name
    document.getElementById('fusu_email').value = usuario.email
    //document.getElementById('fusu_contrasena').value = usuario.usu_contrasena
    document.getElementById('fusu_celular').value = usuario.tel_usu_dir
    document.getElementById('fusu_direccionC').value = usuario.location
    // document.getElementById('selectRolUsuario').value = usuario.usu_rol
    // document.getElementById('fusu_comision').value = usuario.usu_comision

  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });
}


//Editar cliente
const editarClienteButton = document.getElementById('btnActualizarUsuario')
editarClienteButton.addEventListener('click', () => {
  const fusu_nombre = document.getElementById('fusu_nombre').value;
  //const fid_empresa = document.getElementById('fidEmpresa').value;
  const fusu_apellido = document.getElementById('fusu_apellido').value;
  const fusu_dni = document.getElementById('fusu_dni').value;
  const fusu_email = document.getElementById('fusu_email').value;
  const femp_id = document.getElementById('fidEmpresa').value
  const fusu_telefono = document.getElementById('fusu_celular').value;

  //contraseña el dni
  // const fusu_contrasena = document.getElementById('fusu_dni').value;
  const fusu_contrasena = document.getElementById('fusu_contrasena').value;
  const fusu_direccion = document.getElementById('fusu_direccionC').value;
  // const fusu_rol =5;
  // const fusu_comision =document.getElementById('fusu_comision').value;
  // //const fusu_comision = 0;


  var otherData = {
    first_name: fusu_nombre,
    last_name: fusu_apellido,
    dni: fusu_dni,
    email: fusu_email,
    // password: fusu_contrasena,
    tel_usu_dir: fusu_telefono,
    location: fusu_direccion,
    emp_id: femp_id

  }


  var data = {
    ...otherData,
    // Incluir el campo de contraseña solo si no está vacío
    ...(fusu_contrasena && { password: fusu_contrasena })
};
  console.log(data)

  conexApi.patch(`users/${id}`, data).then((res) => {
    console.log(res)
    Swal.fire({
      icon: "success",
      title: "Cliente actualizado correctamente!",
    }).then(() => {
      // Redirige después de mostrar el alert
      window.location.href = "listarusuarios.html";
  });
    console.log('Se agrego correctamente los datos')
  })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Hubo error al actualizar los datos del cliente",
      });
      console.error('Hubo un error:', error);
    });
});


window.addEventListener('load', function () {
  if (window.location.href.includes('editar-usuario.html')) {
    cargarEditarUsuarios();
  }

});

