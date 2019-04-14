import { Storage } from 'aws-amplify';

export default {
	async loadEmailConfig( context ) {
		let config = null;

		try {
			config = await Storage.vault.get( 'config.json', { download: true } );
			config = config.Body.toString();
			config = JSON.parse( config );
		} catch( e ) {
			config = { folders: [ 'inbox', 'sent', 'drafts', 'spam', 'trash' ] };
			await Storage.vault.put( 'config.json', JSON.stringify( config ) );
		}

		console.log( config );
	},
	async listFolders( context ) {
		try {
			const session = await Storage.currentSession();
			context.commit( 'setSignedIn', session.isValid() );
		} catch( e ) {
			context.commit( 'setSignedIn', false );
		}
	},
	async currentAuthenticatedUser( context ) {
		try {
			const user = await Auth.currentAuthenticatedUser();
			context.commit( 'setUser', user );
		} catch( e ) {
			context.commit( 'setUser', {} );
		}
	}
};
