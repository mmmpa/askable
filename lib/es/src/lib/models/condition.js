export const Condition = {
  Waiting: 0,
  Submitting: 1,
  Fail: 2,
  Success: 3
}

export function isToSuccess (nextProps, props) {
  if (!props) {
    return nextProps.state === Condition.Success
  }
  return props.passwordState !== Condition.Success && nextProps.passwordState === Condition.Success
}