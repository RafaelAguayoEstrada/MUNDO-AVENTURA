const world = {

    width:2000,

    height:2000,

    current:"castle"

};

// =====================================
// OBSTACULOS
// =====================================

const obstacles = [

    // =================================
    // MURO ARRIBA
    // =================================

    {x:0,y:0,width:850,height:50},

    {x:1150,y:0,width:850,height:50},

    // =================================
    // MURO ABAJO
    // =================================

    {x:0,y:1950,width:850,height:50},

    {x:1150,y:1950,width:850,height:50},

    // =================================
    // MURO IZQUIERDA
    // =================================

    {x:0,y:0,width:50,height:850},

    {x:0,y:1150,width:50,height:850},

    // =================================
    // MURO DERECHA
    // =================================

    {x:1950,y:0,width:50,height:850},

    {x:1950,y:1150,width:50,height:850},

    // =================================
    // ARBOLES
    // =================================

    {x:300,y:300,width:80,height:80},

    {x:1600,y:300,width:80,height:80},

    {x:300,y:1600,width:80,height:80},

    {x:1600,y:1600,width:80,height:80},

    // =================================
    // ROCAS
    // =================================

    {x:700,y:500,width:70,height:70},

    {x:1200,y:600,width:70,height:70},

    // =================================
    // BARRILES
    // =================================

    {x:800,y:1300,width:60,height:60},

    {x:1200,y:1400,width:60,height:60}

];

// =====================================
// PUERTAS
// =====================================

const doors = [

    // ARRIBA

    {
        x:850,
        y:0,

        width:300,
        height:50,

        locked:false,

        world:"ice"
    },

    // DERECHA

    {
        x:1950,
        y:850,

        width:50,
        height:300,

        locked:false,

        world:"forest"
    },

    // ABAJO

    {
        x:850,
        y:1950,

        width:300,
        height:50,

        locked:false,

        world:"castle"
    },

    // IZQUIERDA

    {
        x:0,
        y:850,

        width:50,
        height:300,

        locked:false,

        world:"dungeon"
    }

];