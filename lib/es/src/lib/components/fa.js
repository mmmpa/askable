import React from '../react'

const defaultProps = {
  icon: 'ban'
}

function Fa (props) {
  const classes = ['fa']

  classes.push("fa-" + props.icon)
  props.scale && classes.push("fa-" + props.scale + "x")
  (props.fixedWidth === undefined || props.fixedWidth === true) && classes.push('fa-fw')
  props.list && classes.push('fa-li')
  props.border && classes.push('fa-border')
  props.pull && classes.push("fa-pull-" + props.pull)
  props.animation && classes.push("fa-" + props.animation)
  props.rotate && classes.push("fa-rotate-" + props.rotate)
  props.flip && classes.push("fa-flip-" + props.flip)

  return <i className={classes.join(' ')}/>
}

Fa.defaultProps = defaultProps

export default Fa
