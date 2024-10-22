import React from 'react';

import Order from '../../components/Order/Order';
import axios from "../../axios-orders";
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends React.Component {
	componentDidMount() {
		this.props.fetchOrdershandler(this.props.token, this.props.userId);
	}

	getOrderList() {
		return this.props.orders.map(order => {
			return <Order 
				key={order.id}
				ingredients={order.ingredients}
				price={order.price}/>
		});
	}

	render() {
		const orderList = this.props.loading ? <Spinner /> : this.getOrderList();
		return (
			<>
				{orderList}
			</>
		);
	}
}
const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		token: state.auth.token,
		userId: state.auth.userId,
	};
};

const mapDispatchToProps = dispatch => {
	return {
		fetchOrdershandler: (token, userId) => dispatch(actions.fetchOrders(token, userId)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));