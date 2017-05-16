'use strict';

chrome.runtime.onMessage.addListener((req, sender, res) => {
  switch (req.directive) {
    case 'disable-app':
      var ele = document.querySelector('.interrupt-wrapper');
      if (ele) ele.remove();
      break;
    case 'enable-app':
      var joan = new Actor(new imagesLines(), new ContextMenu(), new Wrapper(new Balloon()));
      joan.appendTo(document.querySelector('html'));
      break;
  }
})


chrome.storage.sync.get({
  disable: false
}, item => {
  if (!item.disable) {
    var joan = new Actor(new imagesLines(), new ContextMenu(), new Wrapper(new Balloon()));
    joan.appendTo(document.querySelector('html'));
  }
})
