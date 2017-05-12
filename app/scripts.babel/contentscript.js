'use strict';

class JoanAlter {
  constructor() {
    this.image = new Image();
    this.image.src = chrome.extension.getURL('../images/testing.png');
    this.wrapper = this.initWrapperTable();
    this.conversationPopovers = document.createElement('div');
    this.conversationPopovers.className = 'conversation-popovers';
    this.conversationPopovers.innerText = '不想上班';
    this.wrapper.appendFirst(this.conversationPopovers);
    this.wrapper.appendSecond(this.image);

    this.contextMenu = this.initContextMenu();
    this.initEvent();
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

  initContextMenu() {
    var wrapper = document.createElement('ul');
    wrapper.className = 'interrupt-contextmenu';
    var item = document.createElement('li');
    item.innerText = 'Close';
    item.addEventListener('contextmenu', (e) => {e.preventDefault();})
    item.addEventListener('click', (e) => {
      document.querySelector('.interrupt-wrapper').remove();
      document.querySelector('.interrupt-contextmenu').remove();
    })
    wrapper.appendChild(item);
    wrapper.style.display = 'none';
    document.querySelector('html').appendChild(wrapper);
    return {
      open: (x, y) => {
        wrapper.style.top = y + 'px';
        wrapper.style.left = x + 'px';
        wrapper.style.display = 'block';
      },
      hide: () => {
        wrapper.style.display = 'none';
      },
      html: () => {
        return wrapper;
      }
    };
  }

  initEvent() {
    var wrapper = this.wrapper.html();
    var x, y;
    this.image.ondragstart = () => false;
    this.image.addEventListener('mousedown', (e) => {
      if (e.which == 1) { // is left click
        x = e.layerX;
        y = e.layerY;
        window.addEventListener('mousemove', wrapperMove, true);
      } else if (e.which == 3) { // is right click
        // open contextmenu
        e.stopPropagation();
        e.preventDefault();
        this.contextMenu.open(e.clientX, e.clientY);
      }
    }, true);

    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', wrapperMove, true);
    }, true)

    var wrapperMove = (e) => {
      wrapper.style.top = (e.pageY - y) + 'px';
      wrapper.style.left = (e.pageX - x) + 'px';
    }

    wrapper.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      e.stopPropagation();
    }, true);

    window.addEventListener('mousedown', (e) => {
      if (e.path.indexOf(this.contextMenu.html()) == -1) {
        this.contextMenu.hide();
      }
    })
  }

  html() {
    return this.wrapper.html();
  }
}

chrome.runtime.onMessage.addListener((req, sender, res) => {
  switch (req.directive) {
    case 'disable-app':
      var ele = document.querySelector('.interrupt-wrapper');
      if (ele) ele.remove();
      break;
    case 'enable-app':
      var joan = new JoanAlter();
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
