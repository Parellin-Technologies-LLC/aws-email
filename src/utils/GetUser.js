/** ****************************************************************************************************
 * File: GetUser.js
 * Project: aws-email
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 22-Mar-2019
 *******************************************************************************************************/
'use strict';

async function GetUser( amplify ) {
	try {
		return await amplify.Auth.currentAuthenticatedUser();
	} catch( e ) {
		return new Error( e );
	}
}

export default GetUser;
