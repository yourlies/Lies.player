const Animator: Function = function (tar: any, ref: any, comment: string) {
  const options: Array<string> = comment.split(',');
  let refId: number;
  const style: string = options[0].trim();
  const frame: number = parseFloat(options[1].replace('s', '').trim()) * 60;

  const begin: string = options[2].match(/from([a-z()0-9. ]+)to/)[1].replace('to', '').trim();
  const final: string = options[2].match(/to([a-z()0-9. ]+)/)[1].trim();

  const sub: number = parseFloat(begin.match(/[0-9.]+/)[0]);
  const inf: number = parseFloat(final.match(/[0-9.]+/)[0]);

  const delta: number = (inf - sub) / frame;
  let hover: boolean;
  let current: number = sub;

  const render = function () {
    if (hover) {
      current += delta;
      if (current >= inf) {
        current = inf;
        ref.style[style] = begin.replace(/[0-9.]+/, current.toString());
        cancelAnimationFrame(refId);
      } else {
        ref.style[style] = begin.replace(/[0-9.]+/, current.toString());
      }
    } else {
      current -= delta;
      if (current <= sub) {
        current = sub;
        ref.style[style] = begin.replace(/[0-9.]+/, current.toString());
        cancelAnimationFrame(refId);
      } else {
        ref.style[style] = begin.replace(/[0-9.]+/, current.toString());
      }
    }
    refId = requestAnimationFrame(render);
  }
  tar.addEventListener('mouseenter', function () {
    hover = true;
    cancelAnimationFrame(refId);
    refId = requestAnimationFrame(render);
  });
  tar.addEventListener('mouseleave', function () {
    hover = false;
    cancelAnimationFrame(refId);
    refId = requestAnimationFrame(render);
  });
}
const Transition: Function = function (tar: any, state: any) {
  let refId: number;
  const recover = function (recState: any) {
    if (recState.current >= recState._inf) {
      recState.current = recState._inf;
      cancelAnimationFrame(refId);
    } else {
      recState.current += 1;
      refId = requestAnimationFrame(() => {
        tar.setAttribute('width', `${recState.current}%`)
        recover(recState);
      });
    }
  }
  Object.defineProperty(state, 'inf', {
    set (val) {
      state._inf = val;
      cancelAnimationFrame(refId);
      refId = requestAnimationFrame(() => {
        recover(state)
      });
    }
  });
  // currentPercent += framePercent;
  // framePercent += 0.02;
  // if (currentPercent >= bufPercent) {
  //   currentPercent = bufPercent;
  //   LAbuf.setAttribute('width', currentPercent + '%');
  //   cancelAnimationFrame(bufRafId);
  // } else {
  //   LAbuf.setAttribute('width', currentPercent + '%');
  //   bufRafId = requestAnimationFrame(buffer);        
  // }
}

export { Animator, Transition }