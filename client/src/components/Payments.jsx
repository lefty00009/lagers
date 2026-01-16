import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
	render(){	
		return (
			<StripeCheckout 
			  amount={ 500 }
			  token={ token => this.props.handleToken(token)}
			  stripeKey={import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}
			  name="Survey App"
			  description="$5 for 5 email credits">
			
			<button className="btn">Add Credits</button>
			</StripeCheckout>
		);
	}
};

export default connect(null, actions)(Payments);
