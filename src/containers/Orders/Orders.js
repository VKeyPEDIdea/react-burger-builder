import React from 'react';

import Order from '../../components/Order/Order';
import axios from "../../axios-orders";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends React.Component {
	state = {
		orders: null,
		loading: true,
	}

	componentDidMount() {
		axios.get('/orders.json')
			.then(response => {
				const fetchedOrders = [];
				for (let key in response.data) {
					fetchedOrders.push({
						id: key,
						...response.data[key],
					})
				}
				this.setState({
					orders: fetchedOrders,
					loading: false,
				});
			})
			.catch(error => {
				this.setState({
					loading: false,
				})
				console.log(error)
			});
	}

	render() {
		let orders = null;
		if (this.state.orders) {
			orders = this.state.orders.map(order => {
				return <Order 
					key={order.id}
					ingredients={order.ingredients}
					price={order.price}/>
			});
		}

		return (
			<>
				{orders}
			</>
		);
	}
}

export default withErrorHandler(Orders, axios);