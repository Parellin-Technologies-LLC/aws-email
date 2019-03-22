/** ****************************************************************************************************
 * File: awsamplify.js
 * Project: aws-email
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 21-Mar-2019
 *******************************************************************************************************/

import Vue from 'vue';

import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';
import awsmobile from '../aws-exports';

Amplify.configure( awsmobile );

Vue.use( AmplifyPlugin, AmplifyModules );
