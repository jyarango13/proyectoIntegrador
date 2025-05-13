import axios from "axios";

const conexApi = axios.create({
    baseURL: 'https://cna-cms.onrender.com/items/'
});

let url = new URL(window.location.href);

// Usar URLSearchParams para obtener el valor de 'miVariable'
let id = url.searchParams.get("id");


//Cargar Shipper x id
async function cargarEditarShippers() {
    conexApi.get(`agente?filter[age_id]=${id}`).then((res) => {
        const agente = res.data.data[0];
        console.log(agente);
        document.getElementById('fage_id').value = agente.age_id
        document.getElementById('fage_nombre').value = agente.age_nombre
        document.getElementById('fage_direccion').value = agente.age_direccion
        document.getElementById('fage_telefono').value = agente.age_telefono
        document.getElementById('fage_correo').value = agente.age_correo
        //const ftag_id = document.getElementById('ftag_id').value
        //const ftag_id = 1
        document.getElementById('fage_id_fiscal').value = agente.age_id_fiscal
        document.getElementById('fage_razon_social').value = agente.age_razon_social
    })
        .catch((error) => {
            console.error('Hubo un error:', error);
        });
}


//Cargar agentes
async function cargarEditarAgentes() {
    conexApi.get(`agente?filter[age_id]=${id}`).then((res) => {
        const agente = res.data.data[0];
        console.log(agente);
        document.getElementById('fage_id').value = agente.age_id
        document.getElementById('fage_nombre').value = agente.age_nombre
        document.getElementById('fage_direccion').value = agente.age_direccion
        document.getElementById('fage_telefono').value = agente.age_telefono
        document.getElementById('fage_correo').value = agente.age_correo
        //const ftag_id = document.getElementById('ftag_id').value
        //const ftag_id = 1
        document.getElementById('fage_id_fiscal').value = agente.age_id_fiscal
        document.getElementById('fage_razon_social').value = agente.age_razon_social
    })
        .catch((error) => {
            console.error('Hubo un error:', error);
        });
}

//Para actualizar agente Shipper
async function actualizarShippers() {

    const fage_id = document.getElementById('fage_id').value
    const fage_nombre = document.getElementById('fage_nombre').value
    const fage_direccion = document.getElementById('fage_direccion').value
    const fage_telefono = document.getElementById('fage_telefono').value
    const fage_correo = document.getElementById('fage_correo').value
    //const ftag_id = document.getElementById('ftag_id').value
    //const ftag_id = 1
    const fage_id_fiscal = document.getElementById('fage_id_fiscal').value
    const fage_razon_social = document.getElementById('fage_razon_social').value

    const data = {
        age_id: fage_id,
        age_nombre: fage_nombre,
        age_direccion: fage_direccion,
        age_telefono: fage_telefono,
        age_correo: fage_correo,
        // tag_id: ftag_id,
        age_id_fiscal: fage_id_fiscal,
        age_razon_social: fage_razon_social
    }
    console.log(data)
    conexApi.patch(`agente/${fage_id}`,data).then((res) => {
        console.log(res)
        Swal.fire({
            icon: "success",
            title: "Se actualizó el shipper con éxito!",
        }).then(() => {
            // Redirige después de mostrar el alert
            window.location.href = "listarshippers.html";
        });
    })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Error al actualizar el shipper!",
            })
            console.error('Hubo un error:', error);
        });
}



//Para actualizar agente Agentes
async function actualizarAgentes() {

    const fage_id = document.getElementById('fage_id').value
    const fage_nombre = document.getElementById('fage_nombre').value
    const fage_direccion = document.getElementById('fage_direccion').value
    const fage_telefono = document.getElementById('fage_telefono').value
    const fage_correo = document.getElementById('fage_correo').value
    //const ftag_id = document.getElementById('ftag_id').value
    //const ftag_id = 1
    const fage_id_fiscal = document.getElementById('fage_id_fiscal').value
    const fage_razon_social = document.getElementById('fage_razon_social').value

    const data = {
        age_id: fage_id,
        age_nombre: fage_nombre,
        age_direccion: fage_direccion,
        age_telefono: fage_telefono,
        age_correo: fage_correo,
        // tag_id: ftag_id,
        age_id_fiscal: fage_id_fiscal,
        age_razon_social: fage_razon_social
    }
    console.log(data)
    conexApi.patch(`agente/${fage_id}`,data).then((res) => {
        Swal.fire({
            icon: "success",
            title: "Se actualizó el agente con éxito!",
        }).then(() => {
            // Redirige después de mostrar el alert
            window.location.href = "listaragentes.html";
        });
    })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Error al actualizar el agente!",
            })
            console.error('Hubo un error:', error);
        });
}


window.addEventListener('load', function () {
    if (window.location.href.includes("editar-shipper.html")) {
        cargarEditarShippers();
    }
    if (window.location.href.includes("editar-agente.html")) {
        cargarEditarAgentes();
    }
});


const actualizarShipperButton = document.getElementById('btnActualizarShipper')
actualizarShipperButton.addEventListener('click', () => {
    actualizarShippers()
});
const actualizarAgenteButton = document.getElementById('btnActualizarAgente')
actualizarAgenteButton.addEventListener('click', () => {
    actualizarAgentes()
});

