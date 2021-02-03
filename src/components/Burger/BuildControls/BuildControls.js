import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from "./BuildControls.module.css";

// const controls = [
// 	{ label: 'Salad', type: 'salad'},
// 	{ label: 'Bacon', type: 'bacon'},
// 	{ label: 'Cheese', type: 'cheese'},
// 	{ label: 'Meat', type: 'meat'},
// ];

const buildControls = props => {
	const ctrls = Object.keys(props.ingredients)
		.reduce((arr, ig) => {
			return arr.concat({ label: ig, type: ig });
		}, []);

	return(
		<div className={classes.BuildControls}>
			{ctrls.map(ctrl => {
				return <BuildControl
					key={ctrl.label}
					label={ctrl.label}
					added={() => props.ingredientAdded(ctrl.type)}/>
			})}
		</div>
	);
}

export default buildControls;