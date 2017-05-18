Object.prototype.contextmenu = function (trigger) {
  var contextmenu = document.createElement('ul');
  contextmenu.className = 'interrupt-contextmenu';
  document.querySelector('html').appendChild(contextmenu);

  this.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    e.stopPropagation();
  }, true);

  trigger.addEventListener('mousedown', (e) => {
    if (e.which == 3) { // is right click
      e.stopPropagation();
      e.preventDefault();
      open(e.clientX, e.clientY);
    }
  }, true);

  var open = (x, y) => {
    contextmenu.style.left = x + 'px';
    contextmenu.style.top = y + 'px';
    contextmenu.style.display = 'block';
  }

  window.addEventListener('mousedown', (e) => {
    if (e.path.indexOf(contextmenu) == -1) {
      hide();
    }
  })

  var hide = () => {
    contextmenu.style.display = 'none';
  }

  return {
    addItem: (name, callback) => {
      var item = document.createElement('li');
      item.innerText = name;
      item.addEventListener('contextmenu', e => e.preventDefault());
      item.addEventListener('click', callback);
      contextmenu.appendChild(item);
    },
    open: open,
    hide: hide,
    remove: () => {
      contextmenu.remove();
    }
  }
}
