<template>
	<v-app>
		<v-toolbar app>
			<v-toolbar-title class="headline">
				<span class="font-weight-light">Email</span>
			</v-toolbar-title>
			<v-spacer></v-spacer>
			<SignOut/>
		</v-toolbar>
		
		<v-content>
			<div class='nav'>
				<router-link tag="p" to="/">
					<a>Home</a>
				</router-link>
				<router-link tag="p" to="/profile">
					<a>Profile</a>
				</router-link>
				<router-link tag="p" to="/protected" v-if="signedIn">
					<a>Protected</a>
				</router-link>
				<router-link tag="p" to="/auth" v-if="!signedIn">
					<a>Sign Up / Sign In</a>
				</router-link>
			</div>
			<router-view></router-view>
		</v-content>
	
	</v-app>
</template>

<script>
	import { AmplifyEventBus } from 'aws-amplify-vue';
	import { Auth } from 'aws-amplify';
	
	import SignOut from '@/components/Auth/SignOut';
	
	export default {
		name: 'app',
		components: { SignOut },
		data() {
			return {
				signedIn: false
			};
		},
		beforeCreate() {
			AmplifyEventBus.$on( 'authState', info => {
				if( info === 'signedIn' ) {
					this.signedIn = true;
					this.$router.push( '/profile' );
				}
				if( info === 'signedOut' ) {
					this.$router.push( '/auth' );
					this.signedIn = false;
				}
			} );
			
			Auth.currentAuthenticatedUser()
				.then( user => {
					console.log( user );
					this.signedIn = true;
				} )
				.catch( () => this.signedIn = false );
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
