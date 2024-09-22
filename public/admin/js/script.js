//upload image
const uploadImage=document.querySelector('[upload-image]')
if(uploadImage){
  const uploadImageInput=uploadImage.querySelector('[upload-image-input]')
  const uploadImagePreview=uploadImage.querySelector('[upload-image-preview]')

  uploadImageInput.addEventListener('change',()=>{
    const file=uploadImageInput.files[0];
    const linkFile=URL.createObjectURL(file)
    if(linkFile){
      uploadImagePreview.src=linkFile
    }
  })
}