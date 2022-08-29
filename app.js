const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
canvas.width=800;
canvas.height=800;
ctx.lineWidth = 2;
let isPainting = false;

function onMove(event){
   if(isPainting){
    ctx.lineTo(event.offsetX, event.offsetY);
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
}

canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);

