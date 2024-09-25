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

//end upload image

//upload audio

//upload audio
const uploadAudio= document.querySelector('[upload-audio]')

if(uploadAudio){
  const uploadAudioInput=uploadAudio.querySelector('[upload-audio-input]')
  const uploadAudioPlay=uploadAudio.querySelector('[upload-audio-play]')
  const source=uploadAudioPlay.querySelector('source');
  uploadAudioInput.addEventListener('change',()=>{
    const file= uploadAudioInput.files[0];
    console.log(file);
    if(file){
      source.src=URL.createObjectURL(file);
      uploadAudioPlay.load();
    }
  })
}
// end upload audio

//end upload audio