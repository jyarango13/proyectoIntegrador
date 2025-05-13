import axios from "axios";


const conexApi = axios.create({
    baseURL: 'https://cna-cms.onrender.com/items/'
});



const agregarShipperButton = document.getElementById('btnRegistrarShipper')
agregarShipperButton.addEventListener('click', () => {
    //Capturar datos para agente
    //const fage_id = document.getElementById('fage_id').value
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const fage_nombre = document.getElementById('fage_nombre').value
    const fage_direccion = document.getElementById('fage_direccion').value
    const fage_telefono = document.getElementById('fage_telefono').value
    const fage_correo = document.getElementById('fage_correo').value
    //const ftag_id = document.getElementById('ftag_id').value
    const ftag_id = 2
    const fage_id_fiscal = document.getElementById('fage_id_fiscal').value
    const fage_razon_social = document.getElementById('fage_razon_social').value

    const data = {
        // age_id: fage_id,
        age_nombre: fage_nombre,
        age_direccion: fage_direccion,
        age_telefono: fage_telefono,
        age_correo: fage_correo,
        tag_id: ftag_id,
        age_id_fiscal: fage_id_fiscal,
        age_razon_social: fage_razon_social
    }
    console.log(data)
    if (emailRegex.test(fage_correo)) {
        conexApi.post(`agente`, data).then((res) => {
            Swal.fire({
                icon: "success",
                title: "Shipper creado",
                text: "Se creó el shipper correctamente!",
            }).then(() => {
                 //Redirige después de mostrar el alert
                            window.location.href = "listarshippers.html";
                        });
            console.log(res)
        })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error el correo o el ID Fiscal ya existe!",
                });
                console.error('Hubo un error:', error);
            });
    } else {
        Swal.fire({
            icon: "error",
            title: "El formato del correo electrónico no es válido",
        });
    }
});


const agregarAgenteButton = document.getElementById('btnRegistrarAgente')
agregarAgenteButton.addEventListener('click', () => {
    //Capturar datos para agente
    //const fage_id = document.getElementById('fage_id').value
    const fage_nombre = document.getElementById('fage_nombre').value
    const fage_direccion = document.getElementById('fage_direccion').value
    const fage_telefono = document.getElementById('fage_telefono').value
    const fage_correo = document.getElementById('fage_correo').value
    //const ftag_id = document.getElementById('ftag_id').value
    const ftag_id = 1
    const fage_id_fiscal = document.getElementById('fage_id_fiscal').value
    const fage_razon_social = document.getElementById('fage_razon_social').value

    const data = {
        // age_id: fage_id,
        age_nombre: fage_nombre,
        age_direccion: fage_direccion,
        age_telefono: fage_telefono,
        age_correo: fage_correo,
        tag_id: ftag_id,
        age_id_fiscal: fage_id_fiscal,
        age_razon_social: fage_razon_social
    }
    console.log(data)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailRegex.test(fage_correo)) {
        conexApi.post(`agente`, data).then((res) => {
            Swal.fire({
                icon: "success",
                title: "Agente creado",
                text: "Se creó el agente correctamente!",
            }).then(() => {
                // Redirige después de mostrar el alert
                window.location.href = "listaragentes.html";
            });
            console.log(res)
        })
            .catch((error) => {
                Swal.fire({
                    icon: "error",
                    title: "Error el correo o el ID Fiscal ya existe!",
                });
                console.error('Hubo un error:', error);
            });
    } else {
        Swal.fire({
            icon: "error",
            title: "El formato del correo electrónico no es válido",
        });
    }
});