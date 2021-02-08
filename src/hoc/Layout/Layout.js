import React from 'react';
import Auxiliary from "../Auxiliary/Auxiliary";
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends React.Component {
	state = {
		showSideDrawer: false, 
	}

	sideDrawerClosedHandler = () => {
		this.setState({
			showSideDrawer: false,
		})
	}

	sideDrawerOpenedHandler = () => {
		this.setState((prevState) => {
			return {
				showSideDrawer: !prevState.showSideDrawer,
			};
		});
	}

	render() {
		return ( 
			<Auxiliary>
				<Toolbar drawerToggleClicked={this.sideDrawerOpenedHandler}/>
				<SideDrawer
					closed={this.sideDrawerClosedHandler}
					open={this.state.showSideDrawer}/>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Auxiliary>
		)
	}
}

export default Layout;