function imagesLinesMap() {
  var images = [
    '../images/joan-of-arc-alter-1.png',
    '../images/joan-of-arc-alter-2.png',
    '../images/joan-of-arc-alter-3.png'
  ];

  var lines = [
    '不想上班...',
    '星期一要到了 ｡･ﾟ･(ﾉД`)･ﾟ･｡',
    '什麼時候才下班(っ﹏-) .｡o'
  ];

  // images index, lines index
  var imagesLinesMapping = [
    [0, 0],
    [1, 0],
    [2, 1],
    [1, 2]
  ];

  var imagesLinesMappingObject = [];

  for (var i = 0; i < imagesLinesMapping.length; i++) {
    var image = images[imagesLinesMapping[i][0]];
    var line = lines[imagesLinesMapping[i][1]];
    imagesLinesMappingObject.push([image, line]);
  }

  return imagesLinesMappingObject;
}
