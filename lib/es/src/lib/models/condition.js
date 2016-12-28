export const Condition = {
  Waiting: 0,
  Submitting: 1,
  Fail: 2,
  Success: 3,
  Retrying: 4
}

export function isToSuccess (nextProps, props, conditionKey = 'condition') {
  if (!props) {
    return nextProps.condition === Condition.Success
  }
  return props[conditionKey] !== Condition.Success && nextProps[conditionKey] === Condition.Success
}