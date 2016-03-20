declare const React;
declare const ReactDOM;
declare const EventEmitter;

interface IEventingShared {
  emitter: EventEmitter
}

const EventingShared = {
  emitter: React.PropTypes.any
};

export abstract class Good extends React.Component {
  context:IEventingShared;

  static get contextTypes():React.ValidationMap<any> {
    return EventingShared;
  }

  dispatch(event:string, ...args:any[]):boolean {
    return this.context.emitter.emit(event, ...args);
  }
}

export abstract class Parcel extends Good {
  emitter:EventEmitter;
  addedOnStore = [];

  abstract listen(to:(eventName:string, callback:Function)=>void):void;

  abstract initialState(props):S;

  static get childContextTypes():React.ValidationMap<any> {
    return EventingShared;
  }

  componentWillUnmount() {
    this.addedOnStore.map(({eventName, callback})=> {
      this.emitter.removeListener(eventName, callback);
      return eventName;
    });
  }

  componentWillMount() {
    if (!this.emitter) {
      this.emitter = this.context.emitter || new EventEmitter();
      this.listen((eventName:string, callback:Function) => {
        this.addedOnStore.push({eventName, callback});
        this.emitter.on(eventName, callback);
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = this.initialState(props);
  }

  getChildContext():IEventingShared {
    return {emitter: this.context.emitter || this.emitter};
  }

  render() {
    let props = _.assign({}, this.props, this.state);
    delete props.children;

    let {children} = this.props;
    let elements = !!children.map ? children : [children];

    return <div className="context-wrapper">
      {elements.map((child, i)=> React.cloneElement(child, _.assign(props, {key: i})))}
    </div>;
  }
}
