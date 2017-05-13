class ContextMenu {
  constructor () {
    var contextmenu = document.createElement('ul');
    contextmenu.className = 'interrupt-contextmenu';

    this.contextmenu = contextmenu;
    document.querySelector('html').appendChild(this.contextmenu);
  }

  addItem(name, callback) {
    var item = document.createElement('li');
    item.innerText = name;
    item.addEventListener('contextmenu', e => e.preventDefault());
    item.addEventListener('click', callback);
    this.contextmenu.appendChild(item);
  }

  open(x, y) {
    this.contextmenu.style.left = x + 'px';
    this.contextmenu.style.top = y + 'px';
    this.contextmenu.style.display = 'block';
  }

  hide() {
    this.contextmenu.style.display = 'none';
  }

  notTarget(e) {
    return e.path.indexOf(this.contextmenu) == -1;
  }
}
