if (sessionStorage.getItem('userInfo') === null) {
  window.location = 'login.html';
}
console.log(sessionStorage.getItem('userInfo'));
const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

const nombreSesion = document.getElementById('nombreSesion');
nombreSesion.textContent = userInfo.first_name

const tipoRol = document.getElementById('estadoSesion');
tipoRol.textContent = userInfo?.role?.name;

if (!sessionStorage.getItem('userInfo')) {
  window.location = 'login.html';


  console.log(sessionStorage.getItem('userInfo'));
  const userInfo = JSON.parse(sessionStorage.getItem('userInfo'));

  const nombreSesion = document.getElementById('nombreSesion');
  nombreSesion.textContent = userInfo.first_name

  const tipoRol = document.getElementById('estadoSesion');
  tipoRol.textContent = userInfo?.role?.name;

} else {
  if (userInfo?.role?.name === "Contador") {
    // Usuario con el rol "Contador"
    // Puedes agregar aquí cualquier acción específica que desees para estos usuarios.

    // Bloquear el acceso a la página "nuevo-usuario.html"
    const currentPage = window.location.pathname;
    if (currentPage.includes("adm-editar-usuario.html")
      || currentPage.includes("adm-nuevo-usuario.html")
      || currentPage.includes("cotizacion.html")
      || currentPage.includes("cotizaciones-ven.html")
      || currentPage.includes("editar_cot.html")
      || currentPage.includes("editar_agente.html")
      || currentPage.includes("editar_shipper.html")
      || currentPage.includes("editar_usuario.html")
      || currentPage.includes("listaragentes.html")
      || currentPage.includes("listarshippers.html")
      || currentPage.includes("listarusuarios.html")
      || currentPage.includes("listarusuariosadm.html")
      || currentPage.includes("nuevo-agente.html")
      || currentPage.includes("nuevo-shipper.html")
      || currentPage.includes("nuevo-usuario.html")
      || currentPage.includes("operaciones.html")

    ) {
      // alert("Acceso no permitido para un Contador!");
      // window.location = 'index.html'; 
      // // Puedes redirigir a otra página si lo deseas.

      Swal.fire({
        icon: "error",
        title: "Acceso no permitido para un Contador!",
      })
    window.location = 'index.html'; // Puedes redirigir a otra página si lo deseas.

    }
    //Restricciones Cliente
  }else if(userInfo?.role?.name === "Cliente"){
    const currentPage = window.location.pathname;
    if (currentPage.includes("adm-editar-usuario.html")
    || currentPage.includes("adm-nuevo-usuario.html")
    || currentPage.includes("editar_agente.html")
    || currentPage.includes("editar_shipper.html")
    || currentPage.includes("editar_usuario.html")
    || currentPage.includes("listaragentes.html")
    || currentPage.includes("listarshippers.html")
    || currentPage.includes("listarusuarios.html")
    || currentPage.includes("listarusuariosadm.html")
    || currentPage.includes("nuevo-agente.html")
    || currentPage.includes("nuevo-shipper.html")
    || currentPage.includes("nuevo-usuario.html")

    || currentPage.includes("liq-routing.html")
    || currentPage.includes("liquidaciones-ven.html")

  ){
    Swal.fire({
      icon: "error",
      title: "Acceso no permitido para un cliente!",
    }) 
    window.location = 'index.html'; // Puedes redirigir a otra página si lo deseas.
    
  }
  }
  //Restricciones Operativo
  else if(userInfo?.role?.name === "Operativo"){
    const currentPage = window.location.pathname;
    if (currentPage.includes("adm-editar-usuario.html")
    || currentPage.includes("adm-nuevo-usuario.html")
    || currentPage.includes("cotizacion.html")
    || currentPage.includes("cotizaciones-ven.html")
    || currentPage.includes("editar_cot.html")
    || currentPage.includes("nuevo-usuario.html")
    || currentPage.includes("editar_usuario.html")
    || currentPage.includes("listarusuarios.html")
    || currentPage.includes("listarusuariosadm.html")
    || currentPage.includes("liq-routing.html")
    || currentPage.includes("liquidaciones-ven.html")
  ){
    Swal.fire({
      icon: "error",
      title: "Acceso no permitido para un operativo!",
    }) 
    window.location = 'index.html'; // Puedes redirigir a otra página si lo deseas.
  }
  }//Restricciones Vendedor
  else if(userInfo?.role?.name === "Vendedor"){
    const currentPage = window.location.pathname;
    if (
      currentPage.includes("nuevo-ususesion.html")
    || currentPage.includes("listarusuariosadm.html")
    || currentPage.includes("liquidaciones.html")
    || currentPage.includes("nuevo-agente.html")
    || currentPage.includes("nuevo-shipper.html")
    || currentPage.includes("listaragentes.html")
    || currentPage.includes("listarshippers.html")
    || currentPage.includes("editar_agente.html")
    || currentPage.includes("editar_shipper.html")
  ){
    // alert("Acceso no permitido para un vendedor!")
    // window.location = 'index.html';
    Swal.fire({
      icon: "error",
      title: "Acceso no permitido para un vendedor!",
    }) 
    window.location = 'index.html'; // Puedes redirigir a otra página si lo deseas.
  }
  }
  else {
    // Usuario sin el rol "Contador"
    // Puedes manejar este caso según tus necesidades.
  }
}

const menuContainer = document.getElementById('sidebar-menu');

if (menuContainer) {

  const menuRoles = {
    Administrator: [
      {
        title: 'Inicio',
        icon: 'fas fa-tachometer-alt',
        link: '#',
      },
      {

        title: 'Cotizaciones',
        icon: 'fas fa-folder-open',
        link: '#',
        subItems: [
          { title: 'Nueva cotización', link: 'cotizacion.html', icon: 'far fa-circle nav-icon' },
          { title: 'Listar Cotizaciones', link: 'cotizaciones-ven.html', icon: 'far fa-circle nav-icon' }
        ]
      },
      {
        title: 'Clientes',
        icon: 'fas fa-people-arrows',
        link: '#',
        subItems: [
          { title: 'Nuevo Cliente', link: 'nuevo-usuario.html', icon: 'far fa-circle nav-icon' },
          { title: 'Listar Clientes', link: 'listarusuarios.html', icon: 'far fa-circle nav-icon' }
        ]
      },
      {
        title: 'Operaciones',
        icon: 'fas fa-file-contract',
        link: '#',
        subItems: [
          { title: 'Listar Operaciones', link: 'operaciones-ven.html', icon: 'far fa-circle nav-icon' }
        ]
      },
      {
        title: 'Shipper',
        icon: 'fas fa-ship',
        link: '#',
        subItems: [
          { title: 'Nuevo Shipper', link: 'nuevo-shipper.html', icon: 'far fa-circle nav-icon' },
          { title: 'Listar Shippers', link: 'listarshippers.html', icon: 'far fa-circle nav-icon' }
        ]
      },
      {
        title: 'Agente',
        icon: 'fas fa-truck',
        link: '#',
        subItems: [
          { title: 'Nuevo Agente', link: 'nuevo-agente.html', icon: 'far fa-circle nav-icon' },
          { title: 'Listar Agente', link: 'listaragentes.html', icon: 'far fa-circle nav-icon' }
        ]
      },
      {
        title: 'Liquidaciones',
        icon: 'fas fa-coins',
        link: '#',
        subItems: [
          { title: 'Listar Liquidaciones', link: 'liquidaciones-ven.html', icon: 'far fa-circle nav-icon' }
        ]
      },
      {
        title: 'Usuarios',
        icon: 'fas fa-users',
        link: '#',
        subItems: [
          { title: 'Nuevo Usuario', link: 'nuevo-ususesion.html', icon: 'far fa-circle nav-icon' },
          { title: 'Listar Usuarios', link: 'listarusuariosadm.html', icon: 'far fa-circle nav-icon' }
        ]
      },
      {
        title: 'Salir',
        icon: 'fas fa-share',
        link: 'login.html',
      }
      // ... otros elementos del menú ...
    ],
    Cliente: [
      {
        title: 'Inicio',
        icon: 'fas fa-tachometer-alt',
        link: '#',
      },
      {
        //Solo de el
        title: 'Cotizaciones',
        icon: 'fas fa-folder-open',
        link: '#',
        subItems: [
          { title: 'Listar Cotizaciones', link: 'cotizaciones-ven.html', icon: 'far fa-circle nav-icon' }
        ]
      },
      {
        //solo de el
        title: 'Operaciones',
        icon: 'fas fa-file-contract',
        link: '#',
        subItems: [
          { title: 'Listar Operaciones', link: 'operaciones-ven.html', icon: 'far fa-circle nav-icon' }
        ]
      },
      {
        title: 'Salir',
        icon: 'fas fa-share',
        link: 'login.html',
      }
      // ... otros elementos del menú ...
    ],

    Operativo: [
      {
        title: 'Inicio',
        icon: 'fas fa-tachometer-alt',
        link: '#',
      },
      {
        //todas
        title: 'Operaciones',
        icon: 'fas fa-file-contract',
        link: '#',
        subItems: [
          { title: 'Listar Operaciones', link: 'operaciones-ven.html', icon: 'far fa-circle nav-icon' }
        ]
      },
      {
        //todos
        title: 'Shipper',
        icon: 'fas fa-ship',
        link: '#',
        subItems: [
          { title: 'Nuevo Shipper', link: 'nuevo-shipper.html', icon: 'far fa-circle nav-icon' },
          { title: 'Listar Shippers', link: 'listarshippers.html', icon: 'far fa-circle nav-icon' }
        ]
      },
      {
        //todos
        title: 'Agente',
        icon: 'fas fa-truck',
        link: '#',
        subItems: [
          { title: 'Nuevo Agente', link: 'nuevo-agente.html', icon: 'far fa-circle nav-icon' },
          { title: 'Listar Agente', link: 'listaragentes.html', icon: 'far fa-circle nav-icon' }
        ]
      },
      {
        title: 'Salir',
        icon: 'fas fa-share',
        link: 'login.html',
      }
    ],
    Vendedor: [
      {
        title: 'Inicio',
        icon: 'fas fa-tachometer-alt',
        link: '#',
      },
      {
        //listar solo sus cotizaciones de vendedor
        title: 'Cotizaciones',
        icon: 'fas fa-folder-open',
        link: '#',
        subItems: [
          { title: 'Nueva cotización', link: 'cotizacion.html', icon: 'far fa-circle nav-icon' },
          { title: 'Listar Cotizaciones', link: 'cotizaciones-ven.html', icon: 'far fa-circle nav-icon' }
        ]
      },
      {
        title: 'Clientes',
        icon: 'fas fa-people-arrows',
        link: '#',
        subItems: [
          { title: 'Nuevo Cliente', link: 'nuevo-usuario.html', icon: 'far fa-circle nav-icon' },
          { title: 'Listar Clientes', link: 'listarusuarios.html', icon: 'far fa-circle nav-icon' }
        ]
      },
      {
        //solo las de el
        title: 'Operaciones',
        icon: 'fas fa-file-contract',
        link: '#',
        subItems: [
          { title: 'Listar Operaciones', link: 'operaciones-ven.html', icon: 'far fa-circle nav-icon' }
        ]
      },
      {
        //solo las de el
        title: 'Liquidaciones',
        icon: 'fas fa-coins',
        link: '#',
        subItems: [
          // { title: 'Nueva liquidación', link: 'liquidaciones-ven.html', icon: 'far fa-circle nav-icon' },
          { title: 'Listar Liquidaciones', link: 'liquidaciones-ven.html', icon: 'far fa-circle nav-icon' }
        ]
      },
      {
        title: 'Salir',
        icon: 'fas fa-share',
        link: 'login.html',
      }
      // ... otros elementos del menú ...
    ],
    Contador: [
      {
        title: 'Inicio',
        icon: 'fas fa-tachometer-alt',
        link: '#',

      },
      {
        //todas
        title: 'Liquidaciones',
        icon: 'fas fa-coins',
        link: '#',
        subItems: [
          { title: 'Listar Liquidaciones', link: 'liquidaciones-ven.html', icon: 'far fa-circle nav-icon' },
        ]
      },
      {
        title: 'Salir',
        icon: 'fas fa-share',
        link: 'login.html',
      }
      // ... otros elementos del menú ...
    ],
  }
  console.log('OPCIONES DEL MENU', menuRoles[tipoRol.textContent]);
  console.log('ROL', tipoRol.textContent);
  const menu = createMenu(menuRoles[tipoRol.textContent]);
  menuContainer.appendChild(menu);
}

function createMenu(items) {
  const ul = document.createElement('ul');
  ul.className = 'nav nav-pills nav-sidebar flex-column';
  ul.setAttribute('data-widget', 'treeview');
  ul.setAttribute('role', 'menu');
  ul.setAttribute('data-accordion', 'false');

  items.forEach(item => {
    const li = document.createElement('li');
    li.className = 'nav-item';

    const a = document.createElement('a');
    a.href = item.link;
    a.className = 'nav-link';
    if (item.active) a.classList.add('active');

    const i = document.createElement('i');
    i.className = `nav-icon ${item.icon}`;

    const p = document.createElement('p');
    p.textContent = item.title;

    a.appendChild(i);
    a.appendChild(p);

    if (item.subItems && item.subItems.length > 0) {
      const angleIcon = document.createElement('i');
      angleIcon.className = 'fas fa-angle-left right';
      p.appendChild(angleIcon);

      const subUl = document.createElement('ul');
      subUl.className = 'nav nav-treeview';
      item.subItems.forEach(subItem => {
        const subLi = document.createElement('li');
        subLi.className = 'nav-item';

        const subA = document.createElement('a');
        subA.href = subItem.link;
        subA.className = 'nav-link';

        const subI = document.createElement('i');
        subI.className = `nav-icon ${subItem.icon}`;

        const subP = document.createElement('p');
        subP.textContent = subItem.title;

        subA.appendChild(subI);
        subA.appendChild(subP);
        subLi.appendChild(subA);
        subUl.appendChild(subLi);
      });

      li.appendChild(a);
      li.appendChild(subUl);
    } else {
      li.appendChild(a);
    }

    ul.appendChild(li);
  });

  return ul;
}


//ver si esta activo
// function highlightCurrentPage(menuItems) {
//   const currentPageUrl = window.location.href;
//   console.log(currentPageUrl)

//   // menuItems.forEach(item => {
//   //     // Verifica si la página actual está en los subelementos
//   //     const isCurrentPageInSubItems = item.subItems && item.subItems.some(subItem => currentPageUrl.includes(subItem.link));

//   //     // Si la página actual coincide con el enlace del elemento o está en los subelementos
//   //     if (currentPageUrl.includes(item.link) || isCurrentPageInSubItems) {
//   //         item.active = true; // Marcar como activo

//   //         // Si hay subelementos, también marca como activo al elemento padre
//   //         if (item.subItems) {
//   //             const parentItem = item.subItems.find(subItem => currentPageUrl.includes(subItem.link));
//   //             if (parentItem) {
//   //                 parentItem.active = true;
//   //             }
//   //         }
//   //     }
//   // });
// }

// highlightCurrentPage()

// // Llamada a la función para resaltar la página actual
// // highlightCurrentPage(menuRoles[tipoRol.textContent]);
