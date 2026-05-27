const coins = [];

for(let i = 0; i < 25; i++){

    coins.push({

        x:
        Math.random() * 1800 + 100,

        y:
        Math.random() * 1800 + 100,

        collected:false

    });

}

const keyItem = {

    x:1000,

    y:250,

    collected:false

};

let totalCoins = 0;

let totalKeys = 0;