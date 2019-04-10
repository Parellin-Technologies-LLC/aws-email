// Lib imports
import Vue from 'vue';
import Meta from 'vue-meta';
import Router from 'vue-router';

// Routes
import paths from './paths';

function route( path, view, name ) {
	return {
		name: name || view,
		path,
		component: async () => await import( `@/views/${ view }.vue` )
	};
}

Vue.use( Meta );
Vue.use( Router );

// Create a new router
const router = new Router( {
	mode: 'history',
	routes: paths
		.map( path => route( path.path, path.view, path.name ) )
		.concat( [ { path: '*', redirect: '/' } ] ),
	scrollBehavior( to, from, savedPosition ) {
		if( savedPosition ) {
			return savedPosition;
		} else if( to.hash ) {
			return { selector: to.hash };
		} else {
			return { x: 0, y: 0 };
		}
	},
	beforeResolve( to, from, next ) {
		console.log( to, from );
		if( to.matched.some( record => record.meta.requiresAuth ) ) {
			let user;
			
			Vue.prototype.$Amplify.Auth.currentAuthenticatedUser()
				.then( data => {
					if( data && data.signInUserSession ) {
						user = data;
					}
					
					console.log( user );
					
					next();
				} )
				.catch( e => {
					console.log( e );
					next( { path: '/auth' } );
				} );
		}
		
		next();
	}
} );

export default router;
