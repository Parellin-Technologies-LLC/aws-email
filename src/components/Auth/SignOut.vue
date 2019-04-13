<template>
	<v-btn v-if="signedIn" @click="signOut" flat>
		Sign Out
	</v-btn>
</template>

<script>
	import { mapGetters } from 'vuex';
	import { AmplifyEventBus } from 'aws-amplify-vue';
	
	export default {
		name: 'SignOut',
		data() {
			return {
				logger: {}
			};
		},
		computed: {
			...mapGetters( 'auth', {
				signedIn: 'getSignedIn'
			} )
		},
		async mounted() {
			this.logger = new this.$Amplify.Logger( this.$options.name );
		},
		methods: {
			async signOut() {
				try {
					await this.$Amplify.Auth.signOut();
					this.logger.info( 'sign out success' );
					AmplifyEventBus.$emit( 'authState', 'signedOut' );
				} catch( e ) {
					console.error( e );
				}
			}
		}
	};
</script>
