
//pulled from https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url/8260383#8260383

//strip the youtube part off so it is only the video ID https://www.youtube.com/watch?v=dQw4w9WgXcQ => dQw4w9WgXcQ
const youtube_parser = (url) => {
  var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  return (match && match[7].length == 11) ? match[7] : false;
};

export default youtube_parser;