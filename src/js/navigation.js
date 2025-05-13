

var input=  document.getElementById('fusu_dni');

// const numero=document.querySelector('#fusu_dni')
const btnRegistrar=document.querySelector('#btnRegistrarUsuarioSesion')


input.addEventListener('input',function(){
  if (this.value.length == 8) {
    btnP.removeAttribute('class', 'disabled');
    input.removeAttribute('class', 'error');
    btnP.disabled=false
    console.log(this.value.length)
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && this.value.length == 8) {
        event.preventDefault();
        btnP.click();
      }
    });

  }else if(this.value.length > 8 ||this.value.length < 8 ){
    // input.setAttribute('class', 'error');
    alert("Hola")
  }
  else{
    btnP.disabled=true
    btnP.setAttribute('class', 'disabled');
  }
})

