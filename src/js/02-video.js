import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const timeKey = 'videoplayer-current-time';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);

function onPlay(data) {
  let currentTime = data.seconds;

  localStorage.setItem(timeKey, currentTime);
}

player.on('timeupdate', throttle(onPlay, 1000));

if (localStorage.getItem(timeKey)) {
  player.setCurrentTime(localStorage.getItem(timeKey));
}
