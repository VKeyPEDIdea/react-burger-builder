import React from 'react';

import classes from './Order.module.css';

const order = props => {
	let ingredients = Object.keys(props.ingredients)
		.map(igt => {
			return igt + ' - ' + props.ingredients[igt] + ' / ';
	});

	return(
		<div className={classes.Order}>
				<p>Ingredients: {ingredients}</p>
				<p>Price: <strong>USD {props.price}</strong></p>
		</div>
	);
}

export default order;