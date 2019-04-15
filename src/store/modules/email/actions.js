import { Storage } from 'aws-amplify';

export default {
	async loadEmailConfig( context ) {
		let config = null;

		try {
			config = await Storage.vault.get( 'config.json', { download: true } );
			config = config.Body.toString();
			config = JSON.parse( config );
		} catch( e ) {
			config = {
				folder: [
					[ 'inbox', 'inbox' ],
					[ 'sent', 'mdi-arrow-right' ],
					[ 'drafts', 'mdi-file-document-edit-outline' ],
					[ 'spam', 'mdi-alert-circle' ],
					[ 'trash', 'mdi-trash-can-outline' ]
				]
			};

			await Storage.vault.put( 'config.json', JSON.stringify( config ) );
		}

		context.commit( 'setEmailConfig', config );
	},
	async listFolder( context ) {
		try {

		} catch( e ) {
			context.commit( 'setSignedIn', false );
		}
	}
};
