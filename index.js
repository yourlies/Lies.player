;(function () {
  var Helper = {};
  Helper.createNS = function (tag, options) {
    var ns = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var i = 0; i < options.length; i++) {
      ns.setAttribute(options[i][0], options[i][1]);
    }
    return ns;
  }
  Helper.createTP = function (tag, options) {
    var prep = [];
    var maps = {
      svg: function () {
        prep.push(['width', options[0]]);
        prep.push(['height', options[1]]);
        prep.push(['viewBox', '0 0' + ' ' + options[0] + ' ' + options[1]]);
      },
      rect: function () {
        if (options.length <= 3) {
          prep.push(['width', options[0]]);
          prep.push(['height', options[1]]);
          prep.push(['fill', options[2] || 'none']);
        } else {
          prep.push(['x', options[0]]);
          prep.push(['y', options[1]]);
          prep.push(['width', options[2]]);
          prep.push(['height', options[3]]);
          if (options[4]) {
            prep.push(['fill', options[4]]);
          }
        }
      }
    }
    maps[tag]();
    return this.createNS(tag, prep);
  }
  Helper.animator = function (tar, ref, comment) {
    options = comment.split(',');

    var refId;
    var style = options[0].trim();
    var frame = options[1].replace('s', '').trim() * 60;
    var begin = options[2].match(/from([a-z()0-9. ]+)to/)[1].replace('to', '').trim();
    var final = options[2].match(/to([a-z()0-9. ]+)/)[1].trim();
    var delta = (final.match(/[0-9.]+/)[0] - begin.match(/[0-9.]+/)[0]) / frame;

    var sub = begin.match(/[0-9.]+/)[0] - 0;
    var inf = final.match(/[0-9.]+/)[0] - 0;
    var current = sub;

    var render = function () {
      if (hover) {
        current += delta;
        if (current >= inf) {
          current = inf;
          ref.style[style] = begin.replace(/[0-9.]+/, current);
          cancelAnimationFrame(refId);
        } else {
          ref.style[style] = begin.replace(/[0-9.]+/, current);
        }
      } else {
        current -= delta;
        if (current <= sub) {
          current = sub;
          ref.style[style] = begin.replace(/[0-9.]+/, current);
          cancelAnimationFrame(refId);
        } else {
          ref.style[style] = begin.replace(/[0-9.]+/, current);
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

  var LiesAudio = function (instance) {
    this.audio = document.createElement('audio');
    this.instance = instance;
    this.components = {};

    this.setVolume(0);
    this.setSong('/demo.mp3');
  };
  LiesAudio.prototype.progress = function () {
    var LAsvg = Helper.createNS('svg', []);

    var LAdur = Helper.createTP('rect', ['100%', 6, 'none']);
    var LAbuf = Helper.createTP('rect', [20, 6, '#eee']);
    var LApro = Helper.createTP('rect', [20, 6, 'red']);

    LAsvg.appendChild(LAdur);
    LAsvg.appendChild(LAbuf);
    LAsvg.appendChild(LApro);

    var _this = this;
    this.audio.addEventListener('canplay', function (e) {
      _this.instance.duration = Math.ceil(_this.audio.duration);
    });

    var bufRafId;
    var bufPercent = 0;
    var currentPercent = 0;
    var framePercent = 0;
    var buffer = function () {
      currentPercent += framePercent;
      framePercent += 0.02;

      if (currentPercent >= bufPercent) {
        currentPercent = bufPercent;
        LAbuf.setAttribute('width', currentPercent + '%');
        cancelAnimationFrame(bufRafId);
      } else {
        LAbuf.setAttribute('width', currentPercent + '%');
        bufRafId = requestAnimationFrame(buffer);        
      }
    }

    this.audio.addEventListener('timeupdate', function (e) {
      var bufferIndex = _this.audio.buffered.length;
      var bufferedRate = _this.audio.buffered.end(bufferIndex - 1) / _this.audio.duration;

      if ((bufferedRate * 100) != bufPercent) {
        framePercent = ((bufferedRate * 100) - bufPercent) / 90;
        bufPercent = bufferedRate * 100;
        bufRafId = requestAnimationFrame(buffer);
      }
      
      LApro.setAttribute('width', ((_this.audio.currentTime / _this.audio.duration) * 100) + '%');
      _this.instance.currentTime = Math.ceil(_this.audio.currentTime);
    });

    return LAsvg;
  }
  LiesAudio.prototype.start = function () {
    var _this = this;
    var LAsvg = Helper.createTP('svg', [140, 140])
    var LAsta = Helper.createNS('polygon', [
      ['points', '0,0 0,120 104,60'], ['fill', '#e9e9e9']
    ]);
    var LAgra = Helper.createNS('linearGradient', [
      ['id', 'StartShadow'],
      ['x1', '0'], ['y1', '0'], ['x2', '100%'], ['y2', '100%']
    ]);
    var LAstr = Helper.createNS('stop', [
      ['offset', '5%'], ['stop-color', '#eee']
    ]);
    var LAsto = Helper.createNS('stop', [
      ['offset', '65%'], ['stop-color', '#fcfcfc']
    ]);
    var LAsha = Helper.createNS('polygon', [
      ['points', '0,120 45,140 140,85 104,60'],
      ['fill', 'url(#StartShadow)'],
    ]);
    LAgra.appendChild(LAstr);
    LAgra.appendChild(LAsto);
    LAsvg.appendChild(LAgra);
    LAsvg.appendChild(LAsta);
    LAsvg.appendChild(LAsha);

    LAsta.addEventListener('click', function () {
      _this.audio.play();
    });

    this.components.start = LAsta;
    return LAsvg;
  }
  LiesAudio.prototype.pause = function () {
    var _this = this;

    var LAsvg = Helper.createTP('svg', [140, 140]);
    var LApat = Helper.createNS('path', [
      ['fill', '#e9e9e9'],
      ['d', 'M 0 0 L 40 0 L 40 120 L 0 120 L 0 0 M 64 0 L 104 0 L 104 120 L 64 120']
    ]);
    var LAbac = Helper.createNS('path', [
      ['fill', '#e9e9e9'],
      ['d', 'M 0 0 L 104 0 L 104 120 L 0 120 L 0 0'],
    ]);
    var LAgra = Helper.createNS('linearGradient', [
      ['id', 'StartShadow'],
      ['x1', '0'], ['y1', '0'], ['x2', '100%'], ['y2', '100%']
    ]);
    var LAlsh = Helper.createNS('polygon', [
      ['points', '40,120 55,130 55,10 40,0'],
      ['fill', 'url(#StartShadow)'],
    ]);
    var LArsh = Helper.createNS('polygon', [
      ['points', '104,120 134,120 134,10 104,0'],
      ['fill', 'url(#StartShadow)'],
    ]);
    var LAstr = Helper.createNS('stop', [
      ['offset', '5%'], ['stop-color', '#f7f7f7']
    ]);
    var LAsto = Helper.createNS('stop', [
      ['offset', '75%'], ['stop-color', '#fafafa']
    ]);
    LAgra.appendChild(LAstr);
    LAgra.appendChild(LAsto);

    this.components.pause = LAbac;
    LAbac.style.opacity = 0;

    LAsvg.appendChild(LApat);
    LAsvg.appendChild(LAgra);
    LAsvg.appendChild(LAlsh);
    LAsvg.appendChild(LArsh);
    LAsvg.appendChild(LAbac);

    LAsvg.addEventListener('click', function () {
      _this.audio.pause();
    });
    return LAsvg;
  }
  LiesAudio.prototype.setVolume = function (volume) {
    this.audio.volume = volume;
  }
  LiesAudio.prototype.setSong = function (song) {
    this.audio.src = song;
  }

  var LiesRadio = new Lies({
    id: 'radio',
    data: function () {
      return {
        notice: '点击开始',
        duration: 0,
        currentTime: 0,
      }
    },
    methods: {
      start: function () {
        audio.play();
      },
      pause: function () {
        audio.pause();
      }
    }
  })
  new Refs(LiesRadio);

  var LAcontainer = document.querySelector('.LA-container');

  var LA = new LiesAudio(LiesRadio);
  var start = LA.start();
  var pause = LA.pause();
  var progress = LA.progress();


  var startWrap = document.createElement('div');
  startWrap.style.display = 'inline-block';
  startWrap.style.width = '104px';
  startWrap.style.height = '120px';
  startWrap.appendChild(start);

  progress.setAttribute('width', '100%');
  progress.setAttribute('height', 16);
  
  LAcontainer.querySelector('.LA-switch').appendChild(startWrap);
  LAcontainer.appendChild(progress);

  LA.components.start.addEventListener('click', function () {
    start.parentNode.replaceChild(pause, start);
  });
  LA.components.pause.addEventListener('click', function () {
    pause.parentNode.replaceChild(start, pause);
  })

  Helper.animator(LA.components.pause, pause, 'transform, 0.2s, from scale(1) to scale(1.15)');
  Helper.animator(LA.components.start, start, 'transform, 0.2s, from scale(1) to scale(1.15)');

  LA.components.start.style.cursor = 'pointer';
  LA.components.pause.style.cursor = 'pointer';
  start.style.opacity = 0.8;

  progress.style.opacity = 0.8;
  progress.style.position = 'absolute';
  progress.style.cursor = 'ew-resize';
  progress.style.top = 0;
  progress.style.left = 0;



  // 选择目标节点
  // var target = pause;
  // 创建观察者对象
  // var observer = new MutationObserver(function (mutations) {
  //   mutations.forEach(function (mutation) {
  //     console.log(mutation.type);
  //   });
  // });
  // 配置观察选项:
  // var config = { attributes: false, childList: false, characterData: true }
  // 传入目标节点和观察选项
  // observer.observe(target, config);
  // 随后,你还可以停止观察
  // observer.disconnect();
})();