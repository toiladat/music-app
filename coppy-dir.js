
const fs=require('fs-extra');


fs.copy('views','dist/views')
// neu chua co folder views se tu tao ra 
  .then(()=> console.log('success: dist/views'))
  .catch((error)=> console.log(error))
  
fs.copy('public','dist/public')
.then(()=> console.log('success: dist/public'))
.catch((error)=> console.log(error))