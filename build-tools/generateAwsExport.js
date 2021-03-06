/** ****************************************************************************************************
 * File: generateAwsExport.js
 * Project: aws-email
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 16-Mar-2019
 *******************************************************************************************************/

const
	{ writeFileSync } = require( 'fs' ),
	{ join }          = require( 'path' );

// const awsmobile = {
// aws_project_region: process.env.project_region || '',
// aws_cognito_identity_pool_id: process.env.cognito_identity_pool_id || '',
// aws_cognito_region: process.env.cognito_region || '',
// aws_user_pools_id: process.env.user_pools_id || '',
// aws_user_pools_web_client_id: process.env.user_pools_web_client_id || '',
// aws_content_delivery_bucket: process.env.content_delivery_bucket || '',
// aws_content_delivery_bucket_region: process.env.content_delivery_bucket_region || '',
// aws_content_delivery_url: process.env.content_delivery_url || ''
// };

const
	dir    = join( process.cwd(), 'src', 'aws-exports.js' ),
	config = JSON.parse( process.env.project_aws_exports ),
	data   = `export default ${ JSON.stringify( config, null, 4 ) }`;

writeFileSync( dir, data );
