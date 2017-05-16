class ContextMenu {
  constructor () {
    var contextmenu = document.createElement('ul');
    contextmenu.className = 'interrupt-contextmenu';

    this.html = contextmenu;
    document.querySelector('html').appendChild(this.html);
  }

  addItem(name, callback) {
    var item = document.createElement('li');
    item.innerText = name;
    item.addEventListener('contextmenu', e => e.preventDefault());
    item.addEventListener('click', callback);
    this.html.appendChild(item);
  }

  open(x, y) {
    this.html.style.left = x + 'px';
    this.html.style.top = y + 'px';
    this.html.style.display = 'block';
  }

  hide() {
    this.html.style.display = 'none';
  }

  remove() {
    this.html.remove();
  }

  notTarget(e) {
    return e.path.indexOf(this.html) == -1;
  }
}
