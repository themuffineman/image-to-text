const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.strokeStyle = 'red';
const img = new Image()
const textFound = document.querySelector('.text-found')
const loader = document.querySelector('.loading')




async function Base64FileReader(selector){
    
    //This function returns a Base64 encoding of a file. Give the target file input query selector as a parameter

    return new Promise((resolve,reject)=>{

        const fileInput = document.querySelector(selector)
        const image = fileInput.files[0]

        fileReader = new FileReader()

        fileReader.onload = function(e){
            if(!e.target.result){
                reject('Failed to convert file')
            }
            else{
            const base64Url = e.target.result
            // console.log(base64Url)
            resolve(base64Url)
            }
        }

         fileReader.readAsDataURL(image)

    })
    
    
    
    
}


async function drawImageOnCanvas(input) {

    try {

        const img = new Image()
        const base64Url = await Base64FileReader(input)

        img.onload = function() {
            // Now the image is loaded, and you can access its dimensions

            // console.log(img.width);
            // console.log(img.height);

            // Set the canvas size and background properties

            canvas.style.width = img.width + 'px';
            canvas.style.height = img.height + 'px';

            // canvas.style.backgroundImage = `url(${img.src})`;
            // canvas.style.backgroundSize = 'cover';
            // canvas.style.backgroundPosition = 'center';


            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
        };

        img.src = base64Url;

    }
    catch (error) {
        console.error('There was an error:' + error);
    }
}



async function imageToText(){

    loader.style.display = 'block'
    const fileInput = document.querySelector('input')

    const imageFile = fileInput.files[0]

    const formData = new FormData();

    formData.append('image', imageFile);

    try{
        result = await fetch('https://api.api-ninjas.com/v1/imagetotext',{ method: 'POST', headers: {'X-Api-Key': 'im6UqOHTsLg5q/kQc5vy1Q==8KE0dN3KlXLZLUFc'}, body: formData})
        const jsonResult = await result.json()
        loader.style.display = 'none'

        // console.log(jsonResult)
        
        
        jsonResult.forEach(element => {
            ctx.strokeRect(element.bounding_box.x1, element.bounding_box.y1, element.bounding_box.x2 - element.bounding_box.x1, element.bounding_box.y2 - element.bounding_box.y1)
            textFound.innerHTML += `<p>${element.text}</p>`;
            
        });


    }
    catch(error){
        console.error(`Happy debuging✌: ${error}`)
    }
}










