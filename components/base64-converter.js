

export async function Base64FileReader(selector){
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