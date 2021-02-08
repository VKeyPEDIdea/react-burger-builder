import React from 'react';

import classes from './NavigationItems.module.css';
import NavItem from './NavItem/NavItem';

const navigationItems = props => {
	return(
		<ul className={classes.NavigationItems}>
			<NavItem link='/' active>BurgerBuilder</NavItem>
			<NavItem link='/'>Checkout</NavItem>
		</ul>
	);
}

export default navigationItems;