const defaultProps = {
  name: '',
  errors: {}
}

function wrap (errors) {
  switch (true) {
    case !errors:
      return [];
    case errors.map:
      return errors;
    default:
      return [errors]
  }
}

function ErrorMessage (props) {
  let { errors, name } = props;

  let myErrors = wrap(errors[name]);
  if (myErrors.length === 0) {
    return null;
  }

  return (
    <ul className="error-messages">
      {myErrors.map((error, i)=>
        <li className="error-message" key={i}>{error}</li>)}
    </ul>
  )
}

ErrorMessage.defaultProps = defaultProps

export default ErrorMessage
