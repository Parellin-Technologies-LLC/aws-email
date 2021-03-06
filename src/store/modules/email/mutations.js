import moment from 'moment';

export default {
	setEmailConfig( state, config ) {
		state.config = config;
	},
	setIsLoading( state, isLoading ) {
		state.isLoading = isLoading;
	},
	setCurrentFolder( state, folder ) {
		state.currentFolder = folder;
	},
	setLastEvaluatedKey( state, key ) {
		state.lastEvaluatedKey = key;
	},
	setPageLimit( state, limit ) {
		state.pageLimit = limit;
	},
	setEstimateItemsInFolder( state, estimateItemsInFolder ) {
		state.estimateItemsInFolder = estimateItemsInFolder;
	},
	setEmailData( state, emailData ) {
		const
			ref   = moment(),
			today = ref.clone().startOf( 'day' );

		state.emailData = emailData.map(
			email => {
				const ts = moment( email.ts );

				email.timeFrom     = ts.isSame( today, 'd' ) ? ts.fromNow() : ts.format( 'L' );
				email.readableTime = `${ ts.format( 'ddd MMMM Do, YYYY, h:mm:ss a' ) } (${ ts.fromNow() })`;
				email.fromUser     = email.from.replace( /(<.*>)/i, '' ).trim();

				return email;
			}
		);
	},
	setOpenEmail( state, email ) {
		state.openEmail = email;
	},
	setComposeEmail( state, show ) {
		state.showComposeEmail = show;
	}
};
