declare const React;
declare const ReactDOM;
import InputForm from '../components/input-form'

export function writeInput(self, type, name, placeholder, label, errors = {}) {
  return <section className="com input-section">
    <InputForm {...{
      errors, type, name, placeholder, label, value: self.state[name],
      onChange: (v)=> {
        let p = {};
        p[name] = v;
        self.setState(p)
      }
    }}/>
  </section>
}
