import React from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends React.Component {
	state = {
		controls: {
			email: {
				elType: 'input',
				elConfig: {
					type: 'email',
					label: 'Email',
					placeholder: 'Email Address'
				},
				value: '',
				validation: {
					required: true,
					isValid: false,
					touched: false,
					isEmail: true,
				},
			},
			password: {
				elType: 'input',
				elConfig: {
					type: 'password',
					label: 'Password',
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 7,
					isValid: false,
					touched: false,
				},
			},
		},
		isSignUp: true,
	};

	componentDidMount() {
		if (!this.props.isBuilding && this.props.authRedirectPath !== '/') {
			this.props.onSetAuthRedirectPath();
		};
	};

	checkValidity(value, rules) {
		let isValid = true;

		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}

		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}

		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
		}

		return isValid;
	}

	switchAuthModeHandler = () => {
		this.setState(prevState => {
			return {isSignUp: !prevState.isSignUp};
		});
	};

	onSubmitHandler(event) {
		event.preventDefault();

		const authMethod = this.state.isSignUp ? 'signUp' : 'signIn';
		this.props.onSubmitHandler(this.state.controls.email.value, this.state.controls.password.value, authMethod);
	}

	inputChangeHandler = (event, controlName) => {
		const updatedControls = {...this.state.controls};
		const updatedElement = { ...updatedControls[controlName] };
		updatedElement.value = event.target.value;
		updatedElement.validation.isValid = this.checkValidity(updatedElement.value, updatedElement.validation);
		updatedElement.validation.touched = true;
		updatedControls[controlName] = updatedElement;
		
		this.setState({controls: {...updatedControls}});
	}
	
	render() {
		let authRedirect = null;
		if (this.props.isAuthenticated) {
			authRedirect = <Redirect to={this.props.authRedirectPath}/>
		};

		let formElementsArray = [];
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key],
			});
		};

		let form = formElementsArray.map(control => {
			return <Input 
				key={control.id}
				shouldValidate={control.config.validation.required}
				touched={control.config.validation.touched}
				isValid={control.config.validation.isValid}
				elType={control.config.elType}
				elConfig={control.config.elConfig}
				label={control.config.elConfig.label}
				value={control.config.value}
				changed={(event) => this.inputChangeHandler(event, control.id)}
			/>
		});

		if (this.props.loading) {
			form = <Spinner />
		};
		
		return (
			<div className={classes.Auth}>
				{authRedirect}
				<h2>{this.state.isSignUp ? 'Sign Up' : 'Sign In'}</h2>
				<form onSubmit={(event) => this.onSubmitHandler(event)}>
					{form}
					<Button	btnType="Success">Submit</Button>
				</form>
				<Button
					clicked={this.switchAuthModeHandler}
					btnType="Danger">Go to Sign {this.state.isSignUp ? 'In' : 'Up'}</Button>
			</div>
		);
	};
};

const mapDispatchToProps = dispatch => {
	return {
		onSubmitHandler: (email, password, method) => dispatch(actions.auth(email, password, method)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/')),
	};
};

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		isAuthenticated: state.auth.token !== null,
		isBuilding: state.burgerBuilder.building,
		authRedirectPath: state.auth.authRedirectPath,
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);