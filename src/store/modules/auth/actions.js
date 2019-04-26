import { Auth } from 'aws-amplify';

export default {
	authState( context, authState ) {
		console.log( 'setting authState:', authState );
		if( authState === 'signedOut' ) {
			context.commit( 'setSignedIn', false );
		} else if( authState === 'signedIn' ) {
			context.commit( 'setSignedIn', true );
		}

		context.commit( 'setAuthState', authState );
	},
	async currentSession( context ) {
		try {
			const session = await Auth.currentSession();
			context.commit( 'setSignedIn', session.isValid() );
		} catch( e ) {
			context.commit( 'setSignedIn', false );
		}
	},
	async currentAuthenticatedUser( context ) {
		try {
			const
				user           = await Auth.currentAuthenticatedUser(),
				IdentityPoolID = Auth._config.aws_cognito_identity_pool_id,
				identityId     = user.storage[ `aws.cognito.identity-id.${ IdentityPoolID }` ];

			if( !user.attributes.hasOwnProperty( 'custom:identity_id' ) ) {
				await Auth.updateUserAttributes( user, {
					'custom:identity_id': identityId
				} );
			}

			context.commit( 'setIdentityId', identityId );
			context.commit( 'setUser', user );
		} catch( e ) {
			context.commit( 'setUser', {} );
		}
	}
};
