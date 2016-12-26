const defaultProps = {
  name: '',
  errors: {}
}

function ErrorMessages (props) {
  let errors = props.errors[props.name];

  if (!errors || errors.length === 0) {
    return null
  }

  return (
    <ul className="error-messages">
      {errors.map((error)=> {
        return <li className="error-message">{error}</li>
      })}
    </ul>
  )
}

ErrorMessages.defaultProps = defaultProps

export default ErrorMessages
