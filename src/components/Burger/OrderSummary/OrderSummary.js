import React from 'react';

import Button from '../../UI/Button/Button';

const orderSummary = props => {
	const ingredientSummary = Object.keys(props.ingredients)
		.map(item => {
			return(
				<li key={item + 'order'}>
					<span style={{textTransform: 'capitalize'}}>{item}</span>: {props.ingredients[item]}
				</li>
			);
		});

	return(
		<>
			<h3>Yout order</h3>
			<p>A delicious burger with the following ingredients:</p>
			<ul>
				{ingredientSummary}
			</ul>
			<p><strong>Total Price: {props.price}</strong></p>
			<p>Continue to checkout?</p>
			<Button
				btnType='Danger'
				clicked={props.purchaseCancelled}>CANCEL</Button>
			<Button
				btnType='Success'
				clicked={props.purchaseContnuied}>CONTINUE</Button>
		</>
	);
}

export default orderSummary;