import classes from './Button.module.css';
import React from 'react';

const button = props => {
	return(
		<button
			className={[classes.Button, classes[props.btnType]].join(' ')}
			onClick={props.clicked}
		>{props.children}</button>
	);
}

export default button;