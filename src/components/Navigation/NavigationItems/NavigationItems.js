import React from 'react';

import classes from './NavigationItems.module.css';
import NavItem from './NavItem/NavItem';

const navigationItems = props => {
	return(
		<ul className={classes.NavigationItems}>
			<NavItem link='/' exact>BurgerBuilder</NavItem>
			{props.isAuthenticated
				? <NavItem link='/orders'>Orders</NavItem>
				: null }
			{props.isAuthenticated
				? <NavItem link='/logout'>LogOut</NavItem>
				: <NavItem link='/auth'>Log In</NavItem>}
		</ul>
	);
}

export default navigationItems;