export default class AnchorColoring {
  doc = document
  anchoredColor = "#f2f9fc"
  selectedColor = "#fff9ea"
  clearColor = "#fff"
  colored = []
  anchored

  constructor (anchors) {
    this.initialize()

    anchors.forEach((anchor)=> {
      let targetId = anchor.getAttribute('data-targetId')
      let idSelector = `#comment-${targetId}`
      let target = this.getTarget(idSelector)

      anchor.addEventListener('click', (e)=> {
        location.href = idSelector
        this.reload()
      })

      anchor.addEventListener('mouseover', (e)=> {
        this.color(target, this.selectedColor)
      })

      anchor.addEventListener('mouseout', (e)=> {
        this.clear(target)
      })
    })
  }

  reload (e) {
    setTimeout(() => this.initialize(), 1)
  }

  color (target, color, push = true) {
    target.style.backgroundColor = color
    if (push) {
      this.colored.push(target)
    }
  }

  getTarget (locationHash) {
    return this.doc.querySelectorAll(locationHash + ' .response-comment')[0]
  }

  clear (target, remove = true) {
    if (target === this.anchored) {
      this.color(target, this.anchoredColor, false)
      return false
    }
    target.style.backgroundColor = this.clearColor
    if (remove) {
      _.remove(this.colored, target)
    }
  }

  clearAll () {
    let target
    while (target = this.colored.shift()) {
      this.clear(target, false)
    }
    this.colored.push(this.anchored)
  }

  initialize () {
    if (!location.hash) {
      return
    }
    this.clearAll()
    let target = this.getTarget(location.hash)
    this.anchored = target
    this.color(target, this.anchoredColor)
    this.clearAll()
  }

  static anchor (anchors) {
    new AnchorColoring(anchors)
  }
}

window.AnchorColoring = AnchorColoring
