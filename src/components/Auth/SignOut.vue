<template>
	<v-btn v-if="signedIn" @click="signOut" flat>
		{{ options.signOutButton }}
	</v-btn>
</template>

<script>
	import { AmplifyEventBus } from 'aws-amplify-vue';
	import { Auth } from 'aws-amplify';
	
	export default {
		name: 'SignOut',
		data() {
			return {
				signedIn: false,
				logger: {}
			};
		},
		beforeCreate() {
			Auth.currentAuthenticatedUser()
				.then( () => this.signedIn = true )
				.catch( () => this.signedIn = false );
		},
		computed: {
			options() {
				return {
					signOutButton: this.$Amplify.I18n.get( 'Sign Out' )
				};
			}
		},
		async mounted() {
			this.logger = new this.$Amplify.Logger( this.$options.name );
		},
		methods: {
			async signOut( event ) {
				try {
					await this.$Amplify.Auth.signOut();
					this.signedIn = false;
					this.logger.info( 'sign out success' );
					return AmplifyEventBus.$emit( 'authState', 'signedOut' );
				} catch( e ) {
					console.error( e );
				}
			}
		}
	};
</script>
