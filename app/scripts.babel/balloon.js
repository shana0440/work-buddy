class Balloon {
  constructor() {
    this.html = document.createElement('div');
    this.html.className = 'conversation-popovers';
  }

  setText(text) {
    this.html.innerText = text;
  }

  appendTo(element) {
    element.appendChild(this.html);
  }
}
