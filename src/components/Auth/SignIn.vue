<template>
	<v-card class="elevation-1">
		
		<v-toolbar dark color="success">
			<v-toolbar-title>Sign In</v-toolbar-title>
		</v-toolbar>
		
		<v-card-text>
			<v-form ref="form" lazy-validation>
				
				<UsernameField
					v-model="username"
					:onKeyupEnter="signIn"/>
				
				<PasswordField
					v-model="password"
					:onKeyupEnter="signIn"/>
			
			</v-form>
		</v-card-text>
		
		<v-card-actions>
			<v-flex xs12>
				<v-layout align-end justify-end fill-height>
					
					<v-btn color="warning" @click="forgot">
						Reset password
					</v-btn>
					
					<v-btn color="success" @click="signIn">
						Sign In
					</v-btn>
				
				</v-layout>
			</v-flex>
		</v-card-actions>
		
		<v-alert
			v-if="error"
			type="error"
			icon="warning"
			:value="true"
			transition="slide-y-transition">
			{{ error }}
		</v-alert>
	
	</v-card>
</template>

<script>
	import { AmplifyEventBus } from 'aws-amplify-vue';
	import UsernameField from '@/components/Auth/UsernameField';
	import PasswordField from '@/components/Auth/PasswordField';
	
	// TODO: replace the v-alert in this component with NotificationBar
	export default {
		name: 'SignIn',
		components: { UsernameField, PasswordField },
		data() {
			return {
				username: '',
				password: '',
				error: '',
				logger: {}
			};
		},
		mounted() {
			this.logger = new this.$Amplify.Logger( this.$options.name );
		},
		methods: {
			async signIn() {
				if( !this.$refs.form.validate() ) {
					return;
				}
				
				try {
					const data = await this.$Amplify.Auth
						.signIn( this.username, this.password );
					
					this.logger.info( 'sign in success' );
					
					if( data.challengeName === 'SMS_MFA' || data.challengeName === 'SOFTWARE_TOKEN_MFA' ) {
						AmplifyEventBus.$emit( 'localUser', data );
						return AmplifyEventBus.$emit( 'authState', 'confirmSignIn' );
					} else if( data.challengeName === 'NEW_PASSWORD_REQUIRED' ) {
						AmplifyEventBus.$emit( 'localUser', data );
						return AmplifyEventBus.$emit( 'authState', 'requireNewPassword' );
					} else if( data.challengeName === 'MFA_SETUP' ) {
						AmplifyEventBus.$emit( 'localUser', data );
						return AmplifyEventBus.$emit( 'authState', 'setMfa' );
					} else {
						return AmplifyEventBus.$emit( 'authState', 'signedIn' );
					}
				} catch( e ) {
					if( e.code && e.code === 'UserNotConfirmedException' ) {
						AmplifyEventBus.$emit( 'localUser', { username: this.username } );
						AmplifyEventBus.$emit( 'authState', 'confirmSignUp' );
					} else {
						this.setError( e );
					}
				}
			},
			forgot() {
				AmplifyEventBus.$emit( 'authState', 'forgotPassword' );
			},
			setError( e ) {
				this.error = this.$Amplify.I18n.get( e.message || e );
				this.logger.error( this.error );
			}
		}
	};
</script>
