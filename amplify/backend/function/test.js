/** ****************************************************************************************************
 * File: test.js
 * Project: aws-email
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 26-Apr-2019
 *******************************************************************************************************/
'use strict';

const AWS = require( 'aws-sdk' );

const DDB = new AWS.DynamoDB.DocumentClient( {
	region: 'us-east-1',
	convertEmptyValues: true
} );

( async () => {
	const data = await DDB.query(
		{
			TableName: 'awsemaillist-dev',
			KeyConditionExpression: '#40a6b4 = :40a6b4 AND #ts > :ts',
			FilterExpression: '(#256386 = :256386)',
			ExpressionAttributeNames: {
				'#40a6b4': 'uid',
				'#256386': 'folder',
				'#ts': 'ts'
			},
			ExpressionAttributeValues: {
				':40a6b4': 'us-east-1:666931e7-7504-4630-bb30-89aa9579d4f6',
				':256386': 'inbox',
				':ts': 0
			},
			Limit: 5,
			ScanIndexForward: false,
			ExclusiveStartKey: {
				ts: 1556307437000,
				uid: 'us-east-1:666931e7-7504-4630-bb30-89aa9579d4f6'
			}
		}
	).promise();
	console.log( data );
} )();
