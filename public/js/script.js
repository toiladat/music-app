//APlayer
const aplayer=document.getElementById('aplayer')
if(aplayer){
  let dataSinger=aplayer.getAttribute('data-singer')
  dataSinger=JSON.parse(dataSinger)

  let dataSong=aplayer.getAttribute('data-song')
  dataSong=JSON.parse(dataSong)

  const ap = new APlayer({
    container:aplayer,
    audio: [{
        name: dataSong.title,
        artist: dataSinger.fullName,
        url: dataSong.audio,
        cover: dataSong.avatar
    }],
    autoplay:true
  });
  const avatar=document.querySelector('.inner-avatar')
  ap.on('pause',()=>{
    avatar.style.animationPlayState='paused'
  })
  ap.on('play',()=>{
    avatar.style.animationPlayState='running'
  })
}
//End APlayer


//Like|unLike
// Mô tả làm lại phần like
// làm login/register user( be se co thong tin user)
// auth ( thì mới hiện like và fauvorite)
// hiển thị fauvorite song list, liked song list
// model user là likedSongList:[] và fauvoriteSongList:[]
// khi like hoặc add fouvorite chỉ cần gui id bai hat sang be lưu id bài hát
// check nếu có thì mới cho + like hoặc -like của model song

const buttonLike=document.querySelector('[button-like]')
if(buttonLike){
  buttonLike.addEventListener('click',()=>{
    const id=buttonLike.getAttribute('button-like')
    const data={
      id:id
    }
    // check xem like hay unlike
    if(buttonLike.classList.contains('active')){
      buttonLike.classList.remove('active')
      data.type='unlike'
    }
    else{
      buttonLike.classList.add('active')
      data.type='like'
    }

    // update csdl
    fetch('/songs/like',{
      method:"PATCH",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    })
      .then(res=>res.json())
      .then(data=>{
        if(data.code==200){
          const innerNumber=buttonLike.querySelector('.inner-like span')
          innerNumber.innerHTML=data.updateLike
        }
        else{
          window.location.href='/user/login'
        }
      })
  })
}

//End Like

//Favorite
const innerHeart=document.querySelector('.inner-heart')
if(innerHeart){
  innerHeart.addEventListener('click',()=>{
    const idSong=innerHeart.getAttribute('button-favorite')
    fetch('/songs/favorite',{
      method:'PATCH',
      headers:{
        "Content-type":'application/json'
      },
      body:JSON.stringify(
        {
          idSong:idSong
        }
      )
    })
    .then(res=>res.json())
    .then(data=>{
      if(data.code==200){
        console.log(data);
      }
    })
  })
}
//End favorite


// show alert
const showAlert = document.querySelector('[show-alert]')
if (showAlert) {
  const time = parseInt(showAlert.getAttribute('show-alert')) || 3000
  setTimeout(() => {
    showAlert.classList.add('hidden')
  }, time);
}
// end show alert