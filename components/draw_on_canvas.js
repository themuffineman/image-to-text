import { Base64FileReader } from "./base64-converter";


export async function drawImageOnCanvas(input, canvas) {

    try {
        const img = new Image()
        const canvasElement = document.querySelector(canvas);
        const base64Data = await Base64FileReader(input)
        img.onload = function(){
            ctx.clearRect(0, 0, canvasElement.width, canvasElement.height);
            ctx.drawImage(img, 0, 0, canvasElement.width, canvasElement.height);
        }

        img.src = base64Data
        console.log(base64Data)
    }
    catch (error) {
        console.error('There was an error:' + error);
    }
}
