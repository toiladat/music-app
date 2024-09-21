//APlayer
const aplayer = document.getElementById('aplayer')
if (aplayer) { 
  let dataSinger = aplayer.getAttribute('data-singer')
  dataSinger = JSON.parse(dataSinger)

  let dataSong = aplayer.getAttribute('data-song')
  dataSong = JSON.parse(dataSong)

  const ap = new APlayer({
    container: aplayer,
    audio: [{
      name: dataSong.title,
      artist: dataSinger.fullName,
      url: dataSong.audio,
      cover: dataSong.avatar
    }],
    autoplay: true
  });
  // css đĩa quay nhạc pause hoặc running khi bài hát chạy
  const avatar = document.querySelector('.inner-avatar')
  ap.on('pause', () => {
    avatar.style.animationPlayState = 'paused'
  })
  ap.on('play', () => {
    avatar.style.animationPlayState = 'running'


    const timeRequire = ap.audio.duration * 4 / 5 * 1000;

    // tăng lượt nghe
    setTimeout(() => {
      // bên fe thì phải dùng _id
      // set timeout nhưng khi chạy hết bài mới bắt đầu tăng lượt nghe
      ap.on('ended', () => {
        fetch(`/songs/listen`,{
          method:'PATCH',
          headers:{
            "Content-Type": "application/json"
          },
          body:JSON.stringify({
            id:dataSong._id
          })
        })
          .then(res => res.json())
          .then(data => {
            if (data.code == 200) {
              const innerNumberListen = document.querySelector('.singer-detail .inner-listen .inner-number')
              innerNumberListen.innerHTML = data.listen
            }
          })
      })
    }, timeRequire);

  })

  // khi kết thúc tự động next sang bài hát cùng topics
  // 1 server gửi thêm 1 songList theo chủ đề
  // 2 nếu chọn phát tuần tự 
  //     --> dùng array.find rồi tìm ra bài đứng sau đó, rồi window.location đến bài đó
  //     --> nếu array.find = songList.length thì phát lại từ đầu
  // 2 nếu chọn phát ngẫu nhiên trong list 
  //     --> dùng random để phát random những bài trong list
  // app.on('ended',()=>{
  //   window.location=''
  //   fetch()
  // })


}
//End APlayer


//Like|unLike
// Mô tả làm lại phần like
// làm login/register user( be se co thong tin user)
// auth ( thì mới cho like và fauvorite)
// hiển thị fauvorite song list, liked song list
// model user là likedSongList:[] và fauvoriteSongList:[]
// khi like hoặc add fouvorite chỉ cần gui id bai hat sang be lưu id bài hát
// check nếu có thì mới cho + like hoặc -like của model song

const buttonLike = document.querySelector('[button-like]')
if (buttonLike) {
  buttonLike.addEventListener('click', () => {
    const id = buttonLike.getAttribute('button-like')
    const data = {
      id: id
    }

    // update csdl
    fetch('/songs/like', {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => {
        if (data.code == 200) {
          const innerNumber = buttonLike.querySelector('.inner-like span')
          innerNumber.innerHTML = data.updateLike
          if (data.status == 'unliked') {
            buttonLike.classList.remove('active')
          } else {
            buttonLike.classList.add('active')
          }
        } else {
          window.location.href = '/user/login'
        }
      })
  })
}

//End Like

//Favorite
const ListinnerHeart = document.querySelectorAll('[button-favorite]')
if (ListinnerHeart.length > 0) {
  ListinnerHeart.forEach(innerHeart => {
    innerHeart.addEventListener('click', () => {
      const id = innerHeart.getAttribute('button-favorite')
      fetch('/songs/favorite', {
          method: 'PATCH',
          headers: {
            "Content-type": 'application/json'
          },
          body: JSON.stringify({
            id: id
          })
        })
        .then(res => res.json())
        .then(data => {
          if (data.code == 200) {
            if (data.status == 'unFavorite') {
              innerHeart.classList.remove('active')
            } else {
              innerHeart.classList.add('active')
            }
          } else {
            window.location.href = '/user/login'
          }
        })
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

// Gợi ý tìm kiếm API
const boxSearch = document.querySelector('.box-search')
if (boxSearch) {
  const inputSearch = boxSearch.querySelector("input[name='keyword']")
  inputSearch.addEventListener('keyup', () => {
    const keyword = inputSearch.value;
    // /suggest la dynamic link
    fetch(`/songs/search/suggest?keyword=${keyword}`)
      .then(res => res.json())
      .then(data => {
        if (data.code == 200) {

          const htmlSong = data.songs.map(item => `
            <a class="inner-item" href="/songs/detail/${item.slug}">
              <div class="inner-image">
                <img src="${item.avatar}">
              </div>
              <div class="inner-info">
                <div class="inner-title">${item.title}</div>
                <div class="inner-singer">
                  <i class="fa-solid fa-microphone-lines"></i> ${item.singerFullName}
                </div>
              </div>
            </a>
          `);
          const elementInnerSuggest = boxSearch.querySelector('.inner-suggest')
          const elementInnerList = elementInnerSuggest.querySelector('.inner-list')
          //htmlsóngs la 1 array

          elementInnerList.innerHTML = htmlSong.join("");
          if (data.songs.length > 0) {
            elementInnerSuggest.classList.add("show");
          } else {
            elementInnerSuggest.classList.remove("show");
          }

        }
      })
  })
}
// Hết gợi ý tìm kiếm API