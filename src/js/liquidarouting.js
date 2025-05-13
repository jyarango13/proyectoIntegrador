import axios from "axios";


const conexApi = axios.create({
  baseURL: 'https://cna-cms.onrender.com/items/'
});
let url = new URL(window.location.href);

// Usar URLSearchParams para obtener el valor de 'miVariable'
let id = url.searchParams.get("id");
let pagosG

const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

const tipoRol = userInfo?.role?.name;

async function cargarEditarLiquidacion() {
  conexApi.get(`detalle_servicio?filter[doc_id]=${id}`).then((res) => {
    const servicios = res.data.data
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

  conexApi.get(`detalle_pagado?filter[doc_id]=${id}`).then((res) => {
    const pagos = res.data.data
    pagosG = pagos
    console.log(pagos)
    // //para detalle pagado
    document.getElementById('fdpa_dpFlete').value = pagos[0].dpa_pago
    document.getElementById('fdpa_dpGasExt').value = pagos[1].dpa_pago
    document.getElementById('fdpa_dpBLAWB').value = pagos[2].dpa_pago
    document.getElementById('fdpa_dpHandling').value = pagos[3].dpa_pago
    document.getElementById('fdpa_dpSeguro').value = pagos[4].dpa_pago
    document.getElementById('fdpa_dpAgAduanas').value = pagos[5].dpa_pago
    document.getElementById('fdpa_dpGasOpe').value = pagos[6].dpa_pago
    document.getElementById('fdpa_dpVistoBueno').value = pagos[7].dpa_pago
    document.getElementById('fdpa_dpGateIn').value = pagos[8].dpa_pago
    document.getElementById('fdpa_dpDescon').value = pagos[9].dpa_pago
    document.getElementById('fdpa_dpAlmacen').value = pagos[10].dpa_pago
    document.getElementById('fdpa_dpTransInt').value = pagos[11].dpa_pago
    document.getElementById('fdpa_dpOtros').value = pagos[12].dpa_pago


  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });

  conexApi.get(`documento?filter[doc_id]=${id}&fields=*.*.*`).then((res) => {
    const doc = res.data.data[0]
    console.log(doc)
    document.getElementById('fvendedor').value = doc.usu_dir.emp_id.emp_razon_social
    document.getElementById('fporcentaje').value = doc.vendedor_id_dir.comision
    document.getElementById('ftotalIngresos').value = doc.doc_total_venta
    document.getElementById('ftotalGastos').value = doc.doc_total_costo
    document.getElementById('futilidad').value =  document.getElementById('ftotalIngresos').value-    document.getElementById('ftotalGastos').value 
    document.getElementById('fcomision').value = document.getElementById('futilidad').value*document.getElementById('fporcentaje').value
    
  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });

  //Traer liquidacion
  conexApi.get(`liquidacion?filter[doc_id]=${id}`).then((res) => {
    const liq = res.data.data[0]
    console.log(liq)
    document.getElementById('fdpa_id').value = liq.liq_id
    document.getElementById('frhe').value = liq.liq_rhe
    document.getElementById('ffecha').value = liq.liq_fecha
    document.getElementById('fbanco').value = liq.liq_banco
    document.getElementById('foperacion').value = liq.liq_operacion
  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });
}

//Calcular
const calcularButton = document.getElementById('btnCalcular')
calcularButton.addEventListener('click', () => {
  //detalle servicios
  const fdoc_dsFlete = document.getElementById('fdoc_dsFlete').value
  const fdoc_dsGasExt = document.getElementById('fdoc_dsGasExt').value
  const fdoc_dsBLAWB = document.getElementById('fdoc_dsBLAWB').value
  const fdoc_dsHandling = document.getElementById('fdoc_dsHandling').value
  const fdoc_dsSeguro = document.getElementById('fdoc_dsSeguro').value
  const fdoc_dsAgAduanas = document.getElementById('fdoc_dsAgAduanas').value
  const fdoc_dsGasOpe = document.getElementById('fdoc_dsGasOpe').value
  const fdoc_dsVistoBueno = document.getElementById('fdoc_dsVistoBueno').value
  const fdoc_dsGateIn = document.getElementById('fdoc_dsGateIn').value
  const fdoc_dsDescon = document.getElementById('fdoc_dsDescon').value
  const fdoc_dsAlmacen = document.getElementById('fdoc_dsAlmacen').value
  const fdoc_dsTransInt = document.getElementById('fdoc_dsTransInt').value
  const fdoc_dsOtros = document.getElementById('fdoc_dsOtros').value


  //detallepagos
  const fdpa_dpFlete = document.getElementById('fdpa_dpFlete').value
  const fdpa_dpGasExt = document.getElementById('fdpa_dpGasExt').value
  const fdpa_dpBLAWB = document.getElementById('fdpa_dpBLAWB').value
  const fdpa_dpHandling = document.getElementById('fdpa_dpHandling').value
  const fdpa_dpSeguro = document.getElementById('fdpa_dpSeguro').value
  const fdpa_dpAgAduanas = document.getElementById('fdpa_dpAgAduanas').value
  const fdpa_dpGasOpe = document.getElementById('fdpa_dpGasOpe').value
  const fdpa_dpVistoBueno = document.getElementById('fdpa_dpVistoBueno').value
  const fdpa_dpGateIn = document.getElementById('fdpa_dpGateIn').value
  const fdpa_dpDescon = document.getElementById('fdpa_dpDescon').value
  const fdpa_dpAlmacen = document.getElementById('fdpa_dpAlmacen').value
  const fdpa_dpTransInt = document.getElementById('fdpa_dpTransInt').value
  const fdpa_dpOtros = document.getElementById('fdpa_dpOtros').value


  function calcular() {
    const suma = parseInt(fdoc_dsFlete) +
      parseInt(fdoc_dsGasExt) +
      parseInt(fdoc_dsBLAWB) +
      parseInt(fdoc_dsHandling) +
      parseInt(fdoc_dsSeguro) +
      parseInt(fdoc_dsAgAduanas) +
      parseInt(fdoc_dsGasOpe) +
      parseInt(fdoc_dsVistoBueno) +
      parseInt(fdoc_dsGateIn) +
      parseInt(fdoc_dsDescon) +
      parseInt(fdoc_dsAlmacen) +
      parseInt(fdoc_dsTransInt) +
      parseInt(fdoc_dsOtros)

    document.getElementById('ftotalIngresos').value = suma

    const suma2 = parseInt(fdpa_dpFlete) +
      parseInt(fdpa_dpGasExt) +
      parseInt(fdpa_dpBLAWB) +
      parseInt(fdpa_dpHandling) +
      parseInt(fdpa_dpSeguro) +
      parseInt(fdpa_dpAgAduanas) +
      parseInt(fdpa_dpGasOpe) +
      parseInt(fdpa_dpVistoBueno) +
      parseInt(fdpa_dpGateIn) +
      parseInt(fdpa_dpDescon,) +
      parseInt(fdpa_dpAlmacen,) +
      parseInt(fdpa_dpTransInt,) +
      parseInt(fdpa_dpOtros)
    document.getElementById('ftotalGastos').value = suma2

    const utilidad = suma - suma2
    document.getElementById('futilidad').value = utilidad

    const comision = document.getElementById('fporcentaje').value
    const final = utilidad * parseFloat(comision)
    console.log(final)
    document.getElementById('fcomision').value = parseFloat(final)
  }
  calcular()
})

//Actualizar liquidacion
const actualizarLiquidacionButton = document.getElementById('btnActualizarLiquidacion')
actualizarLiquidacionButton.addEventListener('click', () => {

  const fliq_rhe = document.getElementById('frhe').value
  const fliq_fecha = document.getElementById('ffecha').value
  const fliq_banco = document.getElementById('fbanco').value
  const fliq_operacion = document.getElementById('foperacion').value
  const fliq_comision = document.getElementById('fcomision').value
  

  const data = {
    liq_rhe: fliq_rhe,
    liq_fecha: fliq_fecha,
    liq_banco: fliq_banco,
    liq_operacion: fliq_operacion,
    liq_pago_vendedor:fliq_comision
  }

  console.log(data)
  // //Patch Liquidacion
  const id_liq = document.getElementById('fdpa_id').value
  //console.log(id_liq)


  //para el documento
  // "doc_total_venta": null,
  // "doc_total_costo": null,


  const ftotalIngresos = document.getElementById('ftotalIngresos').value
  const ftotalGastos = document.getElementById('ftotalGastos').value

  const dato = {
    doc_total_venta: ftotalIngresos,
    doc_total_costo: ftotalGastos,
  }







  //para editar los pagos
  const fdpa_dpFlete = document.getElementById('fdpa_dpFlete').value
  const fdpa_dpGasExt = document.getElementById('fdpa_dpGasExt').value
  const fdpa_dpBLAWB = document.getElementById('fdpa_dpBLAWB').value
  const fdpa_dpHandling = document.getElementById('fdpa_dpHandling').value
  const fdpa_dpSeguro = document.getElementById('fdpa_dpSeguro').value
  const fdpa_dpAgAduanas = document.getElementById('fdpa_dpAgAduanas').value
  const fdpa_dpGasOpe = document.getElementById('fdpa_dpGasOpe').value
  const fdpa_dpVistoBueno = document.getElementById('fdpa_dpVistoBueno').value
  const fdpa_dpGateIn = document.getElementById('fdpa_dpGateIn').value
  const fdpa_dpDescon = document.getElementById('fdpa_dpDescon').value
  const fdpa_dpAlmacen = document.getElementById('fdpa_dpAlmacen').value
  const fdpa_dpTransInt = document.getElementById('fdpa_dpTransInt').value
  const fdpa_dpOtros = document.getElementById('fdpa_dpOtros').value

  const pagos = [
    {
      // dpa_id:,
      dpa_nombre: "Flete",
      dpa_pago: fdpa_dpFlete,
    },
    {
      // dpa_id:,
      dpa_nombre: "GastosExtranjero",
      dpa_pago: fdpa_dpGasExt,
    },
    {
      // dpa_id:,
      dpa_nombre: "BL-AWB-CPORTE",
      dpa_pago: fdpa_dpBLAWB,
    },
    {
      // dpa_id:,
      dpa_nombre: "Handling",
      dpa_pago: fdpa_dpHandling,
    },
    {
      // dpa_id:,
      dpa_nombre: "Seguro",
      dpa_pago: fdpa_dpSeguro,
    },
    {
      // dpa_id:,
      dpa_nombre: "AdAduanas",
      dpa_pago: fdpa_dpAgAduanas,
    },
    {
      // dpa_id:,
      dpa_nombre: "GastosOperativos",
      dpa_pago: fdpa_dpGasOpe,
    },
    {
      // dpa_id:,
      dpa_nombre: "VistoBueno",
      dpa_pago: fdpa_dpVistoBueno,
    },
    {
      // dpa_id:,
      dpa_nombre: "GateIN",
      dpa_pago: fdpa_dpGateIn,
    },
    {
      // dpa_id:,
      dpa_nombre: "Desconsolidacion",
      dpa_pago: fdpa_dpDescon,
    },
    {
      // dpa_id:,
      dpa_nombre: "Almacen-DAntici",
      dpa_pago: fdpa_dpAlmacen,
    },
    {
      // dpa_id:,
      dpa_nombre: "TransporteInterno",
      dpa_pago: fdpa_dpTransInt,
    },
    {
      // dpa_id:,
      dpa_nombre: "OtrosNE",
      dpa_pago: fdpa_dpOtros,
    }
  ]

  const datu = {
    pagos: pagos
  }
  console.log(datu)
  const pagosData = pagos.map(pago => ({
    ...pago,
    doc_id: id
  }));

  console.log(pagosData)
  conexApi.patch(`liquidacion/${id_liq}`, data).then((res) => {
    console.log(res)
    //eliminar detalle_pagos
    for (var e = pagosG[0].dpa_id; e <= pagosG[12].dpa_id; e++) {
      console.log(e)
      conexApi.delete(`detalle_pagado/${e}`)
        .then(response => {
          console.log('Registro eliminado con éxito:' + e, response.data);
        })
        .catch(error => {
          console.error('Error al elimnar el registro:', error);
        });

      //ternmina for
    }
    conexApi.patch(`documento/${id}`, dato).then((res) => {
      console.log(res)

    })
      .catch((error) => {

        console.error('Hubo un error:', error);
      });
    //Aqui post detalle_pagos
    conexApi.post(`detalle_pagado`, pagosData)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.error('Hubo un error al agregar los pagos:', error);
      });

    //////////////////////////////////////////// 
    Swal.fire({
      icon: "success",
      title: "Se actualizó correctamente la liquidación",
    }).then(() => {
      // Redirige después de mostrar el alert
      window.location.href = "liquidaciones-ven.html";
  });
  })
    .catch((error) => {
      console.error('Hubo un error:', error);
    });


})





$(document).ready(function () {
  if (window.location.href.includes(`liq-routing.html`)) {
    cargarEditarLiquidacion();
    if(tipoRol=='Vendedor'){
      $('.content').find("input").prop("disabled", true);
      $('#btnActualizarLiquidacion,#btnCalcular').hide();
    }
   
  }
});