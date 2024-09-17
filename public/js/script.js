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
    }]
  });

}
//End APlayer
