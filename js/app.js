// ==========================
// AUDIO
// ==========================

const musicaMenu =
document.getElementById("musicaMenu");

const volumen =
document.getElementById("volumen");

const toggleSonido =
document.getElementById("toggleSonido");

// ==========================
// PANTALLAS
// ==========================

const intro =
document.getElementById("intro");

const login =
document.getElementById("login");

const registro =
document.getElementById("registro");

const menu =
document.getElementById("menu");

const opciones =
document.getElementById("opciones");

// ==========================
// LOGIN
// ==========================

const btnEntrar =
document.getElementById("btnEntrar");

const irRegistro =
document.getElementById("irRegistro");

const loginUser =
document.getElementById("loginUser");

const loginPass =
document.getElementById("loginPass");

// ==========================
// REGISTRO
// ==========================

const btnRegistrar =
document.getElementById("btnRegistrar");

const volverLogin =
document.getElementById("volverLogin");

const registroUser =
document.getElementById("registroUser");

const registroPass =
document.getElementById("registroPass");

// ==========================
// MENU
// ==========================

const bienvenida =
document.getElementById("bienvenida");

const nuevoJuego =
document.getElementById("nuevoJuego");

const salir =
document.getElementById("salir");

// ==========================
// OPCIONES
// ==========================

const abrirOpciones =
document.getElementById("abrirOpciones");

const volverMenu =
document.getElementById("volverMenu");

// ==========================
// PERFIL
// ==========================

const nombrePerfil =
document.getElementById("nombrePerfil");

const avatarActual =
document.getElementById("avatarActual");

const puntosJugador =
document.getElementById("puntosJugador");

// ==========================
// ALERTA
// ==========================

const alertaRPG =
document.getElementById("alertaRPG");

const tituloAlerta =
document.getElementById("tituloAlerta");

const textoAlerta =
document.getElementById("textoAlerta");

// ==========================
// VARIABLES
// ==========================

let currentUser = null;

let puntos = 0;

let avatarsComprados = [];

// ==========================
// ALERTAS
// ==========================

function mostrarAlerta(
    titulo,
    texto,
    icono = "bi bi-fire"
){

    document.querySelector(
        ".icono-alerta i"
    ).className = icono;

    tituloAlerta.innerHTML =
    titulo;

    textoAlerta.innerHTML =
    texto;

    alertaRPG.classList.remove(
        "d-none"
    );

    setTimeout(()=>{

        alertaRPG.classList.add(
            "d-none"
        );

    },2500);

}

// ==========================
// SAVE
// ==========================

function saveUserData(){

    if(!currentUser) return;

    localStorage.setItem(

        currentUser + "_coins",

        puntos

    );

    localStorage.setItem(

        currentUser + "_avatars",

        JSON.stringify(
            avatarsComprados
        )

    );

}

// ==========================
// LOAD
// ==========================

function loadUserData(){

    if(!currentUser) return;

    // PUNTOS DEL JUEGO

    const puntosJuego = parseInt(

        localStorage.getItem(
            "playerCoins"
        )

    ) || 0;

    // PUNTOS USUARIO

    const puntosUsuario = parseInt(

        localStorage.getItem(
            currentUser + "_coins"
        )

    ) || 0;

    // USAR MAYOR

    puntos = Math.max(
        puntosJuego,
        puntosUsuario
    );

    // GUARDAR BIEN

    localStorage.setItem(

        currentUser + "_coins",

        puntos

    );

    avatarsComprados =

    JSON.parse(

        localStorage.getItem(
            currentUser + "_avatars"
        )

    ) || [];

    puntosJugador.innerHTML =
    "Puntos: " + puntos;

}

// ==========================
// MENU
// ==========================

function openMenu(){

    intro.classList.add("d-none");

    login.classList.add("d-none");

    registro.classList.add("d-none");

    opciones.classList.add("d-none");

    menu.classList.remove("d-none");

    loadUserData();

    bienvenida.innerHTML =
    "Bienvenido " + currentUser;

    updateAvatarButtons();

}

// ==========================
// INTRO
// ==========================

setTimeout(()=>{

    currentUser =

    localStorage.getItem(
        "currentUser"
    );

    if(

        window.location.hash === "#menu" &&
        currentUser

    ){

        openMenu();

        return;

    }

    intro.classList.add("d-none");

    login.classList.remove("d-none");

},3000);

// ==========================
// LOGIN
// ==========================

btnEntrar.addEventListener("click",()=>{

    const pass =

    localStorage.getItem(

        "user_" + loginUser.value

    );

    if(pass === loginPass.value){

        currentUser =
        loginUser.value;

        localStorage.setItem(
            "currentUser",
            currentUser
        );

        musicaMenu.play();

        openMenu();

    }else{

        mostrarAlerta(
            "ERROR",
            "Contraseña incorrecta",
            "bi bi-exclamation-triangle-fill"
        );

    }

});

// ==========================
// REGISTRO
// ==========================

irRegistro.addEventListener("click",()=>{

    login.classList.add("d-none");

    registro.classList.remove("d-none");

});

volverLogin.addEventListener("click",()=>{

    registro.classList.add("d-none");

    login.classList.remove("d-none");

});

// ==========================
// CREAR CUENTA
// ==========================

btnRegistrar.addEventListener("click",()=>{

    localStorage.setItem(

        "user_" + registroUser.value,

        registroPass.value

    );

    mostrarAlerta(
        "Cuenta creada",
        "Ya puedes iniciar sesión"
    );

});

// ==========================
// NUEVO JUEGO
// ==========================

nuevoJuego.addEventListener("click",()=>{

    window.location.href =
    "game/game.html";

});

// ==========================
// OPCIONES
// ==========================

abrirOpciones.addEventListener("click",()=>{

    menu.classList.add("d-none");

    opciones.classList.remove("d-none");

    nombrePerfil.innerHTML =
    currentUser;

    loadUserData();

});

// ==========================
// VOLVER MENU
// ==========================

volverMenu.addEventListener("click",()=>{

    opciones.classList.add("d-none");

    menu.classList.remove("d-none");

});

// ==========================
// SALIR
// ==========================

salir.addEventListener("click",()=>{

    musicaMenu.pause();

    localStorage.removeItem(
        "currentUser"
    );

    window.location.hash = "";

    menu.classList.add("d-none");

    opciones.classList.add("d-none");

    login.classList.remove("d-none");

});

// ==========================
// AUDIO
// ==========================

volumen.addEventListener("input",()=>{

    musicaMenu.volume =
    volumen.value / 100;

});

toggleSonido.addEventListener("click",()=>{

    musicaMenu.muted =
    !musicaMenu.muted;

    if(musicaMenu.muted){

        toggleSonido.innerHTML =
        '<i class="bi bi-volume-mute-fill"></i>';

    }else{

        toggleSonido.innerHTML =
        '<i class="bi bi-volume-up-fill"></i>';

        musicaMenu.play();

    }

});

// ==========================
// AVATARES
// ==========================

const botonesAvatar =

document.querySelectorAll(
    ".comprar-avatar"
);

function updateAvatarButtons(){

    botonesAvatar.forEach(btn=>{

        const avatar =
        btn.dataset.avatar;

        if(

            avatarsComprados.includes(
                avatar
            )

        ){

            btn.innerHTML =
            "Equipar";

            btn.style.background =
            "#00c853";

        }

    });

}

botonesAvatar.forEach(btn=>{

    btn.addEventListener("click",()=>{

        const precio =
        parseInt(btn.dataset.precio);

        const avatar =
        btn.dataset.avatar;

        // EQUIPAR

        if(

            avatarsComprados.includes(
                avatar
            )

        ){

            avatarActual.src =
            avatar;

            localStorage.setItem(

                currentUser + "_avatar",

                avatar

            );

            mostrarAlerta(
                "Avatar equipado",
                btn.dataset.nombre
            );

            return;

        }

        // SIN PUNTOS

        if(puntos < precio){

            mostrarAlerta(
                "Sin monedas",
                "Necesitas más puntos",
                "bi bi-exclamation-triangle-fill"
            );

            return;

        }

        // COMPRAR

        puntos -= precio;

        avatarsComprados.push(
            avatar
        );

        saveUserData();

        puntosJugador.innerHTML =
        "Puntos: " + puntos;

        updateAvatarButtons();

        mostrarAlerta(
            "Comprado",
            btn.dataset.nombre
        );

    });

});

// ==========================
// LOAD
// ==========================

window.addEventListener("load",()=>{

    currentUser =

    localStorage.getItem(
        "currentUser"
    );

    if(currentUser){

        loadUserData();

        updateAvatarButtons();

    }

});