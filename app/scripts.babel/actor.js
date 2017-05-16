class Actor {
  constructor(imagesLines, contextmenu, wrapper) {
    this.imagesLinesMap = imagesLines;
    this.wrapper = wrapper;
    this.contextmenu = contextmenu;
    this.loadImageAndLines();
    this.initContextMenu();
    this.initEvent();
  }

  loadImageAndLines() {
    var pick = this.imagesLinesMap.getRandom();
    this.wrapper.setImage(pick.image);
    this.wrapper.setText(pick.lines);
  }

  initContextMenu() {
    this.contextmenu.addItem('Close', () => {
      this.wrapper.remove();
      this.contextmenu.remove();
    });
    this.contextmenu.addItem('Reload', () => {
      this.loadImageAndLines();
      this.contextmenu.hide();
    });
  }

  initEvent() {
    var wrapper = this.wrapper.html;
    var x, y;
    this.wrapper.image.addEventListener('mousedown', (e) => {
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

    this.wrapper.image.addEventListener('click', (e) => {
      var lines = this.imagesLinesMap.getLines();
      var right = window.innerWidth - wrapper.offsetLeft - wrapper.clientWidth;
      this.wrapper.setText(lines);
      wrapper.style.left = window.innerWidth - right - wrapper.clientWidth + 'px';
    })
  }

  appendTo(ele) {
    this.wrapper.appendTo(ele);
  }
}
