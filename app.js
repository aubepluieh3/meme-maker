const font = document.getElementById("font");
const saveBtn = document.getElementById("save");
const textInput = document.getElementById("text");
const fileInput = document.getElementById("file");
const modeBtn = document.getElementById("mode-btn");
const fillBtn = document.getElementById("fill-btn");
const destroyBtn = document.getElementById("destroy-btn");
const eraserBtn = document.getElementById("eraser-btn");
const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.getElementById("color");
const lineWidth = document.getElementById("line-width");
const fontSize = document.getElementById("font-size");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const cty = canvas.getContext("2d");

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width=CANVAS_WIDTH;
canvas.height=CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap="round";
let isPainting = false;
let isShaping = false;
let isFilling = false;

function onMove(event){
   if(isPainting){
    ctx.lineTo(event.offsetX, event.offsetY);
    if(isShaping){
        ctx.fill();
        return;
    }
        ctx.stroke();
        return;
    
   }
   ctx.moveTo(event.offsetX, event.offsetY); // 연필을 마우스 있는 쪽으로 움직
}
function startPainting(){
    isPainting = true;
}
function cancelPainting(){
    isPainting = false;
    ctx.beginPath();
}

function onLineWidthChange(event){
    ctx.lineWidth = event.target.value;
}

function onFontSizeChange(event){
    ctx.fontSize = event.target.value;
}

function onColorChange(event){
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;

}

function onColorClick(event){
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value=colorValue;
}

function onModeClick(){
    isFilling=false;
    if(isShaping){
        isShaping = false;
        modeBtn.innerText = "⬜ Shape";
    }else {
        isShaping = true;
        ctx.strokeStyle=color.value;
        ctx.fillStyle=color.value;
        modeBtn.innerText = "🖌 Draw";
    }
}

function onCanvasClick(){
    if(isFilling){
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
}

function onDestroyClick(){
    ctx.fillStyle="white";
    ctx.fillRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT);
    isShaping=false;
    modeBtn.innerText="⬜ Shape";
}

function onEraserClick(){
    ctx.strokeStyle="white";
    isFilling = false;
    isShaping=false;
    modeBtn.innerText="⬜ Shape";
}

function onFillClick(){
    if(!isFilling){
        isFilling = true;
    }
}

function onFileChange(event){
    const file = event.target.files[0]; //JS 이용해서 파일 가져오기
    const url = URL.createObjectURL(file); //파일을 가리키는 URL 얻기
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
        fileInput.value=null;
    };
}

function onDoubleClick(event){
    const text = textInput.value;
    if(text !== ""){
        ctx.save();
        ctx.lineWidth=1;
        ctx.font= `${fontSize.value}px ${font.value}`;
        ctx.fillStyle=color.value;
        ctx.fillText(text,event.offsetX,event.offsetY);
        ctx.restore();
    }
    else{
        isPainting = true;
    }
}

function onSaveClick(){
    const url = canvas.toDataURL(); //canvas에 그린 그림을 url로 변환
    const a = document.createElement("a");
    a.href=url;
    a.download = "myDrawing.png";
    a.click();

}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);


lineWidth.addEventListener("change", onLineWidthChange);
fontSize.addEventListener("change", onFontSizeChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));

fillBtn.addEventListener("click", onFillClick);
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);