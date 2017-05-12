'use strict';

chrome.runtime.onMessage.addListener((req, sender, res) => {
  switch (req.directive) {
    case 'disable-app':
      var ele = document.querySelector('.interrupt-wrapper');
      if (ele) ele.remove();
      break;
    case 'enable-app':
      var joan = new Actor();
      document.querySelector('html').append(joan.html());
      break;
  }
})

var joan = new Actor(imagesLinesMap());

chrome.storage.sync.get({
  disable: false
}, item => {
  if (!item.disable) {
    document.querySelector('html').append(joan.html());
  }
})
