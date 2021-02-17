import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

class App extends React.Component {
	render() {
		return (
			<div className='App'>
				<BrowserRouter>
					<Layout>
						<Switch>
							<Route path='/checkout' component={Checkout}/>
							<Route path='/' exact component={BurgerBuilder}/>
							<Route path='/orders' component={Orders} />
						</Switch>
					</Layout>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
