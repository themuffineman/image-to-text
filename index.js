const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const img = new Image()

// console.log(fileInput.files[0])


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
            console.log(base64Url)
            resolve(base64Url)
            }
        }

        fileReader.readAsDataURL(image)

    })
    
    
    
    
}


async function drawImageOnCanvas(input) {

    try {

        const base64Data = await Base64FileReader(input)
        img.onload = function(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }

        img.src = base64Data
        console.log(base64Data)
    }
    catch (error) {
        console.error('There was an error:' + error);
    }
}








