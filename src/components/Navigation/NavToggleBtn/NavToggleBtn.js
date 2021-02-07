import React from 'react';

import classes from './NavToggleBtn.module.css';

const navToggleBtn = props => {
	return(
		<div
			className={classes.NavToggleBtn}
			onClick={props.click}>
				<div></div>
				<div></div>
				<div></div>
			</div>
	);
}

export default navToggleBtn;