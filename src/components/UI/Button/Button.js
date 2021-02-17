import classes from './Button.module.css';
import React from 'react';

const button = props => {
	return(
		<button
			disabled={props.disabled}
			className={[classes.Button, classes[props.btnType]].join(' ')}
			onClick={props.clicked}
		>{props.children}</button>
	);
}

export default button;