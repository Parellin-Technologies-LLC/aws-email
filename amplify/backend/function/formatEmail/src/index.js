'use strict';

const
	AWS              = require( 'aws-sdk' ),
	S3               = new AWS.S3(),
	DDB              = new AWS.DynamoDB.DocumentClient( { region: 'us-east-1' } ),
	COG              = new AWS.CognitoIdentityServiceProvider( { region: 'us-east-1' } ),
	{ simpleParser } = require( 'mailparser' );

exports.handler = async ( event, context ) => {
	try {
		const
			s3obj        = {
				Bucket: event.Records[ 0 ].s3.bucket.name,
				Key: decodeURIComponent( event.Records[ 0 ].s3.object.key )
			},
			raweml       = await S3.getObject( s3obj ).promise(),
			rawBody      = raweml.Body.toString(),
			eml          = await simpleParser( rawBody ),
			emailAddress = eml.to.text,
			userList     = await COG.listUsers( {
				Filter: `email = "${ emailAddress }"`,
				UserPoolId: 'us-east-1_pstEAjbvq'
			} ).promise();

		if( !userList.Users.length ) {
			return context.done( 'User does not exist' );
		} else if( userList.Users.length > 1 ) {
			return context.done( 'Serious problem, two users with the same email!' );
		}

		const
			{ Value: uid } = userList.Users[ 0 ]
				.Attributes
				.filter( ( { Name } ) => Name === 'custom:identityId' )[ 0 ],
			keyId          = s3obj.Key.split( '/' ).pop(),
			Item           = {
				uid,
				ts: +eml.date,
				id: keyId,
				read: false,
				deleted: false,
				to: eml.to.text,
				from: eml.from.text,
				subject: eml.subject,
				folder: 'inbox',
				key: `private/${ uid }/${ keyId }`
			};

		await S3.putObject( {
			Bucket: 'email-system-storage',
			ContentType: 'application/json',
			Key: Item.key,
			Body: JSON.stringify( eml )
		} ).promise();

		await DDB.put( {
			TableName: 'emailIndexList',
			Item
		} ).promise();

		context.done( null, 'Complete' );
	} catch( e ) {
		context.done( e );
	}
};
