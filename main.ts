import { Animator as PowerWord, Transition } from './app/helper/';
import { LiesAudio, LiesAudioTemplate } from './app/index';

const demo = new LiesAudioTemplate;
const { el: demoPlayEl, play: demoPlay } = demo.play();
const { el: demoPauseEl, pause: demoPause } = demo.pause();
const { el: demoCoverEl } = demo.cover();
const { el: demoProgressEl, buffer: demoBuffer, progress: demoProgress } = demo.progress();

const demoAudio = new LiesAudio;
demoAudio.setSong('./demo.mp3');


const demoState = { inf: 12, current: 2 };
Transition(demoBuffer, demoState);
demoAudio.listen('timeupdate', function (e: any) {
  demoState.inf = demoAudio.buffered();
  const duration = demoAudio.currentTime() * 100 / demoAudio.duration();
  demoProgress.setAttribute('width', `${duration}%`);
});

demoPlay.addEventListener('click', function () {
  demoAudio.play();
});
demoPause.addEventListener('click', function () {
  demoAudio.pause();
});

const progressId: any = document.querySelector('#progress');
const playId: any = document.querySelector('#start');
const pauseId: any = document.querySelector('#pause');
const coverId: any = document.querySelector('#cover');
playId.appendChild(demoPlayEl);
pauseId.appendChild(demoPauseEl);
progressId.parentNode.replaceChild(demoProgressEl, progressId);
coverId.parentNode.replaceChild(demoCoverEl, coverId);

demoCoverEl.setAttribute('width', 150);
demoCoverEl.setAttribute('height', 150);
demoPlayEl.setAttribute('width', 100);
demoPlayEl.setAttribute('height', 100);
demoPauseEl.setAttribute('width', 100);
demoPauseEl.setAttribute('height', 100);
