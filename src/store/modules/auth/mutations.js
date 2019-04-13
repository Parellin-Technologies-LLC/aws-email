export default {
	setAuthState( state, authState ) {
		state.authState = authState;
	},
	setSignedIn( state, signedIn ) {
		console.log( 'setSignedIn' );
		state.signedIn = signedIn;
	},
	setUser( state, user ) {
		state.user = user;
	}
};
