import { Component } from 'react'

const EventingShared = {
  emitter: React.PropTypes.any
};

export class Good extends Component {
  static get contextTypes () {
    return EventingShared;
  }

  dispatch (event, ...args) {
    return this.context.emitter.emit(event, ...args);
  }
}

export class Parcel extends Good {
  static get childContextTypes () {
    return EventingShared;
  }

  componentWillUnmount () {
    this.addedOnStore.map(({ eventName, callback })=> {
      this.emitter.removeListener(eventName, callback);
      return eventName;
    });
  }

  get addedOnStore() {
    this._addedOnStore || (this._addedOnStore = []);
    return this._addedOnStore;
  }

  componentWillMount () {
    if (!this.emitter) {
      this.emitter = this.context.emitter || new EventEmitter();
      this.listen((eventName, callback) => {
        this.addedOnStore.push({ eventName, callback });
        this.emitter.on(eventName, callback);
      });
    }
  }

  constructor (props) {
    super(props);
    this.state = this.initialState(props);
  }

  getChildContext () {
    return { emitter: this.context.emitter || this.emitter };
  }

  render () {
    let props = _.assign({}, this.props, this.state);
    delete props.children;

    let { children } = this.props;
    let elements = !!children.map ? children : [children];

    return <div className="context-wrapper">
      {elements.map((child, i)=> React.cloneElement(child, _.assign(props, { key: i })))}
    </div>;
  }
}

