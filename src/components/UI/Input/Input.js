import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
	let inputElement = null;
	switch (props.elType) {
		case 'input':
			inputElement = <input
				className={classes.InputElement}
				value={props.value}
				{...props.elConfig}/>
			break;
		case 'textarea':
			inputElement = <textarea
				className={classes.InputElement}
				value={props.value}
				{...props.elConfig}/>
			break;
		default:
			inputElement = <input
				className={classes.InputElement} 
				value={props.value}
				{...props.elConfig}/>
			break;
	}
	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.label}</label>
			{inputElement}
		</div>
	);
}

export default input;