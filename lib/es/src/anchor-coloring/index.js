import { remove } from 'lodash';

export default class AnchorColoring {
  doc = document;
  anchoredColor = '#f2f9fc';
  selectedColor = '#fff9ea';
  clearColor = '#fff';
  colored = [];
  anchored;

  constructor (anchors) {
    this.anchors = anchors;
    this.initialize();
  }

  enchant () {
    this.anchors.forEach((anchor) => {
      const targetId = anchor.getAttribute('data-targetId');
      const idSelector = `#comment-${targetId}`;
      const target = this.getTarget(idSelector);

      anchor.addEventListener('click', () => {
        location.href = idSelector;
        this.reload();
      });

      anchor.addEventListener('mouseover', () => {
        this.color(target, this.selectedColor);
      });

      anchor.addEventListener('mouseout', () => {
        this.clear(target);
      });
    });
  }

  reload () {
    setTimeout(() => this.initialize(), 1);
  }

  color (target, color, push = true) {
    target.style.backgroundColor = color; // eslint-disable-line no-param-reassign

    if (push) {
      this.colored.push(target);
    }
  }

  getTarget (locationHash) {
    return this.doc.querySelectorAll(`${locationHash} .response-comment`)[0];
  }

  clear (target, removing = true) {
    if (target === this.anchored) {
      this.color(target, this.anchoredColor, false);
      return false;
    }

    target.style.backgroundColor = this.clearColor; // eslint-disable-line no-param-reassign

    if (removing) {
      remove(this.colored, target);
    }

    return true;
  }

  clearAll () {
    for (let target; target; target = this.colored.shift()) {
      this.clear(target, false);
    }
    this.colored.push(this.anchored);
  }

  initialize () {
    if (!location.hash) {
      return;
    }
    this.clearAll();
    const target = this.getTarget(location.hash);
    this.anchored = target;
    this.color(target, this.anchoredColor);
    this.clearAll();
  }

  static anchor (anchors) {
    new AnchorColoring(anchors).enchant();
  }
}

window.AnchorColoring = AnchorColoring;
