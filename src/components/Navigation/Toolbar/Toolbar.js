import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import NavToggleBtn from '../NavToggleBtn/NavToggleBtn';

import classes from './Toolbar.module.css'

const toolbar = props => {
	return(
		<header className={classes.Toolbar}>
			<NavToggleBtn click={props.drawerToggleClicked}/>
			<Logo height='80%'/>
			<nav className={classes.DesktopOnly}>
				<NavigationItems/>
			</nav>
		</header>
	);
}

export default toolbar;