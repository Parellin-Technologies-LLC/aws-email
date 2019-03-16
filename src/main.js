import Vue from 'vue';
import Amplify, * as AmplifyModules from 'aws-amplify';
import { AmplifyPlugin } from 'aws-amplify-vue';
import awsmobile from './aws-exports';

Amplify.configure( awsmobile );

Vue.use( AmplifyPlugin, AmplifyModules );

Vue.config.productionTip = false;

import 'babel-polyfill';

// Components
import './components';

// Plugins
import './plugins';

// Sync router with store
import { sync } from 'vuex-router-sync';

// Application imports
import App from './App';
import i18n from '@/i18n';
import router from '@/router';
import store from '@/store';

// Sync store with router
sync( store, router );

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue( {
	i18n,
	router,
	store,
	render: h => h( App )
} ).$mount( '#app' );


// new Vue( {
// 	render: h => h( App )
// } ).$mount( '#app' );
