'use strict';

class JoanAlter {
  constructor() {
    this.image = new Image();
    this.image.src = chrome.extension.getURL('../images/testing.jpg');
    this.wrapper = this.initWrapperTable();
    this.conversationPopovers = document.createElement('div');
    this.conversationPopovers.className = 'conversation-popovers';
    this.conversationPopovers.innerText = '不想上班';
    this.wrapper.appendFirst(this.conversationPopovers);
    this.wrapper.appendSecond(this.image);
  }

  initWrapperTable() {
    var wrapper = document.createElement('table');
    wrapper.className = 'interrupt-wrapper';
    var tr = document.createElement('tr');
    wrapper.appendChild(tr);
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    tr.appendChild(td1);
    tr.appendChild(td2);
    return {
      appendFirst: (ele) => {
        td1.appendChild(ele);
      },
      appendSecond: (ele) => {
        td2.appendChild(ele);
      },
      html: () => {
        return wrapper;
      }
    };
  }

  html() {
    return this.wrapper.html();
  }
}

chrome.runtime.onMessage.addListener((req, sender, res) => {
  console.log('recive message');
  switch (req.directive) {
    case 'disable-app':
      document.querySelector('.interrupt-wrapper').remove();
      res({a: 1})
      break;
    case 'enable-app':
      document.querySelector('html').append(joan.html());
      break;
  }
})

var joan = new JoanAlter();

chrome.storage.sync.get({
  disable: false
}, item => {
  if (!item.disable) {
    document.querySelector('html').append(joan.html());
  }
})
