export class ComponentComponent extends React.Component {
  dispatch (event, ...args) {
    return this.context.emitter.emit(event, ...args);
  }

  componentWillMount () {
    this.setState(this.initialState(this.props));
  }

  initialState (props) {
    return {}
  }
}

export class ContextComponent extends ComponentComponent {
  constructor (props) {
    super(props);
  }

  componentWillUnmount () {
    this.addedOnStore.map(({ eventName, callback })=> {
      this.emitter.removeListener(eventName, callback);
      return eventName;
    });
  }

  get addedOnStore () {
    this._addedOnStore || (this._addedOnStore = []);
    return this._addedOnStore;
  }

  componentWillMount () {
    super.componentWillMount()

    if (!this.emitter) {
      this.emitter = this.context.emitter || new EventEmitter();
      this.listen((eventName, callback) => {
        this.addedOnStore.push({ eventName, callback });
        this.emitter.on(eventName, callback);
      });
    }
  }

  getChildContext () {
    return { emitter: this.context.emitter || this.emitter };
  }

  render () {
    let props = Object.assign({}, this.props, this.state);
    delete props.children;

    let { children } = this.props;

    return <div className="context-wrapper">
      {children.map((child, i)=> React.cloneElement(child, Object.assign(props, { key: i })))}
    </div>;
  }
}

