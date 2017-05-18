class Actor {
  constructor(imagesLines, wrapper) {
    this.imagesLinesMap = imagesLines;
    this.wrapper = wrapper;
    this.contextmenu = this.wrapper.html.contextmenu(this.wrapper.image);
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
      var wrapper = this.wrapper.html;
      var right = window.innerWidth - wrapper.offsetLeft - wrapper.clientWidth;
      this.loadImageAndLines();
      this.contextmenu.hide();
      wrapper.style.left = window.innerWidth - right - wrapper.clientWidth + 'px';
    });
  }

  initEvent() {
    var wrapper = this.wrapper.html;
    wrapper.dragable(this.wrapper.image);

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
