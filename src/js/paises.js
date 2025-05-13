import axios from "axios";

export const cargarPaises =  async () => {
    axios.get(" https://cna-cms.onrender.com/items/paises?limit=250").then((res) => {
        const select_pais_ori = document.getElementById("fpais_origen_id");
        const select_pais_des = document.getElementById("fpais_destino_id");
      
        select_pais_ori.innerHTML = '';
        select_pais_des.innerHTML = '';
    
            res.data.data.forEach((element) => {
                const option = document.createElement("option");
                option.text = element.pais_nombre;
                option.value = element.pais_id;
                const option2 = document.createElement("option");
                option2.text = element.pais_nombre;
                option2.value = element.pais_id;

                select_pais_ori.add(option);
                select_pais_des.add(option2);
        } );
    });
}

export const cargarPaisesEdit =  async ()=>{
    axios.get(" https://cna-cms.onrender.com/items/paises?limit=250").then((res) => {
        const select_pais_ori = document.getElementById("fpais_origen_id");
        const select_pais_des = document.getElementById("fpais_destino_id");
    
            res.data.data.forEach((element) => {
                const option = document.createElement("option");
                option.text = element.pais_nombre;
                option.value = element.pais_id;
                const option2 = document.createElement("option");
                option2.text = element.pais_nombre;
                option2.value = element.pais_id;
                select_pais_ori.add(option);
                select_pais_des.add(option2);
        } );
    });
}


$(document).ready(function () {
    if (window.location.href.includes("cotizacion.html")) {
        cargarPaises();
    }
    if (window.location.href.includes("editar_cot.html")) {
        cargarPaisesEdit();
    }
  });
/*window.addEventListener('load', function () {
    if (window.location.href.includes("cotizacion.html")) {
        cargarPaises();
    }
    if (window.location.href.includes("editar_cot.html")) {
        cargarPaisesEdit();
    }
  });*/
