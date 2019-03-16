import Vue from 'vue';

import 'babel-polyfill';
import './plugins/vuetify';

Vue.config.productionTip = false;

import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';
import awsmobile from './aws-exports';

Amplify.configure( awsmobile );

Vue.use( AmplifyPlugin, AmplifyModules );

import App from './App.vue';

new Vue( {
	render: h => h( App )
} ).$mount( '#app' );
