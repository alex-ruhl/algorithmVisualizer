var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Application
let width = 640, height = 480;
let app = new PIXI.Application({
    width: width + width / 32 / 2,
    height: height,
    antialias: true,
    transparent: false,
    resolution: 1
});
let renderer = new PIXI.Renderer({
    width: width + width / 32 / 2,
    height: height,
    antialias: true,
    transparent: false,
    resolution: 1
});
let stage = new PIXI.Container();
let array;
let currentIndex;
let sorted = false;
// setup RAF
let oldTime = Date.now();
let index = 0;
let run = false;
function setup() {
    renderer.autoDensity = true;
    renderer.backgroundColor = 0x333333;
    $('#stage').html(renderer.view);
    array = createArray(31);
    addBars(array, width / 32, [index]);
    renderer.render(stage);
}
function createArray(length) {
    let arr = [];
    while (arr.length < length) {
        let r = Math.floor(Math.random() * 450) + 10;
        if (arr.indexOf(r) === -1)
            arr.push(r);
    }
    return arr;
}
function addBars(array, step, focus, toChange = false) {
    for (let i = 0; i < array.length; i++) {
        if (focus.includes(i)) {
            stage.addChild(drawBar((i * step + i) + step / 2, array[i], toChange ? 0xFF7879 : 0xFF0000));
        }
        else {
            stage.addChild(drawBar((i * step + i) + step / 2, array[i]));
        }
    }
}
function drawBar(offset, length, color = 0xFFFFFF) {
    let bar = new PIXI.Graphics();
    bar.lineStyle(20, color, 1);
    bar.moveTo(0, renderer.height);
    bar.lineTo(0, renderer.height - length);
    bar.x = offset;
    return bar;
}
$(function () {
    setup();
    $(".nav-link").on("click", function () {
        $(".nav-masthead").children(".active").removeClass("active");
        $(this).addClass("active");
    });
});
function startSort() {
    $("#start, #reset").prop({ disabled: true });
    bubbleSort(array).then(function () {
        $("#start, #reset").prop({ disabled: false });
    });
}
function reset() {
    clearStage();
    setup();
}
function bubbleSort(array) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < array.length - 1; i++) {
            for (let j = 0; j < array.length - i - 1; j++) {
                let a = [];
                a.push(j);
                a.push(j + 1);
                yield delay(115);
                clearStage();
                addBars(array, width / 32, a, true);
                renderer.render(stage);
                if (array[j] > array[j + 1]) {
                    a = [];
                    let tmp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = tmp;
                    a.push(j);
                    a.push(j + 1);
                    yield delay(115);
                    clearStage();
                    addBars(array, width / 32, a);
                    renderer.render(stage);
                    yield delay(115);
                }
            }
        }
    });
}
function clearStage() {
    for (let k = stage.children.length - 1; k >= 0; k--) {
        stage.removeChild(stage.children[k]);
    }
}
function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}
//# sourceMappingURL=mainFunctions.js.map