class imagesLines {
  constructor () {
    var lines = [
      '不想上班...',
      ['星期一要到了 ｡･ﾟ･(ﾉД`)･ﾟ･｡', () => new Date().getDay() == 0],
      '什麼時候才下班(っ﹏-) .｡o',
      '好想回家ヽ(´Д`；)'
    ];

    // images, lines index
    this.imagesLinesMapping = {
      '../images/joan-of-arc-alter-1.png': [
        0, 2
      ],
      '../images/joan-of-arc-alter-2.png': [
        0, 2
      ],
      '../images/joan-of-arc-alter-3.png': [
        1, 3
      ]
    };

    for (var k in this.imagesLinesMapping) {
      var images = this.imagesLinesMapping[k];
      for (var i = 0; i < images.length; i++) {
        images[i] = lines[images[i]];
      }
    }
  }

  getRandom() {
    var keys = Object.keys(this.imagesLinesMapping);
    var pick = ~~(Math.random() * keys.length);
    this.pick = {
      image: keys[pick],
      lines: this.getLines(keys[pick])
    };
    return this.pick;
  }

  getLines(image = null) {
    var image = image || this.pick.image;
    var linesArray = this.imagesLinesMapping[image];
    var pick = ~~(Math.random() * linesArray.length);
    var lines = linesArray[pick];
    while (Array.isArray(lines) && !lines[1]() && pick < linesArray.length * 2) {
      pick++;
      lines = linesArray[pick % linesArray.length];
    }
    return Array.isArray(lines) ? lines[0] : lines;
  }
}
