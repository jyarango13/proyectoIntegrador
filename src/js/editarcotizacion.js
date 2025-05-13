import axios from "axios";
import { cargarPaises } from "./paises";
const conexApi = axios.create({
  baseURL: 'https://cna-cms.onrender.com/items/'
});

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));


const tipoRol = userInfo?.role?.name;

let url = new URL(window.location.href);

// Usar URLSearchParams para obtener el valor de 'miVariable'
let id = url.searchParams.get("id");


//capturar fecha de hoy
var fec = new Date(),
  mes = fec.getMonth() + 1,
  dia = fec.getDate(),
  year = fec.getFullYear();

async function cargarEditarCotizacion() {

  conexApi.get(`documento/?filter[doc_id]=${id}&fields=*.*.*`).then((res) => {
    const documento = res.data.data[0]
    console.log(documento)
    //primera parte razon social
    document.getElementById('fusu_nombre_apellido').value = documento.usu_dir.first_name + " " + documento.usu_dir.last_name;
    document.getElementById('fusu_dni').value = documento.usu_dir.dni;
    document.getElementById('fusu_email').value = documento.usu_dir.email;
    document.getElementById('fusu_telefono').value = documento.usu_dir.tel_usu_dir;
    document.getElementById('frazonSocial').value = documento.usu_dir.emp_id.emp_razon_social
    document.getElementById('fruc').value = documento.usu_dir.emp_id.emp_ruc


    const fusu_nombre_apellido = document.getElementById('fusu_nombre_apellido')
    const fusu_dni = document.getElementById('fusu_dni')
    const fusu_email = document.getElementById('fusu_email')
    const fusu_telefono = document.getElementById('fusu_telefono')
    const frazonSocial = document.getElementById('frazonSocial')
    const fruc = document.getElementById('fruc')
    fusu_nombre_apellido.disabled = true
    fusu_dni.disabled = true
    fusu_email.disabled = true
    fusu_telefono.disabled = true
    frazonSocial.disabled = true
    fruc.disabled = true

    //resto
    document.getElementById('fdoc_fecha').value = documento.doc_fecha
    document.getElementById('fcliente_id').value = documento.usu_dir.id
    // buscarUsuarioId(documento.cliente_id)
    // document.getElementById('fvendedor_id').value = documento.vendedor_id
    document.getElementById('ftop_id').value = documento.top_id.top_id
    document.getElementById('fmtx_id').value = documento.mtx_id.mtx_id
    document.getElementById('fdoc_incoterm').value = documento.doc_incoterm
    document.getElementById('fdoc_tcarga').value = documento.doc_tcarga

    // document.getElementById('fpais_origen_id').value = documento.pais_origen_id.pais_id
    $('#fpais_origen_id').val(documento.pais_origen_id.pais_id).trigger('change');
    document.getElementById('fdoc_puerto_ori').value = documento.doc_puerto_ori
    document.getElementById('fdoc_recojo').value = documento.doc_recojo

    // document.getElementById('fpais_destino_id').value = documento.pais_destino_id.pais_id
    document.getElementById('fdoc_puerto_dest').value = documento.doc_puerto_dest
    document.getElementById('fdoc_entrega').value = documento.doc_entrega

    $('#fpais_destino_id').val(documento.pais_destino_id.pais_id).trigger('change');

    document.getElementById('fdoc_producto').value = documento.doc_producto
    document.getElementById('fdoc_bultos').value = documento.doc_bultos
    document.getElementById('fdoc_medidas').value = documento.doc_medidas
    document.getElementById('fdoc_peso').value = documento.doc_peso
    document.getElementById('fdoc_volumen').value = documento.doc_volumen
    document.getElementById('fdoc_pago').value = documento.doc_pago
    document.getElementById('fdoc_moneda').value = documento.doc_moneda
    document.getElementById('fdoc_validez').value = documento.doc_validez
    document.getElementById('fdoc_cotizacion_notas').value = documento.doc_cotizacion_notas
    document.getElementById('fest_id').value = documento.est_id
    document.getElementById('fesr_id').value = documento.esr_id.esr_id

  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });


  //cargar detalle_servicio
  conexApi.get(`detalle_servicio?filter[doc_id]=${id}`).then((res) => {
    const servicios = res.data.data
    serviciosG = servicios
    console.log(servicios)
    //servicios
    document.getElementById('fdoc_dsFlete').value = servicios[0].dse_precio
    document.getElementById('fdoc_dsGasExt').value = servicios[1].dse_precio
    document.getElementById('fdoc_dsBLAWB').value = servicios[2].dse_precio
    document.getElementById('fdoc_dsHandling').value = servicios[3].dse_precio
    document.getElementById('fdoc_dsSeguro').value = servicios[4].dse_precio
    document.getElementById('fdoc_dsAgAduanas').value = servicios[5].dse_precio
    document.getElementById('fdoc_dsGasOpe').value = servicios[6].dse_precio
    document.getElementById('fdoc_dsVistoBueno').value = servicios[7].dse_precio
    document.getElementById('fdoc_dsGateIn').value = servicios[8].dse_precio
    document.getElementById('fdoc_dsDescon').value = servicios[9].dse_precio
    document.getElementById('fdoc_dsAlmacen').value = servicios[10].dse_precio
    document.getElementById('fdoc_dsTransInt').value = servicios[11].dse_precio
    document.getElementById('fdoc_dsOtros').value = servicios[12].dse_precio
  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });


  //cargar derechos_aduanas
  conexApi.get(`derechos_aduanas?filter[doc_id]=${id}`).then((res) => {
    const daduana = res.data.data
    aduanasG = daduana
    console.log(daduana)


    document.getElementById('fdoc_daValorFOB').value = daduana[0].dad_precio
    document.getElementById('fdoc_daValorFlete').value = daduana[1].dad_precio
    document.getElementById('fdoc_daSeguro').value = daduana[2].dad_precio
    document.getElementById('fdoc_daValorCIF').value = daduana[3].dad_precio
    document.getElementById('fdoc_daAdValorem').value = daduana[4].dad_precio
    document.getElementById('fdoc_daISC').value = daduana[5].dad_precio
    document.getElementById('fdoc_daIPM').value = daduana[6].dad_precio
    document.getElementById('fdoc_daIGV').value = daduana[7].dad_precio
    document.getElementById('fdoc_daPercepcion').value = daduana[8].dad_precio
  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });


}


//Generar routing

const generarRoutingButton = document.getElementById('btnGenerarRouting')
generarRoutingButton.addEventListener('click', () => {

  const data = {
    est_id: 2,
  }
  conexApi.patch(`documento/${id}`, data)
    .then((res) => {
      console.log(res);
      Swal.fire({
        icon: "success",
        title: "Se generó el routing correctamente!",
      }).then(() => {
        // Redirige después de mostrar el alert
        window.location.href = "cotizaciones-ven.html";
    });
      console.log('Se agrego correctamente los datos')
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Hubo un error al crear el routing!",
        text: error,
      });
      console.error('Hubo un error al actualizar el documento:', error);
    });

})




let aduanasG
let serviciosG

const actualizarDocumentoButton = document.getElementById('btnActualizarDocumento')
actualizarDocumentoButton.addEventListener('click', () => {


  //para el documento
  //const fdoc_fecha = document.getElementById('fdoc_fecha').value;
  // const fcliente_id = document.getElementById('fcliente_id').value;
  //const fvendedor_id = document.getElementById('fvendedor_id').value;
  const ftop_id = document.getElementById('ftop_id').value;
  const fmtx_id = document.getElementById('fmtx_id').value;
  const fdoc_incoterm = document.getElementById('fdoc_incoterm').value;
  const fdoc_tcarga = document.getElementById('fdoc_tcarga').value;

  const fpais_origen_id = document.getElementById('fpais_origen_id').value;
  //const fpais_origen_id = "4";
  const fdoc_puerto_ori = document.getElementById('fdoc_puerto_ori').value;
  const fdoc_recojo = document.getElementById('fdoc_recojo').value;

  const fpais_destino_id = document.getElementById('fpais_destino_id').value;
  //const fpais_destino_id = "7";
  const fdoc_puerto_dest = document.getElementById('fdoc_puerto_dest').value;
  const fdoc_entrega = document.getElementById('fdoc_entrega').value;

  const fdoc_producto = document.getElementById('fdoc_producto').value;
  const fdoc_bultos = document.getElementById('fdoc_bultos').value;
  const fdoc_medidas = document.getElementById('fdoc_medidas').value;
  const fdoc_peso = document.getElementById('fdoc_peso').value;
  const fdoc_volumen = document.getElementById('fdoc_volumen').value;

  const fdoc_pago = document.getElementById('fdoc_pago').value;
  const fdoc_moneda = document.getElementById('fdoc_moneda').value;
  const fdoc_validez = document.getElementById('fdoc_validez').value;
  const fdoc_cotizacion_notas = document.getElementById('fdoc_cotizacion_notas').value;
  //const fest_id = document.getElementById('fest_id').value;
  const fest_id = 1;
  const fdoc_fesr_id = document.getElementById('fesr_id').value



  // //para los datos del servicio
  const fdoc_dsFlete = document.getElementById('fdoc_dsFlete').value;
  const fdoc_dsGasExt = document.getElementById('fdoc_dsGasExt').value;
  const fdoc_dsBLAWB = document.getElementById('fdoc_dsBLAWB').value;
  const fdoc_dsHandling = document.getElementById('fdoc_dsHandling').value;
  const fdoc_dsSeguro = document.getElementById('fdoc_dsSeguro').value;
  const fdoc_dsAgAduanas = document.getElementById('fdoc_dsAgAduanas').value;
  const fdoc_dsGasOpe = document.getElementById('fdoc_dsGasOpe').value;
  const fdoc_dsVistoBueno = document.getElementById('fdoc_dsVistoBueno').value;
  const fdoc_dsGateIn = document.getElementById('fdoc_dsGateIn').value;
  const fdoc_dsDescon = document.getElementById('fdoc_dsDescon').value;
  const fdoc_dsAlmacen = document.getElementById('fdoc_dsAlmacen').value;
  const fdoc_dsTransInt = document.getElementById('fdoc_dsTransInt').value;
  const fdoc_dsOtros = document.getElementById('fdoc_dsOtros').value;

  // //para el derecho aduanas
  const fdoc_daValorFOB = document.getElementById('fdoc_daValorFOB').value;
  const fdoc_daValorFlete = document.getElementById('fdoc_daValorFlete').value;
  const fdoc_daSeguro = document.getElementById('fdoc_daSeguro').value;
  const fdoc_daValorCIF = document.getElementById('fdoc_daValorCIF').value;
  const fdoc_daAdValorem = document.getElementById('fdoc_daAdValorem').value;
  const fdoc_daISC = document.getElementById('fdoc_daISC').value;
  const fdoc_daIPM = document.getElementById('fdoc_daIPM').value;
  const fdoc_daIGV = document.getElementById('fdoc_daIGV').value;
  const fdoc_daPercepcion = document.getElementById('fdoc_daPercepcion').value;

  const daduanas = [
    {
      // dad_id:,
      dad_nombre: "Valor FOB",
      dad_precio: fdoc_daValorFOB,
    },
    {
      // dad_id:,
      dad_nombre: "Valor Flete",
      dad_precio: fdoc_daValorFlete,
    },
    {
      // dad_id:,
      dad_nombre: "Seguro",
      dad_precio: fdoc_daSeguro,
    },
    {
      // dad_id:,
      dad_nombre: "Valor CIF",
      dad_precio: fdoc_daValorCIF,
    },
    {
      // dad_id:,
      dad_nombre: "AdValorem",
      dad_precio: fdoc_daAdValorem,
    },
    {
      // dad_id:,
      dad_nombre: "ISC",
      dad_precio: fdoc_daISC,
    },
    {
      // dad_id:,
      dad_nombre: "IPM",
      dad_precio: fdoc_daIPM,
    },
    {
      // dad_id:,
      dad_nombre: "IGV",
      dad_precio: fdoc_daIGV,
    },
    {
      // dad_id:,
      dad_nombre: "Percepcion",
      dad_precio: fdoc_daPercepcion,
    },
  ]
  const servicios = [
    {
      // dse_id:,
      dse_nombre: "Flete",
      dse_precio: fdoc_dsFlete,
      dse_igv: 0,
    },
    {
      // dse_id:,
      dse_nombre: "GastosExtranjero",
      dse_precio: fdoc_dsGasExt,
      dse_igv: 0,

    },
    {
      // dse_id:,
      dse_nombre: "BL-AWB-CPORTE",
      dse_precio: fdoc_dsBLAWB,
      dse_igv: 0,

    },
    {
      // dse_id:,
      dse_nombre: "Handling",
      dse_precio: fdoc_dsHandling,
      dse_igv: 0,

    },
    {
      // dse_id:,
      dse_nombre: "Seguro",
      dse_precio: fdoc_dsSeguro,
      dse_igv: 0,

    },
    {
      // dse_id:,
      dse_nombre: "AdAduanas",
      dse_precio: fdoc_dsAgAduanas,
      dse_igv: 0,

    },
    {
      // dse_id:,
      dse_nombre: "GastosOperativos",
      dse_precio: fdoc_dsGasOpe,
      dse_igv: 0,

    },
    {
      // dse_id:,
      dse_nombre: "VistoBueno",
      dse_precio: fdoc_dsVistoBueno,
      dse_igv: 0,

    },
    {
      // dse_id:,
      dse_nombre: "GateIN",
      dse_precio: fdoc_dsGateIn,
      dse_igv: 0,

    },
    {
      // dse_id:,
      dse_nombre: "Desconsolidacion",
      dse_precio: fdoc_dsDescon,
      dse_igv: 0,

    },
    {
      // dse_id:,
      dse_nombre: "Almacen-DAntici",
      dse_precio: fdoc_dsAlmacen,
      dse_igv: 0,

    },
    {
      // dse_id:,
      dse_nombre: "TransporteInterno",
      dse_precio: fdoc_dsTransInt,
      dse_igv: 0,

    },
    {
      // dse_id:,
      dse_nombre: "OtrosNE",
      dse_precio: fdoc_dsOtros,
      dse_igv: 0,
    }
  ]


  //data para documento
  const data = {
    doc_fecha: year + "-" + mes + "-" + dia,
    // cliente_id: fcliente_id,
    // vendedor_id: 2,
    top_id: ftop_id,
    mtx_id: fmtx_id,
    doc_incoterm: fdoc_incoterm,
    doc_tcarga: fdoc_tcarga,
    pais_origen_id: fpais_origen_id,
    doc_puerto_ori: fdoc_puerto_ori,
    doc_recojo: fdoc_recojo,
    pais_destino_id: fpais_destino_id,
    doc_puerto_dest: fdoc_puerto_dest,
    doc_entrega: fdoc_entrega,
    doc_producto: fdoc_producto,
    doc_bultos: fdoc_bultos,
    doc_medidas: fdoc_medidas,
    doc_peso: fdoc_peso,
    doc_volumen: fdoc_volumen,
    doc_pago: fdoc_pago,
    doc_moneda: fdoc_moneda,
    doc_validez: fdoc_validez,
    doc_cotizacion_notas: fdoc_cotizacion_notas,
    est_id: fest_id,
    esr_id: fdoc_fesr_id,
  }

  //imprimiendo data de documento
  console.log(data)

  const date = {
    daduanas: daduanas
  }

  const dato = {
    servicios: servicios
  }


  console.log(date)
  console.log(dato)



  const daduanasData = daduanas.map(daduana => ({
    ...daduana,
    doc_id: id
  }));
  const serviciosData = servicios.map(servicio => ({
    ...servicio,
    doc_id: id
  }));

  //Api patch documento
  conexApi.patch(`documento/${id}`, data)
    .then((res) => {
        //eliminar aduanas
  for (var i = aduanasG[0].dad_id; i <= aduanasG[8].dad_id; i++) {
    console.log(i)
    conexApi.delete(`derechos_aduanas/${i}`)
      .then(response => {
        console.log('Registro aduana con éxito:' + i, response.data);
      })
      .catch(error => {
        console.error('Error al elimnar el registro:', error);
      });

    //ternmina for
  }

  //eliminar servicios
  for (var e = serviciosG[0].dse_id; e <= serviciosG[12].dse_id; e++) {
    console.log(i)
    conexApi.delete(`detalle_servicio/${e}`)
      .then(response => {
        console.log('Registro eliminado con éxito:' + e, response.data);
      })
      .catch(error => {
        console.error('Error al elimnar el registro:', error);
      });
    //ternmina for
  }
      //respuesta afirmativa del post
      console.log(res);
      // //Api post detalle servicio
      conexApi.post(`detalle_servicio`, serviciosData)
        .then((res) => {
          console.log(res);
          console.log('Se agregaron correctamente los datos de los servicios');
        })
        .catch((error) => {
          console.error('Hubo un error al agregar los servicios:', error);
        });
      // //Api post derecho aduanas
      conexApi.post(`derechos_aduanas`, daduanasData)
        .then((res) => {
          console.log(res);
          console.log('Se actualizaron correctamente los datos de los derechos');
        })
        .catch((error) => {
          console.error('Hubo un error al editar los derechos de aduana:', error);
        });
      Swal.fire({
        icon: "success",
        title: "Cotización actualizada correctamente!",
      }).then(() => {
        // Redirige después de mostrar el alert
        window.location.href = "cotizaciones-ven.html";
    });
      console.log('Se agrego correctamente los datos')
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Hubo un error al actualizar la cotización!",
        text: error,
      });
      console.error('Hubo un error al actualizar el documento:', error);
    });
});


$(document).ready(function () {
  if (window.location.href.includes(`editar_cot.html`)) {
    inicializar();
    if(tipoRol=='Cliente'){
      $('.content').find("input, select,textarea").prop("disabled", true);
      $('#btnActualizarDocumento, #btnGenerarRouting').hide();
    }
   
  }
});

const inicializar = async () => {
  await cargarPaises();
  await cargarEditarCotizacion();
}
