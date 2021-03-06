import { Storage, API } from 'aws-amplify';
import axios from 'axios';

import { randomHex } from '@/utils';

export default {
	async loadEmailConfig( { commit } ) {
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
					[ 'trash', 'mdi-trash-can-outline' ],
					[ 'archive', 'mdi-package-down' ]
				],
				rules: []
			};

			await Storage.vault.put( 'config.json', JSON.stringify( config ) );
		}

		commit( 'setEmailConfig', config );
	},
	async countItemsInFolder( context, opts = {} ) {
		if( !opts.folder ) {
			opts.folder = context.state.currentFolder;
		}

		const
			id     = randomHex(),
			params = {
				queryStringParameters: {
					FilterExpression: `#${ id } = :${ id }`,
					ExpressionAttributeNames: [ `#${ id }=folder` ],
					ExpressionAttributeValues: [ `:${ id }=${ opts.folder }` ],
					Select: 'COUNT'
				}
			};

		delete opts.folder;

		Object.assign( params.queryStringParameters, opts );

		const data = await API.get(
			context.state.apiName,
			`/email/${ context.rootState.auth.identityId }`,
			params
		);

		context.commit( 'setEstimateItemsInFolder', data.Count );
	},
	async listFolder( context, opts = {} ) {
		// TODO: should probable put `opts` in a state parameter
		try {
			if( !context.rootState.auth.identityId ) {
				return;
			}

			if( !opts.folder ) {
				opts.folder = context.state.currentFolder;
			}

			context.commit( 'setIsLoading', true );
			context.commit( 'setCurrentFolder', opts.folder );

			const
				id     = randomHex(),
				params = {
					queryStringParameters: {
						FilterExpression: `#${ id } = :${ id }`,
						ExpressionAttributeNames: [
							`#${ id }=folder`
						].join( ',' ),
						ExpressionAttributeValues: [
							`:${ id }=${ opts.folder }`
						].join( ',' )
					}
				};

			delete opts.folder;

			if( context.state.pageLimit ) {
				opts.Limit = context.state.pageLimit;
			}

			if( !opts.hasOwnProperty( 'ScanIndexForward' ) ) {
				opts.ScanIndexForward = false;
			}

			if( opts.hasOwnProperty( 'ExclusiveStartKey' ) ) {
				if( Object.keys( opts.ExclusiveStartKey ).length ) {
					opts.ExclusiveStartKey = JSON.stringify( opts.ExclusiveStartKey );
				}
			}

			Object.assign( params.queryStringParameters, opts );

			const data = await API.get(
				context.state.apiName,
				`/email/${ context.rootState.auth.identityId }`,
				params
			);

			context.commit( 'setLastEvaluatedKey', data.LastEvaluatedKey );
			context.commit( 'setEmailData', data.Items );
			context.commit( 'setIsLoading', false );
		} catch( e ) {
			console.log( e );
		}
	},
	clearEmail( { commit } ) {
		commit( 'setOpenEmail', {} );
	},
	async loadEmail( { commit }, email ) {
		const
			url      = await Storage.vault.get( email.id ),
			{ data } = await axios.get( url );

		email.data = data;

		commit( 'setOpenEmail', email );
	},
	async updateEmail( context, body ) {
		try {
			const data = await API.put(
				context.state.apiName,
				'/email',
				{ body }
			);

			console.log( data );
		} catch( e ) {
			console.log( e );
		}
	},
	setComposeEmail( { commit }, show ) {
		console.log( show );
		commit( 'setComposeEmail', show );
	},
	async sendEmail( context, body ) {
		try {
			const data = await API.post(
				context.state.apiName,
				'/email/send',
				{ body }
			);

			console.log( data );
		} catch( e ) {
			console.log( e );
		}
	}
};
