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
				],
				rules: []
			};

			await Storage.vault.put( 'config.json', JSON.stringify( config ) );
		}

		context.commit( 'setEmailConfig', config );
	},
	async listFolder( context, folder ) {
		try {
			// TODO:: change this to function call - must list from DDB
			console.log( folder );
			const data = await Storage.vault.list( folder );
			console.log( data );
		} catch( e ) {
			console.log( e );
		}
	}
};
