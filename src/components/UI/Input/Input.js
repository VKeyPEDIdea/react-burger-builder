import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
	let inputElement = null;
	const inputClasses = [classes.InputElement];

	if (!props.isValid && props.shouldValidate && props.touched) {
		inputClasses.push(classes.Invalid);
	}

	switch (props.elType) {
		case 'input':
			inputElement = <input
			onChange={props.changed}
				className={inputClasses.join(' ')}
				value={props.value}
				{...props.elConfig}/>
			break;
		case 'textarea':
			inputElement = <textarea
			onChange={props.changed}
				className={inputClasses.join(' ')}
				value={props.value}
				{...props.elConfig}/>
			break;
		case 'select':
			inputElement = (
				<select
				onChange={props.changed}
					className={inputClasses.join(' ')}
					value={props.value}>
					{props.elConfig.options.map(option => {
						return <option
							key={option.value}
							value={option.value}>
							{option.displayValue}
						</option>
					})}
				</select>);
			break;
		default:
			inputElement = <input
			onChange={props.changed}
				className={inputClasses.join(' ')} 
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