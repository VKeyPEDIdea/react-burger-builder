import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from './containers/Auth/Auth';
import Logout from "./containers/Auth/Logout/Logout";

class App extends React.Component {
	render() {
		return (
			<div className='App'>
				<BrowserRouter>
					<Layout>
						<Switch>
							<Route path='/checkout' component={Checkout}/>
							<Route path='/orders' component={Orders} />
							<Route path='/auth' component={Auth} />
							<Route path='/logout' component={Logout} />
							<Route path='/' exact component={BurgerBuilder}/>
						</Switch>
					</Layout>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
