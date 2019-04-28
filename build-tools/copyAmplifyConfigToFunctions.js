/** ****************************************************************************************************
 * File: copyAmplifyConfigToFunctions.js
 * Project: aws-email
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 26-Apr-2019
 *******************************************************************************************************/
'use strict';

const
	{ promises: fs } = require( 'fs' ),
	{ join }         = require( 'path' );

const
	configPath = join(
		process.cwd(),
		'amplify',
		'backend',
		'amplify-meta.json'
	);

const
	destinations = [
		join(
			process.cwd(),
			'amplify',
			'backend',
			'function',
			'formatemail',
			'src',
			'amplify-meta.json'
		)
	];

destinations.forEach(
	async functionPath => await fs.copyFile( configPath, functionPath )
);
