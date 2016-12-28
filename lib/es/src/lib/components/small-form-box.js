import React from '../react';

const defaultProps = {
  label: 'label',
};

function SmallFormBox (props) {
  const {
    title,
    children,
  } = props;

  return (
    <div className="com border-box-container">
      <h1 className="com border-box-title-area">{title}</h1>
      <form className="com form-area">
        {children}
      </form>
    </div>
  );
}

SmallFormBox.defaultProps = defaultProps;

export default SmallFormBox;
