// ==========================
// AUDIO
// ==========================

const musicaMenu =
document.getElementById("musicaMenu");

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

volverLogin.innerHTML =
"Ir al Login";

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
// LORE
// ==========================

const loreNombre =
document.getElementById("loreNombre");

const loreHistoria =
document.getElementById("loreHistoria");

const loreClase =
document.getElementById("loreClase");

const lorePoder =
document.getElementById("lorePoder");

// ==========================
// ALERTAS
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
// ALERTA RPG
// ==========================

function mostrarAlerta(
    titulo,
    texto,
    icono
){

    document.querySelector(
        ".icono-alerta i"
    ).className = icono;

    tituloAlerta.innerHTML = titulo;

    textoAlerta.innerHTML = texto;

    alertaRPG.classList.remove("d-none");

    setTimeout(()=>{

        alertaRPG.classList.add("d-none");

    },2500);

}

// ==========================
// GUARDAR DATOS
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
// CARGAR DATOS
// ==========================

function loadUserData(){

    if(!currentUser) return;

    puntos = parseInt(

        localStorage.getItem(
            currentUser + "_coins"
        )

    ) || 0;

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
// INTRO
// ==========================

setTimeout(()=>{

    currentUser =

    localStorage.getItem(
        "currentUser"
    );

    // ==========================
    // SOLO MENU SI VIENE DEL JUEGO
    // ==========================

    if(

        window.location.hash === "#menu" &&
        currentUser

    ){

        intro.classList.add("d-none");

        login.classList.add("d-none");

        registro.classList.add("d-none");

        menu.classList.remove("d-none");

        loadUserData();

        bienvenida.innerHTML =
        "Bienvenido " + currentUser;

        // avatar

        const avatarGuardado =

        localStorage.getItem(

            currentUser + "_avatar"

        );

        if(avatarGuardado){

            avatarActual.src =
            avatarGuardado;

        }

        updateAvatarButtons();

        return;

    }

    // ==========================
    // LOGIN NORMAL
    // ==========================

    intro.classList.add("d-none");

    login.classList.remove("d-none");

},3000);

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

    if(

        registroUser.value === "" ||
        registroPass.value === ""

    ){

        mostrarAlerta(

            "ERROR",

            "Completa todos los campos",

            "bi bi-exclamation-triangle-fill"

        );

        return;

    }

    localStorage.setItem(

        "user_" + registroUser.value,

        registroPass.value

    );

    mostrarAlerta(

        "REGISTRO EXITOSO",

        "Cuenta creada correctamente",

        "bi bi-fire"

    );

});

// ==========================
// LOGIN
// ==========================

btnEntrar.addEventListener("click",()=>{

    const pass =

    localStorage.getItem(

        "user_" + loginUser.value

    );

    if(

        pass === loginPass.value

    ){

        currentUser =
        loginUser.value;

        localStorage.setItem(
            "currentUser",
            currentUser
        );

        loadUserData();

        musicaMenu.play();

        login.classList.add("d-none");

        menu.classList.remove("d-none");

        bienvenida.innerHTML =
        "Bienvenido " + currentUser;

        updateAvatarButtons();

    }else{

        mostrarAlerta(

            "ERROR",

            "Usuario o contraseña incorrectos",

            "bi bi-exclamation-triangle-fill"

        );

    }

});

// ==========================
// NUEVO JUEGO
// ==========================

nuevoJuego.addEventListener(
    "click",
    ()=>{

        window.location.href =
        "game/game.html";

    }
);

// ==========================
// OPCIONES
// ==========================

abrirOpciones.addEventListener("click",()=>{

    menu.classList.add("d-none");

    opciones.classList.remove("d-none");

    nombrePerfil.innerHTML =
    currentUser;

    puntosJugador.innerHTML =
    "Puntos: " + puntos;

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

    menu.classList.add("d-none");

    opciones.classList.add("d-none");

    registro.classList.add("d-none");

    login.classList.remove("d-none");

});

// ==========================
// EQUIPAR AVATAR
// ==========================

function equiparAvatar(
    avatar,
    boton
){

    avatarActual.src = avatar;

    localStorage.setItem(

        currentUser + "_avatar",

        avatar

    );

    loreNombre.innerHTML =
    boton.dataset.nombre;

    loreHistoria.innerHTML =
    boton.dataset.historia;

    loreClase.innerHTML =
    boton.dataset.clase;

    lorePoder.innerHTML =
    boton.dataset.poder;

}

// ==========================
// BOTONES AVATAR
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

            btn.classList.remove(
                "btn-danger"
            );

            btn.classList.add(
                "btn-success"
            );

        }else{

            btn.innerHTML =
            "Comprar";

            btn.classList.remove(
                "btn-success"
            );

            btn.classList.add(
                "btn-danger"
            );

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

            equiparAvatar(
                avatar,
                btn
            );

            mostrarAlerta(

                "AVATAR EQUIPADO",

                "Nuevo personaje activo",

                "bi bi-stars"

            );

            return;

        }

        // SIN PUNTOS

        if(puntos < precio){

            mostrarAlerta(

                "SIN PUNTOS",

                "Necesitas más monedas",

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

        equiparAvatar(
            avatar,
            btn
        );

        mostrarAlerta(

            "COMPRA EXITOSA",

            "Avatar desbloqueado",

            "bi bi-gem"

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

        const avatarGuardado =

        localStorage.getItem(

            currentUser + "_avatar"

        );

        if(avatarGuardado){

            avatarActual.src =
            avatarGuardado;

        }

        updateAvatarButtons();

    }

});