<template>
	<v-app>
		
		<Toolbar/>
		
		<v-content>
			<router-view></router-view>
		</v-content>
	
	</v-app>
</template>

<script>
	import { AmplifyEventBus } from 'aws-amplify-vue';
	import { Auth } from 'aws-amplify';
	
	import SignOut from '@/components/Auth/SignOut';
	import Toolbar from '@/components/Toolbar';
	
	export default {
		name: 'App',
		components: { Toolbar, SignOut },
		data() {
			return {
				user: {},
				signedIn: false
			};
		},
		async beforeCreate() {
			AmplifyEventBus.$on( 'authState', info => {
				this.setAuthState( info === 'signedIn' );
				
				if( info === 'signedIn' ) {
					this.$router.push( '/' );
				} else if( info === 'signedOut' ) {
					this.$router.push( '/auth' );
				}
			} );
			
			try {
				const user = await Auth.currentAuthenticatedUser();
				this.setUser( user );
				this.setAuthState( true );
			} catch( e ) {
				this.setAuthState( false );
			}
			
			console.log( this.$store );
		},
		methods: {
			setAuthState( state ) {
				console.log( state );
				
				this.$store.state.signedIn = state;
			},
			setUser( user ) {
				this.$store.state.user = user;
			}
		}
	};
</script>

<style lang="scss">
	@import '@/styles/index.scss';
	
	.nav {
		display: flex;
	}
	
	.nav p {
		padding: 0px 30px 0px 0px;
		font-size: 18px;
		color: #000;
	}
	
	.nav p:hover {
		opacity: .7;
	}
	
	.nav p a {
		text-decoration: none;
	}
	
	.sign-out {
		width: 160px;
		margin: 0 auto;
	}
</style>
