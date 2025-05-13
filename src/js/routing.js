import axios from "axios";

const conexApi = axios.create({
    baseURL: 'https://cna-cms.onrender.com/items/'
});

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
const tipoRol = userInfo?.role?.name;
let url = new URL(window.location.href);

// Usar URLSearchParams para obtener el valor de 'miVariable'
let id = url.searchParams.get("id");
let operacionesG

var fec = new Date(),
  mes = fec.getMonth() + 1,
  dia = fec.getDate(),
  year = fec.getFullYear();

  //para que capture global del vendedor
 let Gvendedorid
async function cargarEditarOperacion() {

    //Aqui del documento esr_id
    conexApi.get(`documento?filter[doc_id]=${id}&fields=*.*`)
        .then((res) => {
            const doc = res.data.data
            console.log(doc)
            document.getElementById('fesr_id').value = doc[0].esr_id.esr_id
            const fage_id = doc[0].age_id.age_id
            const fage_id_fiscal = doc[0].age_id.age_id_fiscal
            const fage_razon_social = doc[0].age_id.age_razon_social
            const fage_nombre = doc[0].age_id.age_nombre
            const fage_correo = doc[0].age_id.age_correo
            const fage_telefono = doc[0].age_id.age_telefono

            const fship_id = doc[0].shipp_id.age_id
            const fship_id_fiscal = doc[0].shipp_id.age_id_fiscal
            const fship_razon_social = doc[0].shipp_id.age_razon_social
            const fship_nombre = doc[0].shipp_id.age_nombre
            const fship_correo = doc[0].shipp_id.age_correo
            const fship_telefono = doc[0].shipp_id.age_telefono

            //capturo vendedor del documento
            const fvendedor_id_dir = doc[0].vendedor_id_dir.id
            Gvendedorid=fvendedor_id_dir
            console.log(Gvendedorid)

            document.getElementById('fage_id').value = fage_id
            document.getElementById('fage_id_fiscal').value = fage_id_fiscal
            document.getElementById('fage_razon_social').value = fage_razon_social
            document.getElementById('fage_nombre').value = fage_nombre
            document.getElementById('fage_correo').value = fage_correo
            document.getElementById('fage_telefono').value = fage_telefono

            document.getElementById('fship_id').value = fship_id
            document.getElementById('fship_id_fiscal').value = fship_id_fiscal
            document.getElementById('fship_razon_social').value = fship_razon_social
            document.getElementById('fship_nombre').value = fship_nombre
            document.getElementById('fship_correo').value = fship_correo
            document.getElementById('fship_telefono').value = fship_telefono


        })
        .catch((error) => {
            console.error('Hubo un error al agregar las operaciones:', error);
        });


    //Aqui get detalle_operacion
    conexApi.get(`detalle_operacion?filter[doc_id]=${id}`)
        .then((res) => {
            console.log("Aqui operaciones")
            console.log(res.data.data);
            const operaciones = res.data.data
            operacionesG = operaciones
            document.getElementById('frou_doETD').value = operaciones[0].dop_valor
            document.getElementById('frou_doETA').value = operaciones[1].dop_valor
            document.getElementById('frou_doBooking').value = operaciones[2].dop_valor
            document.getElementById('frou_doContenedor').value = operaciones[3].dop_valor
            document.getElementById('frou_doBL').value = operaciones[4].dop_valor
            document.getElementById('frou_doNave').value = operaciones[5].dop_valor
            document.getElementById('frou_doTracking').value = operaciones[6].dop_valor
            document.getElementById('frou_doGDrive').value = operaciones[7].dop_valor
            console.log('Se agregaron correctamente los datos de las operaciones');
        })
        .catch((error) => {
            console.error('Hubo un error al agregar las operaciones:', error);
        });
}

//actualizar routing-------------------------------------
const actualizarRoutingButton = document.getElementById('btnActualizarRouting')
actualizarRoutingButton.addEventListener('click', (e) => {
    e.preventDefault()


    const frou_doETD = document.getElementById('frou_doETD').value
    const frou_doETA = document.getElementById('frou_doETA').value
    const frou_doBooking = document.getElementById('frou_doBooking').value
    const frou_doContenedor = document.getElementById('frou_doContenedor').value
    const frou_doBL = document.getElementById('frou_doBL').value
    const frou_doNave = document.getElementById('frou_doNave').value
    const frou_doTracking = document.getElementById('frou_doTracking').value
    const frou_doGDrive = document.getElementById('frou_doGDrive').value

    const operaciones = [
        {
            // dop_id:,
            dop_nombre: "ETD",
            dop_valor: frou_doETD,
        },
        {
            // dop_id:,
            dop_nombre: "ETA",
            dop_valor: frou_doETA,
        },
        {
            // dop_id:,
            dop_nombre: "Booking",
            dop_valor: frou_doBooking,
        },
        {
            // dop_id:,
            dop_nombre: "Contenedor",
            dop_valor: frou_doContenedor,
        },
        {
            // dop_id:,
            dop_nombre: "BL/AWB/CP",
            dop_valor: frou_doBL,
        },
        {
            // dop_id:,
            dop_nombre: "Nave/Vuelo",
            dop_valor: frou_doNave,
        },
        {
            // dop_id:,
            dop_nombre: "Tracking",
            dop_valor: frou_doTracking,
        },
        {
            // dop_id:,
            dop_nombre: "GDrive",
            dop_valor: frou_doGDrive,
        },
    ]
    const dati = {
        operaciones: operaciones
    }
    console.log(dati)
    const operacionesData = operaciones.map(operacion => ({
        ...operacion,
        doc_id: id
    }));


    //Aqui patch de documento esr_id, age_id, shipp_id
    const dataDocumento = {
        esr_id:2,
        age_id: document.getElementById('fage_id').value,
        shipp_id: document.getElementById('fship_id').value
    }
    console.log(dataDocumento)
    conexApi.patch(`documento/${id}`, dataDocumento)
        .then((res) => {
            for (var i = operacionesG[0].dop_id; i <= operacionesG[7].dop_id; i++) {
                console.log(i)
                conexApi.delete(`detalle_operacion/${i}`)
                    .then(response => {
                        console.log('Registro detalle op borrado con éxito:' + i, response.data);
                    })
                    .catch(error => {
                        console.error('Error al elimnar el registro:', error);
                    });

                //ternmina for
            }
            //Aqui post detalle_operacion
            conexApi.post(`detalle_operacion`, operacionesData)
                .then((res) => {
                    console.log(res);
                    console.log('Se agregaron correctamente los datos de las operaciones');
                 
                })
                .catch((error) => {
                  
                    console.error('Hubo un error al agregar las operaciones:', error);
                });


            console.log(res);
            Swal.fire({
                icon: "success",
                title: "Se actualizó el routing con éxito!",
            }).then(() => {
                // Redirige después de mostrar el alert
                window.location.href = "operaciones-ven.html";
            });
            
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Hubo un error al actualizar el routing!",
            });
            console.error('Hubo un error al agregar las operaciones:', error);
        });


})


//Buscar Agentes
const buscarAgentesButton = document.getElementById('buscarAgente')
buscarAgentesButton.addEventListener('click', () => {
    const idFiscal = document.getElementById('fage_id_fiscal').value
    //Aqui get del agente
    conexApi.get(`agente?filter[age_id_fiscal]=${idFiscal}`)
        .then((res) => {
            const agente = res.data.data[0]
            console.log(agente);
            document.getElementById('fage_id').value = agente.age_id
            document.getElementById('fage_id_fiscal').value = agente.age_id_fiscal
            document.getElementById('fage_razon_social').value = agente.age_razon_social
            document.getElementById('fage_nombre').value = agente.age_nombre
            document.getElementById('fage_correo').value = agente.age_correo
            document.getElementById('fage_telefono').value = agente.age_telefono
        })
        .catch((error) => {
            console.error('Hubo un error al agregar las operaciones:', error);
        });

})

//Buscar Agentes
const buscarAgentesButton2 = document.getElementById('buscarAgente2')
buscarAgentesButton2.addEventListener('click', () => {
    const idFiscal = document.getElementById('fship_id_fiscal').value
    //Aqui get del agente
    conexApi.get(`agente?filter[age_id_fiscal]=${idFiscal}`)
        .then((res) => {
            const agente = res.data.data[0]
            console.log(agente);
            document.getElementById('fship_id').value = agente.age_id
            document.getElementById('fship_id_fiscal').value = agente.age_id_fiscal
            document.getElementById('fship_razon_social').value = agente.age_razon_social
            document.getElementById('fship_nombre').value = agente.age_nombre
            document.getElementById('fship_correo').value = agente.age_correo
            document.getElementById('fship_telefono').value = agente.age_telefono
        })
        .catch((error) => {
            console.error('Hubo un error al agregar las operaciones:', error);
        });

})



//Generar Liquidacion para el documento
const generarLiquidacionButton = document.getElementById('btnGenerarLiquidacion')
generarLiquidacionButton.addEventListener('click', () => {

    //Aqui liquidacion
    const liquidacion = {
        //vemdedor 
        vendedor_id_dir: Gvendedorid,
        liq_total_utilidad: 0,
        liq_rhe: 0,
        liq_fecha: year+"-"+mes+"-"+dia,
        liq_banco: 0,
        liq_operacion: 0,
        liq_pago_vendedor: 0,
        doc_id: id
    }
    const dataDoc={
        esr_id: 3,
        
    }

    

    //Aqui post liquidacion
    conexApi.post(`liquidacion`, liquidacion)
        .then((res) => {
            conexApi.patch(`documento/${id}`, dataDoc)
        .then((res) => {

        }) .catch((error) => {
            console.error('Hubo un error al agregar la liquidacion', error);
        });
            console.log(res);
            console.log('Se agregaron correctamente los datos de la liquidacion');
            Swal.fire({
                icon: "success",
                title: "Se generó la liquidación con éxito!",
            }).then(() => {
                // Redirige después de mostrar el alert
                window.location.href = "operaciones-ven.html";
            });
        })
        .catch((error) => {
            Swal.fire({
                icon: "error",
                title: "Hubo un error al generar la liquidación!",
            });
            console.error('Hubo un error al agregar la liquidacion', error);
        });



})

$(document).ready(function () {
    if (window.location.href.includes(`routing.html`)) {
        cargarEditarOperacion();
        if(tipoRol=='Cliente' || tipoRol=='Vendedor' ){
            $('.content').find("input, select,textarea").prop("disabled", true);
            $('#btnActualizarRouting, #btnGenerarLiquidacion,#buscarAgente,#buscarAgente2').hide();
        }
    }
  });