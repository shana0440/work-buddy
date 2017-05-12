function imagesLinesMap() {
  var images = [
    '../images/testing.png',
    '../images/testing2.png'
  ];

  var lines = [
    '不想上班...',
    '明天是星期一 ｡･ﾟ･(ﾉД`)･ﾟ･｡'
  ];

  // images index, lines index
  var imagesLinesMapping = [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1]
  ];

  var imagesLinesMappingObject = [];

  for (var i = 0; i < imagesLinesMapping.length; i++) {
    var image = images[imagesLinesMapping[i][0]];
    var line = lines[imagesLinesMapping[i][1]];
    imagesLinesMappingObject.push([image, line]);
  }

  return imagesLinesMappingObject;
}
