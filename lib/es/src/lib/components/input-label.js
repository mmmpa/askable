const InputLabel = props => {
  let { label } = props
  return label
    ? (<label className="input-label">{label}</label>)
    : null
}

export default InputLabel
