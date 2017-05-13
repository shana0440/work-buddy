class Actor {
  constructor(imagesLinesMap) {
    this.imagesLinesMap = imagesLinesMap;
    this.wrapper = this.initWrapperTable();
    this.injectImageAndLines();
    this.contextmenu = new ContextMenu();
    this.initContextMenu();
    this.initEvent();
  }

  injectImageAndLines() {
    this.image = new Image();
    this.conversationPopovers = document.createElement('div');
    this.conversationPopovers.className = 'conversation-popovers';
    this.wrapper.appendFirst(this.conversationPopovers);
    this.wrapper.appendSecond(this.image);
    this.loadImageAndLines();
  }

  loadImageAndLines() {
    var pick = ~~(Math.random() * this.imagesLinesMap.length);
    this.image.src = chrome.extension.getURL(this.imagesLinesMap[pick][0]);
    this.conversationPopovers.innerText = this.imagesLinesMap[pick][1];
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
      },
      reload: () => {
        this.loadImageAndLines();
      }
    };
  }

  initContextMenu() {
    this.contextmenu.addItem('Close', () => {
      document.querySelector('.interrupt-wrapper').remove();
      document.querySelector('.interrupt-contextmenu').remove();
    });
    this.contextmenu.addItem('Reload', () => {
      this.wrapper.reload();
      this.contextmenu.hide();
    });
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
        this.contextmenu.open(e.clientX, e.clientY);
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
      if (this.contextmenu.notTarget(e)) {
        this.contextmenu.hide();
      }
    })
  }

  html() {
    return this.wrapper.html();
  }
}
