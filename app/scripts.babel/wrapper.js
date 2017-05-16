class Wrapper {
  constructor(balloon) {
    this.balloon = balloon;
    this.image = new Image();
    this.image.ondragstart = () => false;
    this.html = this.newWrapper(this.balloon, this.image);
  }

  newWrapper(balloon, image) {
    var wrapper = document.createElement('table');
    wrapper.className = 'interrupt-wrapper';
    var tr = document.createElement('tr');
    wrapper.appendChild(tr);
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    tr.appendChild(td1);
    tr.appendChild(td2);

    this.balloon.appendTo(td1);
    td2.appendChild(image);

    return wrapper;
  }

  setImage(src) {
    this.image.src = chrome.extension.getURL(src);
  }

  setText(text) {
    this.balloon.setText(text);
  }

  remove() {
    this.html.remove();
  }

  appendTo(ele) {
    ele.appendChild(this.html);
  }

}
