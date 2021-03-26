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

let array: number[];
let currentIndex: number;
let sorted: boolean = false;

// setup RAF
let oldTime = Date.now();
let index: number = 0;
let run: boolean = false;

function setup() {
    renderer.autoDensity = true;
    renderer.backgroundColor = 0x333333;
    $('#stage').html(renderer.view);
    array = createArray(31);
    addBars(array, width/32, [index]);
    renderer.render(stage);
}


function createArray(length: number) {
    let arr = [];
    while(arr.length < length){
        let r = Math.floor(Math.random() * 450) + 10;
        if(arr.indexOf(r) === -1) arr.push(r);
    }
    return arr;
}

function addBars(array: number[], step: number, focus: number[] , toChange: boolean = false) {
    for (let i = 0; i < array.length; i++) {
        if (focus.includes(i)) {
            stage.addChild(drawBar((i*step + i) + step /2, array[i], toChange ? 0xFF7879 : 0xFF0000));
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

$(function() {
    setup();
    $(".nav-link").on("click", function () {
        $(".nav-masthead").children(".active").removeClass("active");
        $(this).addClass("active");
    });
});

function startSort() {
    $("#start, #reset").prop({disabled: true});
    bubbleSort(array).then(function () {
        $("#start, #reset").prop({disabled: false});
    });
}

function reset() {
    clearStage();
    setup();
}

async function bubbleSort(array: number[]) {
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            let a: number[] = [];
            a.push(j);
            a.push(j+1);
            await delay(115);
            clearStage();
            addBars(array, width/32, a, true);
            renderer.render(stage);
            if (array[j] > array[j+1]) {
                a = [];
                let tmp = array[j];
                array[j] = array[j+1];
                array[j+1] = tmp;
                a.push(j);
                a.push(j+1);
                await delay(115);
                clearStage();
                addBars(array, width/32, a);
                renderer.render(stage);
                await delay(115);
            }
        }
    }
}

function clearStage() {
    for (let k = stage.children.length - 1; k >= 0; k--) {	stage.removeChild(stage.children[k]); }
}

function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}
