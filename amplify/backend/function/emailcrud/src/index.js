'use strict';

const
	awsServerlessExpress = require( 'aws-serverless-express' ),
	app                  = require( './app' ),
	server               = awsServerlessExpress.createServer( app );

exports.handler = ( event, context ) => {
	console.log( `EVENT: ${ JSON.stringify( event ) }` );
	awsServerlessExpress.proxy( server, event, context );
};
