export default {
	getConfig( state ) {
		return state.config;
	},
	getIsLoading( state ) {
		return state.isLoading;
	},
	getCurrentFolder( state ) {
		return state.currentFolder;
	},
	getLastEvaluatedKey( state ) {
		return state.lastEvaluatedKey;
	},
	getPageLimit( state ) {
		return state.pageLimit;
	},
	getEstimateItemsInFolder( state ) {
		return state.estimateItemsInFolder;
	},
	getEmailHeaders( state ) {
		return state.emailHeaders;
	},
	getEmailData( state ) {
		return state.emailData;
	}
};
