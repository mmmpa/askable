declare const React;
declare const ReactDOM;
declare const EventEmitter;

interface IEventingShared {
  emitter: EventEmitter
}

export const EventingShared = {
  emitter: React.PropTypes.any
};

interface RootP {
}

export abstract class Node<P, S> extends React.Component<P, S> {
  context:IEventingShared;

  static get contextTypes():React.ValidationMap<any> {
    return EventingShared;
  }

  dispatch(event:string, ...args:any[]):boolean {
    return this.context.emitter.emit(event, ...args);
  }
}

export abstract class Root<P, S> extends Node<RootP & P, S> {
  emitter:EventEmitter;
  addedOnStore = [];

  abstract listen(to:(eventName:string, callback:Function)=>void):void;
  abstract initialState(props):S;

  static get childContextTypes():React.ValidationMap<any> {
    return EventingShared;
  }

  componentWillUnmount() {
    let disposed = this.addedOnStore.map(({eventName, callback})=> {
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
    let props = _.merge(_.clone(this.props), this.state);
    delete props.children;
    let {children} = this.props;
    if(!children.map){
      children = [children]
    }
    return <div>{children.map((child)=> React.cloneElement(child || <div>blank</div>, props))}</div>;
  }
}

