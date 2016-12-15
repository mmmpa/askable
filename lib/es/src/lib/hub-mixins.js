export const receiver = (klass) => {
  klass.prototype.dispatch = function (event, ...args) {
    return this.context.emitter.emit(event, ...args);
  }
}

export const provider = (klass) => {
  klass.prototype = {
    __proto__: klass.prototype,
    get addedOnStore () {
      this._addedOnStore || (this._addedOnStore = []);
      return this._addedOnStore;
    }
  }

  let componentWillUnmount = klass.prototype.componentWillUnmount
  klass.prototype.componentWillUnmount = function () {
    componentWillUnmount && componentWillUnmount.call(this)

    this.addedOnStore.map(({ eventName, callback })=> {
      this.emitter.removeListener(eventName, callback);
      return eventName;
    });
  }

  let componentWillMount = klass.prototype.componentWillMount

  klass.prototype.componentWillMount = function () {
    componentWillMount && componentWillMount.call(this)

    if (!this.emitter) {
      this.emitter = this.context.emitter || new EventEmitter();
      this.listen((eventName, callback) => {
        this.addedOnStore.push({ eventName, callback });
        this.emitter.on(eventName, callback);
      });
    }
  }

  let getChildContext = klass.prototype.getChildContext

  klass.prototype.getChildContext = function () {
    let base = getChildContext ? getChildContext.call(this)

    return Object.assign(base, { emitter: this.context.emitter || this.emitter });
  }

  klass.prototype.render = function () {
    let props = Object.assign({}, this.props, this.state);
    delete props.children;

    let { children } = this.props;

    return <div className="context-wrapper">
      {children.map((child, i)=> React.cloneElement(child, Object.assign(props, { key: i })))}
    </div>;
  }
}
