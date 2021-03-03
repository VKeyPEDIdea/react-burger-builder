import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from './containers/Auth/Auth';
import Logout from "./containers/Auth/Logout/Logout";
import { connect } from 'react-redux';
import * as actions from './store/actions/';

class App extends React.Component {
	componentDidMount() {
		this.props.onTryAutoSignIn();
	}

	render() {
		let routes = (
			<Switch>
				<Route path='/auth' component={Auth} />
				<Route path='/' exact component={BurgerBuilder}/>
				<Redirect to='/'/>
			</Switch>
		);

		if (this.props.isAuthenticated) {
			routes = (
				<Switch>
					<Route path='/checkout' component={Checkout}/>
					<Route path='/orders' component={Orders} />
					<Route path='/logout' component={Logout} />
					<Route path='/' exact component={BurgerBuilder}/>
					<Redirect to='/'/>
				</Switch>
			);
		}
		return (
			<div className='App'>
				<BrowserRouter>
					<Layout>
						{routes}
					</Layout>
				</BrowserRouter>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuthenticated: state.auth.token !== null,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onTryAutoSignIn: () => dispatch(actions.authCheckState()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
