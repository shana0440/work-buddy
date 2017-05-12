function imagesLinesMap() {
  var images = [
    '../images/testing.png',
    '../images/testing2.png',
    '../images/testing3.png'
  ];

  var lines = [
    '不想上班...',
    '星期一要到了 ｡･ﾟ･(ﾉД`)･ﾟ･｡',
    '好累阿(_ _).｡o○'
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
