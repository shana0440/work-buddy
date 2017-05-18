// 這邊的function不能使用 () =>
// 因為會造成this為undefined的錯誤
// () => 的this是父層的this
// 而function是指這個function的owner
Object.prototype.dragable = function (trigger) {
  var x, y;

  trigger.addEventListener('mousedown', (e) => {
    if (e.which == 1) { // is left click
      x = e.layerX;
      y = e.layerY;
      window.addEventListener('mousemove', move, true);
    }
  }, true);

  window.addEventListener('mouseup', () => {
    window.removeEventListener('mousemove', move, true);
  }, true)

  var move = (e) => {
    this.style.top = (e.pageY - y) + 'px';
    this.style.left = (e.pageX - x) + 'px';
  }
}
