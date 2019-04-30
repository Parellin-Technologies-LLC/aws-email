export default {
	setPackage( state, npmPackage ) {
		npmPackage.repository.url = npmPackage.repository.url
			.replace( /git\+/, '' )
			.replace( /\.git/, '' );

		state.npmPackage          = npmPackage;
	},
	toggleSidebar( state ) {
		state.sidebarOpen = !state.sidebarOpen;
	}
};
