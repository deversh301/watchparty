var socket = io();
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
      player = new YT.Player('player', {
      start: '550',
      autoplay: 0,
      videoId: 'dx4Teh-nv3A',
      playerVars: {
          'playsinline': 1
      },
      events: {
          'onReady': onPlayerReady,
          'onStateChange': onPlayerStateChange
      }
  });
 // player.loadVideoById({videoId: 'M7lc1UVf-VE', startSeconds: 250});
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  player.mute();
  // event.target.playVideo();
  // player.unMute();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
  function onPlayerStateChange(event) {
       console.log(event.data)
      if (event.data == 2 ) {
          console.log('emit done')
          socket.emit('chat message', player.getCurrentTime());
      }
 }
function stopVideo() {
  player.playVideo();
}

socket.on('send_pointer', function(msg) {
    console.log('message_received')  
    done = true;
    player.seekTo(msg)
    player.playVideo();
});
