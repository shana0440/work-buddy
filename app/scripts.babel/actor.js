class Actor {
  constructor(imagesLines, contextmenu) {
    this.imagesLinesMap = imagesLines;
    this.wrapper = this.initWrapperTable();
    this.injectImageAndLines();
    this.contextmenu = contextmenu;
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
    var pick = this.imagesLinesMap.getRandom();
    this.image.src = chrome.extension.getURL(pick.image);
    this.conversationPopovers.innerText = pick.lines;
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

    this.image.addEventListener('click', (e) => {
      var lines = this.imagesLinesMap.getOtherLines();
      this.conversationPopovers.innerText = lines;
    })
  }

  html() {
    return this.wrapper.html();
  }
}
