import { Audio, AudioInterface } from './interface/';
import { Animator as PowerWord, Transition } from './helper/';
import {
  play as PlayTemplate,
  pause as PauseTemplate,
  progress as ProgressTemplate,
  cover as CoverTemplate, } from './template/';

class LiesAudio implements AudioInterface {
  private _audio: Audio;
  constructor () {
    this._audio = document.createElement('audio');
  }
  public listen (event: string, handle: Function) {
    this._audio.addEventListener(event, (e: any) => {
      handle.call(this, e);
    });
  }
  public buffered () {
    return this._audio.buffered.end(0);
  }
  public currentTime () {
    return this._audio.currentTime;
  }
  public duration () {
    return this._audio.duration;
  }
  public setVolume (volume: number) {
    this._audio.volume = volume;
  }
  public setSong (url: string) {
    this._audio.src = url;
  }
  public play () {
    this._audio.play();
  }
  public pause () {
    this._audio.pause();
  }
}

class LiesAudioTemplate implements AudioInterface {
  public play () {
    return PlayTemplate(function ({ el }: { el: any }, props: any) {
      const play: any = el.querySelector('[ref=play]');
      play.removeAttribute('ref');
      PowerWord(play, el, 'transform, 0.3s, from scale(1) to scale(1.1)');
      return { el, play };
    });
  }
  public pause () {
    return PauseTemplate(function ({ el }: { el: any }, props: any) {
      const pause: any = el.querySelector('[ref=pause]');
      pause.removeAttribute('ref');
      PowerWord(pause, el, 'transform, 0.3s, from scale(1) to scale(1.1)');
      return { el, pause };
    });
  }
  public progress () {
    return ProgressTemplate(function ({ el }: { el: any }, props: any) {
      const buffer: any = el.querySelector('[ref=buffer]');
      const progress: any = el.querySelector('[ref=progress]');
      buffer.removeAttribute('ref');
      progress.removeAttribute('ref');
      return { el, buffer, progress };
    });
  }
  public cover () {
    return CoverTemplate(function ({ el }: { el: any }, props: any) {
      return { el };
    });
  }
}


const demo = new LiesAudioTemplate;
const { el: demoPlayEl, play: demoPlay } = demo.play();
const { el: demoPauseEl, pause: demoPause } = demo.pause();
const { el: demoCoverEl } = demo.cover();
const { el: demoProgressEl, buffer: demoBuffer, progress: demoProgress } = demo.progress();

const demoAudio = new LiesAudio;
// demoAudio.setSong('./demo.mp3');


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

export default LiesAudio;