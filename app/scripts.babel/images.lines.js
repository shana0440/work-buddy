class imagesLines {
  constructor () {
    var lines = [
      '不想上班...',
      '星期一要到了 ｡･ﾟ･(ﾉД`)･ﾟ･｡',
      '什麼時候才下班(っ﹏-) .｡o'
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
        1,
      ]
    };

    for (var k in this.imagesLinesMapping) {
      var images = this.imagesLinesMapping[k];
      for (var i = 0; i < images.length; i++) {
        images[i] = lines[i];
      }
    }
  }

  getRandom() {
    var keys = Object.keys(this.imagesLinesMapping);
    var pickImage = ~~(Math.random() * keys.length);
    var linesArray = this.imagesLinesMapping[keys[pickImage]];
    var pickLines = ~~(Math.random() * linesArray.length);
    this.pick = {
      image: keys[pickImage],
      lines: linesArray[pickLines]
    };
    return this.pick;
  }

  getOtherLines() {
    var image = this.pick.image;
    var linesArray = this.imagesLinesMapping[image];
    var pick = ~~(Math.random() * linesArray.length);
    return linesArray[pick]
  }
}
