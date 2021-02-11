import React from 'react';
import Burger from '../../Burger/Burger';

import classes from './CheckoutSummary.module.css';
import Button from "../../UI/Button/Button";
import { Link } from 'react-router-dom';

const checkoutSummary = props => {
	return(
		<div className={classes.CheckoutSummary}>
			<h1>We hope it taste well!</h1>
			<div style={{width: '100%', margin: 'auto'}}>
				<Burger ingredients={props.ingredients}/>
				<Link to='/'>
					<Button
						btnType='Danger'
						onClick>Cancel</Button>
				</Link>
				<Button
					btnType='Success'
					onClick>Apply</Button>
			</div>
		</div>
	);
}

export default checkoutSummary;