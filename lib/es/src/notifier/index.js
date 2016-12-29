export default class Notifier {
  static risingClass (type) {
    return `body notifier ${type} rising`;
  }

  static fadingClass (type) {
    return `body notifier ${type} rising fading`;
  }

  static createStore (type, message) {
    setTimeout(() => {
      this.create(type, message);
    }, 1000);
  }

  static create (type, message) {
    const doc = document;
    const div = doc.createElement('div');
    const p = document.createElement('p');

    div.setAttribute('class', `body notifier ${type}`);
    p.innerText = message;

    div.appendChild(p);
    doc.getElementsByTagName('body')[0].appendChild(div);
    setTimeout(() => {
      div.setAttribute('class', this.risingClass(type));
      setTimeout(() => {
        div.setAttribute('class', this.fadingClass(type));
        setTimeout(() => {
          div.parentNode.removeChild(div);
        }, 200);
      }, 3000);
    }, 1);
  }

  static alert (message) {
    this.createStore('alert', message);
  }

  static notify (message) {
    this.createStore('notify', message);
  }
}

window.Notifier = Notifier;
