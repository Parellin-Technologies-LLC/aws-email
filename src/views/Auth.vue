<template>
	<v-container fluid grid-list-xl>
		<v-layout align-start justify-center row fill-height>
			<v-flex xs12 sm8 md6 xl4>
				<sign-in v-if="viewAuthState.showSignIn"></sign-in>
				<forgot-password v-if="viewAuthState.showForgotPassword"></forgot-password>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	import { mapGetters } from 'vuex';
	import { AmplifyEventBus } from 'aws-amplify-vue';
	
	import SignIn from '@/components/Auth/SignIn';
	import ForgotPassword from '@/components/Auth/ForgotPassword';
	
	export default {
		name: 'Auth',
		components: {
			ForgotPassword,
			SignIn
		},
		data() {
			return {
				user: {
					username: null
				},
				error: '',
				logger: {}
			};
		},
		computed: {
			...mapGetters( 'auth', {
				authState: 'getAuthState'
			} ),
			viewAuthState() {
				return {
					showSignIn: this.authState === 'signedOut',
					showSignUp: this.authState === 'signUp',
					showConfirmSignUp: this.authState === 'confirmSignUp',
					showConfirmSignIn: this.authState === 'confirmSignIn',
					showForgotPassword: this.authState === 'forgotPassword',
					showMfa: this.authState === 'setMfa',
					requireNewPassword: this.authState === 'requireNewPassword'
				};
			}
		},
		async mounted() {
			this.logger = new this.$Amplify.Logger( this.$options.name );
			
			AmplifyEventBus.$on( 'localUser', user => {
				this.user                                  = user;
				this.options.signInConfig.username         = this.user.username;
				this.options.confirmSignInConfig.user      = this.user;
				this.options.confirmSignUpConfig.username  = this.user.username;
				this.options.requireNewPasswordConfig.user = this.user;
			} );
		},
		methods: {
			setError( e ) {
				this.logger.error( e.message || e );
			}
		}
	};
</script>
