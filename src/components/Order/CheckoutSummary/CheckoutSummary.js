import React from 'react';
import Burger from '../../Burger/Burger';

import classes from './CheckoutSummary.module.css';
import Button from "../../UI/Button/Button";

const checkoutSummary = props => {
	return(
		<div className={classes.CheckoutSummary}>
			<h1>We hope it taste well!</h1>
			<div style={{width: '100%', margin: 'auto'}}>
				<Burger ingredients={props.ingredients}/>
				<Button
					btnType='Danger'
					clicked={props.onCheckoutCanceled}>Cancel</Button>
				<Button
					btnType='Success'
					clicked={props.onCheckoutContinued}>Apply</Button>
			</div>
		</div>
	);
}

export default checkoutSummary;