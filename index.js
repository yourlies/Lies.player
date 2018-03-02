;(function () {
  var audio = document.createElement('audio');
  audio.src = '/demo.mp3';
  audio.volume = 0.6;

  var Helper = {};
  Helper.createNS = function (tag, options) {
    var ns = document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var i = 0; i < options.length; i++) {
      ns.setAttribute(options[i][0], options[i][1]);
    }
    return ns;
  }

  var LiesAudio = function (instance) {
    this.instance = instance;
  };
  LiesAudio.prototype.progress = function () {
    var LAsvg = Helper.createNS('svg', [
      ['width', 602], ['height', 9], ['viewbox', '0 0 9 602']
    ]);

    var LAdur = Helper.createNS('rect', [
      ['x', 0], ['y', 0], ['rx', 3], ['ry', 3],
      ['width', 600], ['height', 8],
      ['transform', 'translate(0.5, 0.5)'],
      ['fill', '#fafafa'], ['stroke', '#eee'], ['stroke-width', 1],
    ]);

    var LAbuf = Helper.createNS('rect', [
      ['x', 1], ['y', 1], ['rx', 3], ['ry', 3],
      ['width', 20], ['height', 7],
      ['fill', '#eee'],
    ]);

    var LApro = Helper.createNS('rect', [
      ['x', 1], ['y', 1], ['rx', 3], ['ry', 3],
      ['width', 20], ['height', 7],
      ['fill', 'rgba(238,110,115,.85)'],
    ]);

    LAsvg.appendChild(LAdur);
    // LAsvg.appendChild(LAbuf);
    LAsvg.appendChild(LApro);

    return LAsvg;
    // document.body.appendChild(LAsvg);

    // var _this = this;
    // audio.addEventListener('canplay', function (e) {
    //   _this.instance.duration = Math.ceil(audio.duration);
    // });
    // audio.addEventListener('timeupdate', function (e) {
    //   var bufferIndex = audio.buffered.length;
    //   var bufferedRate = audio.buffered.end(bufferIndex - 1) / audio.duration;

    //   LAbuf.setAttribute('width', bufferedRate * 600);
    //   LApro.setAttribute('width', (audio.currentTime * 100 / audio.duration) * 6);
    //   _this.instance.currentTime = Math.ceil(audio.currentTime);
    // });
  }
  LiesAudio.prototype.start = function () {
    var LAsvg = Helper.createNS('svg', [
      ['width', 104], ['height', 120], ['viewbox', '0 0 104 120']
    ])
    var LAsta = Helper.createNS('polygon', [
      ['points', '0, 0 0, 120 104, 60'], ['fill', '#eaeaea']
    ]);

    LAsvg.appendChild(LAsta);
    return LAsvg;
  }
  LiesAudio.prototype.pause = function () {
    var LAsvg = Helper.createNS('svg', [
      ['width', 104], ['height', 120], ['viewbox', '0 0 104 120']
    ])
    var LAgra = Helper.createNS('g', [
      ['fill', '#eaeaea']
    ]);
    var LAlpa = Helper.createNS('rect', [
      ['x', 0], ['y', 0],
      ['width', 40], ['height', 120]
    ]);
    var LArpa = Helper.createNS('rect', [
      ['x', 64], ['y', 0],
      ['width', 40], ['height', 120]
    ]);
    LAgra.appendChild(LAlpa);
    LAgra.appendChild(LArpa);

    LAsvg.appendChild(LAgra)
    return LAsvg;
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
  
  LAcontainer.appendChild(start);
  LAcontainer.appendChild(pause);
  LAcontainer.appendChild(progress);
})();