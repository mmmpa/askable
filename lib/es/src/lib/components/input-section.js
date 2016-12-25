import InputForm from './input-form'

const InputSection = props => {
  return (
    <section className="com input-section">
      <InputForm {...props}/>
    </section>
  )
}

export default InputSection