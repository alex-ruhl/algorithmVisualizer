// Application
let width = 640, height = 480;
let app = new PIXI.Application({
    width: width + width/32/2,
    height: height,
    antialias: true,
    transparent: false,
    resolution: 1
});

let renderer = new PIXI.Renderer({
    width: width + width/32/2,
    height: height,
    antialias: true,
    transparent: false,
    resolution: 1
});
let stage = new PIXI.Container();

let array;

// setup RAF
let oldTime = Date.now();
let index: number = 0;
let switches: boolean = false;
let run = false;

function setup() {
    renderer.autoDensity = true;
    renderer.backgroundColor = 0x333333;
    $('#stage').html(renderer.view);
    array = createArray(32, height/32);
    array = shuffle(array);
    addBars(array, width/32, index);
    renderer.render(stage);
}


function createArray(length: number, step: number) {
    let array: number[] = [];
    let value: number = step;
    for (let i = 0; i < length; i++) {
        array.push(value);
        value += step;
    }
    return array;
}

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function addBars(array: number[], step: number, focus: number) {
    for (let i = 0; i < array.length; i++) {
        if (i == focus) {
            stage.addChild(drawBar((i*step + i) + step /2, array[i], 0xFF0000));
        } else {
            stage.addChild(drawBar((i*step + i) + step /2, array[i]));
        }
    }
}

function drawBar(offset: number, length: number, color: number = 0xFFFFFF) {
    let bar = new PIXI.Graphics();
    bar.lineStyle(20, color, 1);
    bar.moveTo(0, renderer.height);
    bar.lineTo(0, renderer.height - length);
    bar.x = offset;
    return bar;
}

function animate() {
    let newTime = Date.now();
    let deltaTime = newTime - oldTime;
    if (deltaTime > 90) {
        oldTime = newTime;
        if (run) {
            renderer.clear();
            addBars(array, width/32, index < 30 ? ++index : index = 0);
            renderer.render(stage);
        }
    }
    requestAnimationFrame(animate);
}

$(function() {
    setup();
});

function startSort() {
    $("#startStop").html(!run ? "Stop" : "Start");
    run = !run;
    requestAnimationFrame(animate);
}

