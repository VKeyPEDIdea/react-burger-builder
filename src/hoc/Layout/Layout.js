import React from 'react';
import Auxiliary from "../Auxiliary/Auxiliary";
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

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
				<Toolbar
					isAuth={this.props.isAuthenticated}
					drawerToggleClicked={this.sideDrawerOpenedHandler}/>
				<SideDrawer
					isAuth={this.props.isAuthenticated}
					closed={this.sideDrawerClosedHandler}
					open={this.state.showSideDrawer}/>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Auxiliary>
		)
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

export default connect(mapStateToProps)(Layout);