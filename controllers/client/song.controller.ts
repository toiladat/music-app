import { Request, Response } from "express"
import unidecode from "unidecode"
import Topic from "../../models/topics.models"
import Song from "../../models/songs.model"
import Singer from "../../models/singer.model"
import User from "../../models/user.models"
import FavoriteSong from "../../models/favorite-song.models"
//[GET]/songs/:slugTopic
export const index = async (req: Request, res: Response) => {
  try {
    const slug = req.params.slugTopic
    // lay ra id topic
    const topic = await Topic.findOne({
      slug: slug,
      deleted: false,
      status: 'active'
    })
    const idTopic = topic["_id"]
    // lay songList theo id
    const songs = await Song.find({
      topicId: idTopic,
      deleted: false,
      status: 'active'
    })

    //Them thong tin singer cho moi bai hat
    for (const song of songs) {
      const singerData = await Singer.findOne({
        _id: song.singerId,
        status: 'active',
        deleted: false
      }).select('fullName')
      song["singerFullName"] = singerData.fullName
    }

    res.render("client/page/songs/list", {
      pageTitle: "Danh sách bài hát",
      songs: songs
    })
  }
  catch {
    res.send('Not Found')
  }
}
//[GET]/songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  try {
    const slugSong = req.params.slugSong
    const user = res.locals.user
    // lấy thông tin song  
    const song = await Song.findOne({
      slug: slugSong,
      status: 'active',
      deleted: false
    })

    // lấy thông tin singer 
    const singer = await Singer.findOne({
      _id: song.singerId,
      status: "active",
      deleted: false
    }).select("fullName")

    // lấy thông tin topic
    const topic = await Topic.findOne({
      _id: song.topicId,
      deleted: false,
      status: 'active'
    }).select('title')

    //ktra có like bài đó không
    const status = {
      like: '',
      favorite: ''
    }

    // neu co tai khoan
    if (user) {      
      const likedSong = await User.findOne({
        _id: user._id,
        likedSongList: song.id
      })    
      if (likedSong) {
        status['like'] = 'active'
      }
      //ktra co trong favorite khong
      const favoriteSong = await FavoriteSong.findOne({
        userId: user._id,
        songList: song.id
      })
      if (favoriteSong) {
        status['favorite'] = 'active'
      }
    }
    
    res.render('client/page/songs/detail.pug', {
      pageTitle: "Chi tiết bài hát",
      song: song,
      topic: topic,
      singer: singer,
      status: status
    })
  }
  catch {
    res.send("Có lỗi xảy ra")
  }
}
//[PATCH]/songs/like
export const like = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user

    const { id, type } = req.body
    // lay infor bai hat
    const song = await Song.findOne({
      _id: id,
      status: 'active',
      deleted: false
    })
    const currentLike = song.like
    let updateLike = 0
    let status = ''
    //o trang detail phai lay tu csdl ra xem like co activ khong 
    //1 ktra xem  trong likedSongList cua user co idSong
    const existSongInList = await User.findOne({
      _id: user._id,
      likedSongList: id
    })

    //unlike
    if (existSongInList) {
      await User.updateOne({
        _id: user._id
      }, {
        $pull: {
          likedSongList: id
        }
      })
      updateLike = currentLike - 1
      status = 'unliked'
    }
    //like
    else {
      await User.updateOne({
        _id: user._id
      }, {
        $push: {
          likedSongList: id
        }
      })
      updateLike = currentLike + 1
      status = 'liked'
    }
    // like, thi add, unlike, remove

    // +1|-1 likeNumber cua song




    await Song.updateOne({
      _id: id,
      status: 'active',
      deleted: false
    }, {
      like: updateLike
    })
    res.json({
      code: 200,
      message: "iu iu iu ",
      updateLike: updateLike,
      status: status
    })
  }
  catch {
    res.json({
      code: 400
    })
  }
}
//[PATCH]/songs/favorite
export const favoritePatch = async (req: Request, res: Response) => {
  try {
    const id = req.body.id
    const user = res.locals.user
    //ktra existSongInList
    const existSongInList = await FavoriteSong.findOne({
      userId: user._id,
      songList: id
    })
    let status = ''
    //unFavorite
    if (existSongInList) {
      await FavoriteSong.updateOne({
        userId: user._id
      }, {
        $pull: {
          songList: id
        }
      })
      status = 'unFavorite'
    }
    //favorite
    else {
      await FavoriteSong.updateOne({
        userId: user._id
      }, {
        $push: {
          songList: id
        }
      })
      status = 'favorite'
    }


    res.json({
      code: 200,
      message: "iu iu iu",
      status: status
    })
  }
  catch {
    res.json({
      code: 400,
      message: "Có lỗi xảy ra..",
    })
  }
}
//[GET]/songs/favorite
export const favorite = async (req: Request, res: Response) => {
  try {
    const user = res.locals.user
    const songs = []
    const result = await FavoriteSong.findOne({
      userId: user._id
    })
    const ids = result.songList

    for (const id of ids) {
      const inforSong = await Song.findOne({
        _id: id
      }).select('title avatar singerId  slug')

      const inforSinger = await Singer.findOne({
        _id: inforSong.singerId
      }).select('fullName')

      const song = {
        infoSong: inforSong,
        infoSinger: inforSinger
      }
      songs.push(song)

    }



    res.render('client/page/songs/favorite', {
      pageTitle: 'Bài hát yêu thích',
      songs: songs
    })
  }
  catch {
    res.redirect('back')
  }
}
//[GET]/songs/search
export const search = async (req: Request, res: Response) => {
  // submit form /result ->type=result
  // api /suggest?keyword='cat '->type=suggest, query -> cat
  const type=req.params.type
  

  let keyword = `${req.query.keyword}`.trim()
  // replace space global
  let keywordSlug=keyword.replace(/\s/g,"-")
  // replace --- -> -
  keywordSlug=keywordSlug.replace(/-+/g,'-').toLowerCase()
  // bo dau
  keywordSlug=unidecode(keywordSlug)

  
  // call api phai gui len object mới tạo ( k dùng req.body,..)
  //nghiêm ngặt hơn để tránh việc trả ra thông tin dư thừa
  const songs = []

  const regexSlug=new RegExp(keywordSlug,'i')
  const regex = new RegExp(keyword, 'i')

  const listSong = await Song.find({
    $or:[
      {title:regex},
      {slug:regexSlug}
    ],
    deleted: false,
    status: 'active'
  }).select('title avatar singerId like  slug')

  for (const _song of listSong) {

    const inforSinger = await Singer.findOne({
      _id: _song.singerId
    }).select('fullName')

    const song = {
      slug: _song.slug,
      avatar: _song.avatar,
      title: _song.title,
      like: _song.like,
      singerFullName: inforSinger.fullName
    }
    songs.push(song)    
  }
  if(type=='result'){
    res.render('client/page/songs/list.pug', {
      pageTitle: `Bài hát yêu thích`,
      keyword: keyword,
      songs: songs
    })
  }
  else if(type=='suggest'){
    res.json({
      code:200,
      songs:songs
    })
  }
  else{
    res.json({
      code:400
    })

  }


}