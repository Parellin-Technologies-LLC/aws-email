<template>
	<div class="auth">
		<sign-in v-if="authState.showSignIn"></sign-in>
		<forgot-password v-if="authState.showForgotPassword"></forgot-password>
	</div>
</template>

<script>
	import { AmplifyEventBus } from 'aws-amplify-vue';
	
	import SignIn from '@/components/Auth/SignIn';
	import ForgotPassword from '@/components/Auth/ForgotPassword';
	
	import GetUser from '@/utils/GetUser';
	
	export default {
		name: 'auth',
		components: {
			ForgotPassword,
			SignIn
		},
		data() {
			return {
				user: {
					username: null
				},
				authState: {},
				error: '',
				logger: {}
			};
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
			
			AmplifyEventBus.$on( 'authState', data => {
				this.authState = this.updateAuthState( data );
			} );
			
			try {
				const val = await GetUser( this.$Amplify );
				
				if( val instanceof Error ) {
					this.authState = this.updateAuthState( 'signedOut' );
				} else {
					this.user      = val;
					this.authState = this.updateAuthState( 'signedIn' );
				}
			} catch( e ) {
				this.setError( e );
			}
		},
		methods: {
			updateAuthState( state ) {
				return {
					showSignIn: state === 'signedOut',
					showSignUp: state === 'signUp',
					showConfirmSignUp: state === 'confirmSignUp',
					showConfirmSignIn: state === 'confirmSignIn',
					showForgotPassword: state === 'forgotPassword',
					showSignOut: state === 'signedIn',
					showMfa: state === 'setMfa',
					requireNewPassword: state === 'requireNewPassword'
				};
			},
			setError( e ) {
				this.error = this.$Amplify.I18n.get( e.message || e );
				this.logger.error( this.error );
			}
		}
	};
</script>

<style lang="scss">
	.auth {
		margin: 0 auto;
		width: 460px;
	}
</style>
