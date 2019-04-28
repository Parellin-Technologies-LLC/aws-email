export default {
	getAuthState( state ) {
		return state.authState;
	},
	getSignedIn( state ) {
		return state.signedIn;
	},
	getUser( state ) {
		return state.user;
	},
	getIdentityId( state ) {
		return state.identityId;
	}
};
