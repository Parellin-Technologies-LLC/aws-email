import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

// import Amplify, * as AmplifyModules from 'aws-amplify';
// import { AmplifyPlugin } from 'aws-amplify-vue';
// import awsmobile from './aws-exports';
//
// Amplify.configure( awsmobile );
//
// Vue.use( AmplifyPlugin, AmplifyModules );

// It's important that you instantiate the Vue instance after calling Vue.use!

new Vue( {
	render: h => h( App )
} ).$mount( '#app' );
