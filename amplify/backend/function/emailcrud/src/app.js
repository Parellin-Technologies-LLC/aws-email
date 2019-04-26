'use strict';

const
	AWS                            = require( 'aws-sdk' ),
	awsServerlessExpressMiddleware = require( 'aws-serverless-express/middleware' ),
	bodyParser                     = require( 'body-parser' ),
	express                        = require( 'express' );

const
	QueryBuilder = require( './QueryBuilder' );

AWS.config.update( { region: process.env.TABLE_REGION } );

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = 'awsemaillist';
if( process.env.ENV && process.env.ENV !== 'NONE' ) {
	tableName = tableName + '-' + process.env.ENV;
}

// TODO: update in case is required to use that definition
const userIdPresent    = false;
const partitionKeyName = 'uid';
const partitionKeyType = 'S';
const sortKeyName      = 'ts';
const sortKeyType      = 'N';
const hasSortKey       = sortKeyName !== '';
const path             = '/email';
const UNAUTH           = 'UNAUTH';
const hashKeyPath      = '/:' + partitionKeyName;
const sortKeyPath      = hasSortKey ? '/:' + sortKeyName : '';

// declare a new express app
const app = express();

app.use( bodyParser.json() );
app.use( awsServerlessExpressMiddleware.eventContext() );

// Enable CORS for all methods
app.use( function( req, res, next ) {
	res.header( 'Access-Control-Allow-Origin', '*' );
	res.header( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );
	next();
} );

// convert url string param to expected Type
const convertUrlType = ( param, type ) => {
	if( type === 'N' ) {
		return Number.parseInt( param );
	} else {
		return param;
	}
};

const randomHex = () => {
	return ( Math.random() * 0xFFFFFF << 0 ).toString( 16 );
};

/********************************
 * HTTP Get method for list objects *
 ********************************/

app.get( path + hashKeyPath, function( req, res ) {
	const query = {
		TableName: tableName,
		KeyConditionExpression: '',
		ExpressionAttributeNames: {},
		ExpressionAttributeValues: {}
	};

	const
		id  = randomHex(),
		idK = `#${ id }`,
		idV = `:${ id }`;

	if( userIdPresent && req.apiGateway ) {
		const
			{ cognitoIdentityId } = req.apiGateway.event.requestContext.identity;

		query.KeyConditionExpression           = `${ idK } = ${ idV }`;
		query.ExpressionAttributeNames[ idK ]  = partitionKeyName;
		query.ExpressionAttributeValues[ idV ] = cognitoIdentityId || UNAUTH;
	} else {
		try {
			query.KeyConditionExpression           = `${ idK } = ${ idV }`;
			query.ExpressionAttributeNames[ idK ]  = partitionKeyName;
			query.ExpressionAttributeValues[ idV ] = convertUrlType( req.params[ partitionKeyName ], partitionKeyType );
		} catch( err ) {
			res.statusCode = 500;
			res.json( { error: 'Wrong column type ' + err } );
		}
	}

	const params = req.apiGateway.event.queryStringParameters;

	if( params.hasOwnProperty( 'Limit' ) ) {
		query.Limit = params.Limit;
	}

	if( params.hasOwnProperty( 'ExclusiveStartKey' ) && params.ExclusiveStartKey ) {
		query.ExclusiveStartKey = JSON.parse( params.ExclusiveStartKey );
	}

	if( params.hasOwnProperty( 'ScanIndexForward' ) && params.ScanIndexForward ) {
		query.ScanIndexForward = params.ScanIndexForward;
	}

	if( params.hasOwnProperty( 'Select' ) && params.Select ) {
		query.Select = params.Select;
	}

	if( params.hasOwnProperty( 'FilterExpression' ) ) {
		query.FilterExpression = `${ params.FilterExpression }`;
	}

	if( params.hasOwnProperty( 'ExpressionAttributeNames' ) ) {
		params.ExpressionAttributeNames = params.ExpressionAttributeNames.split( ',' );
		params.ExpressionAttributeNames.forEach(
			val => {
				val = val.split( '=' );

				query.ExpressionAttributeNames[ val[ 0 ] ] = val[ 1 ];
			}
		);
	}

	if( params.hasOwnProperty( 'ExpressionAttributeValues' ) ) {
		params.ExpressionAttributeValues = params.ExpressionAttributeValues.split( ',' );
		params.ExpressionAttributeValues.forEach(
			val => {
				val = val.split( '=' );

				query.ExpressionAttributeValues[ val[ 0 ] ] = val[ 1 ];
			}
		);
	}

	// TODO:: add time filters
	// if( !Object.values( query.ExpressionAttributeNames ).includes( sortKeyName ) ) {
	// 	query.KeyConditionExpression += ` AND #${ sortKeyName } > :${ sortKeyName }`;
	// 	query.ExpressionAttributeNames[ `#${ sortKeyName }` ]  = sortKeyName;
	// 	query.ExpressionAttributeValues[ `:${ sortKeyName }` ] = 0;
	// }

	dynamodb.query( query, ( err, data ) => {
		if( err ) {
			res.statusCode = 500;
			res.json( { error: 'Could not load items: ' + err } );
		} else {
			res.json( data );
		}
	} );
} );

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

app.get( path + '/object' + hashKeyPath + sortKeyPath, function( req, res ) {
	const params = {};

	if( userIdPresent && req.apiGateway ) {
		params[ partitionKeyName ] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
	} else {
		params[ partitionKeyName ] = req.params[ partitionKeyName ];

		try {
			params[ partitionKeyName ] = convertUrlType( req.params[ partitionKeyName ], partitionKeyType );
		} catch( err ) {
			res.statusCode = 500;
			res.json( { error: 'Wrong column type ' + err } );
		}
	}

	if( hasSortKey ) {
		try {
			params[ sortKeyName ] = convertUrlType( req.params[ sortKeyName ], sortKeyType );
		} catch( err ) {
			res.statusCode = 500;
			res.json( { error: 'Wrong column type ' + err } );
		}
	}

	const getItemParams = {
		TableName: tableName,
		Key: params
	};

	dynamodb.get( getItemParams, ( err, data ) => {
		if( err ) {
			res.statusCode = 500;
			res.json( { error: 'Could not load items: ' + err.message } );
		} else {
			if( data.Item ) {
				res.json( data.Item );
			} else {
				res.json( data );
			}
		}
	} );
} );


/************************************
 * HTTP put method for insert object *
 *************************************/

app.put( path, function( req, res ) {

	if( userIdPresent ) {
		req.body[ 'userId' ] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
	}

	const putItemParams = {
		TableName: tableName,
		Item: req.body
	};

	dynamodb.put( putItemParams, ( err, data ) => {
		if( err ) {
			res.statusCode = 500;
			res.json( { error: err, url: req.url, body: req.body } );
		} else {
			res.json( { success: 'put call succeed!', url: req.url, data: data } );
		}
	} );
} );

/************************************
 * HTTP post method for insert object *
 *************************************/

app.post( path, function( req, res ) {

	if( userIdPresent ) {
		req.body[ 'userId' ] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
	}

	const putItemParams = {
		TableName: tableName,
		Item: req.body
	};

	dynamodb.put( putItemParams, ( err, data ) => {
		if( err ) {
			res.statusCode = 500;
			res.json( { error: err, url: req.url, body: req.body } );
		} else {
			res.json( { success: 'post call succeed!', url: req.url, data: data } );
		}
	} );
} );

/**************************************
 * HTTP remove method to delete object *
 ***************************************/

app.delete( path + '/object' + hashKeyPath + sortKeyPath, function( req, res ) {
	const params = {};

	if( userIdPresent && req.apiGateway ) {
		params[ partitionKeyName ] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
	} else {
		params[ partitionKeyName ] = req.params[ partitionKeyName ];
		try {
			params[ partitionKeyName ] = convertUrlType( req.params[ partitionKeyName ], partitionKeyType );
		} catch( err ) {
			res.statusCode = 500;
			res.json( { error: 'Wrong column type ' + err } );
		}
	}

	if( hasSortKey ) {
		try {
			params[ sortKeyName ] = convertUrlType( req.params[ sortKeyName ], sortKeyType );
		} catch( err ) {
			res.statusCode = 500;
			res.json( { error: 'Wrong column type ' + err } );
		}
	}

	let removeItemParams = {
		TableName: tableName,
		Key: params
	};

	dynamodb.delete( removeItemParams, ( err, data ) => {
		if( err ) {
			res.statusCode = 500;
			res.json( { error: err, url: req.url } );
		} else {
			res.json( { url: req.url, data: data } );
		}
	} );
} );

app.listen( 3000, function() {
	console.log( 'App started' );
} );

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
