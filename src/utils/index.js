/** ****************************************************************************************************
 * File: index.js
 * Project: aws-email
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 26-Apr-2019
 *******************************************************************************************************/
'use strict';

export function randomHex() {
	return ( Math.random() * 0xFFFFFF << 0 ).toString( 16 );
}
