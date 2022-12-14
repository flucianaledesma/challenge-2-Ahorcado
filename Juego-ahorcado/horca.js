//Selectores
let pantalla = document.querySelector("canvas");
let botonNuevoJuego = document.getElementById("btn-nuevo-juego").style.display = "none";
let btnSalirDesaparecer = document.getElementById("btn-salir").style.display = "none";
let divAgregarPalabra = document.getElementById("agregar-palabra").style.display = "none";
let btnNuevoJuego = document.getElementById("btn-nuevo-juego");
let btnSalir = document.getElementById("btn-salir");
let btnCancelar = document.getElementById ("btn-cancelar");


var palabras = ["AVION" , "CASA" , "TIGRE" , "PAJARO" , "ESPEJO" , "MESA" , "ARBOL" , "PANTALLA" , "CAJA" , "ESTERNOCLEIDOMASTOIDEO" , "CARTERA" , "AGUA" , "SILLA" , "TIJERA" ];
var tablero =document.getElementById("horca").getContext("2d");
var palabraSecreta = "";
var letras = [];
var palabraCorrecta = "";
var errores = 8;
let letrasIncorrectas = [];
let numeroErrores = 8;
let letraElegida = [];


//eventos


document.getElementById("iniciar-juego").onclick = () => {
    iniciarJuego();
  }
  

  document.getElementById("btn-guardar").onclick = () => {
    guardarPalabra();
   
  }
  

  btnNuevoJuego.addEventListener("click", function () {
    location.reload();
  });
  

  btnSalir.addEventListener("click", function () {
    location.reload();
  });
  

  btnCancelar.addEventListener("click", function () {
    location.reload();
  });
  
  

  function escojerPalabraSecreta() {
    let palabra = palabras[Math.floor(Math.random() * palabras.length)]
    palabraSecreta = palabra
    return palabra
  }
  
  
  
  // verifica cual es la letra en que el usuario hizo clic
  function verificarLetraClicada(key) {
    if (letras.length < 1 || letras.indexOf(key) < 0) {
      letras.push(key)
      return false
      
    }
    else {
      letras.push(key)
      return true
    }
  }
  
  function adicionarLetraCorrecta(i) {
    palabraCorrecta += palabraSecreta[i].toUpperCase()
  }
  
  function adicionarLetraIncorrecta(letter) {
    if (palabraSecreta.indexOf(letter) <= 0) {
      errores -= 1
    }
  }
  
  
  function verificarFinJuego(letra) {

   if(letraElegida.length < palabraSecreta.length) { 

      letrasIncorrectas.push(letra);
      
  

      if (letrasIncorrectas.length > numeroErrores) {
        perdiste()
      }
      else if(letraElegida.length < palabraSecreta.length) {
        adicionarLetraIncorrecta(letra)
        escribirLetraIncorrecta(letra, errores)
      }
    }
   } 
  

  function verificarVencedor(letra) {
    letraElegida.push(letra.toUpperCase());
    if (letraElegida.length == palabraSecreta.length) {
  
      ganaste()
      
    }
  
  }
  
  
  
  //impide que teclas como shift y otras, sean consideradas errores y sean escritas
  function verificarLetra(keyCode) {
    if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90) {
      return true;
    } else {
      return false;
    }
  }
  
  
  //haz con que los botones de la pantalla de home desaparezcan y los de la de agregar palabra aparezcan
  function ensenarPantallaDeAgregarPalabra() {
    document.getElementById("div-desaparece").style.display = 'none';
    document.getElementById("agregar-palabra").style.display = "block";
  
  }
  
  // guarda la palabra que el usuario quiere agregar
  function guardarPalabra() {
    
    //captura lo que el usuario ha digitado
    let nuevaPalabra = document.getElementById('input-nueva-palavra').value;
  
    // incluye la palabra que el usuario digit?? en el array de las palabras a seren sorteadas
    if(nuevaPalabra !== ""){
      palabras.push(nuevaPalabra.toUpperCase());
      alert('La palabra fue guardada')
      
    
      // haz con que los componentes de la pantalla de agregar palabra desaparezcan
      document.getElementById("agregar-palabra").style.display = "none";
      iniciarJuego();
    }
    else{
      alert("Ninguna palabra ha sido digitada")
    }
  
  }
  
  //inicia el juego
  function iniciarJuego() {
  
    // hace con que los de iniciar juego e agregar palabra desaparezcan
    document.getElementById("div-desaparece").style.display = 'none';
  
    //llama la funci??n que dibuja el tablero del ahorcado
    dibujarTablero();
  
    //llama la funci??n que sortea la palabra  
    escojerPalabraSecreta();
  
    //llama la funci??n que dibuja las l??neas donde el usuario escribir??
    dibujarLineas();
  
    // hace con que los botones de nuevo juego e salir aparezcan
    document.getElementById("btn-nuevo-juego").style.display = "block"
    document.getElementById("btn-salir").style.display = "block"
  
    // captura la letra que el usuario escribi??
    document.onkeydown = (e) => {
      // pone la letra en letra mayuscula
      let letra = e.key.toUpperCase()
      //verifica si el usuario todavia no ha perdido
      if (letrasIncorrectas.length <= numeroErrores) {
        if (!verificarLetraClicada(e.key) && verificarLetra(e.keyCode)) {
          if (palabraSecreta.includes(letra)) {
            adicionarLetraCorrecta(palabraSecreta.indexOf(letra))
            for (let i = 0; i < palabraSecreta.length; i++) {
              if (palabraSecreta[i] === letra) {
                escribirLetraCorrecta(i)
                verificarVencedor(letra)
  
              }
            }
  
          }

          else {
            if (!verificarLetraClicada(e.key) && !verificarVencedor(letra)) return
            dibujarAhorcado(errores)
            verificarFinJuego(letra);
        }
        }
      }
      else {
        alert('has superado el l??mite de letras incorrectas')
      }
  
    };
  }
  
  