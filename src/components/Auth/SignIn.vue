<template>
	<v-content>
		<v-flex xs12 sm12 md12>
			<v-card class="elevation-1">
				
				<v-toolbar dark color="success">
					<v-toolbar-title>{{ options.header }}</v-toolbar-title>
					<v-spacer></v-spacer>
				</v-toolbar>
				
				<v-card-text>
					<v-form>
						<v-text-field
							prepend-icon="mdi-account"
							type="text"
							name="username"
							label="Username"
							color="success"
							v-model="options.username"
							v-on:keyup.enter="signIn"
							autofocus>
						</v-text-field>
						
						<v-text-field
							id="password"
							prepend-icon="mdi-lock"
							type="password"
							name="password"
							label="Password"
							color="success"
							v-model="password"
							v-on:keyup.enter="signIn">
						</v-text-field>
					</v-form>
				</v-card-text>
				
				<v-card-actions>
					<v-spacer></v-spacer>
					
					<v-btn color="warning mr-1" @click="forgot">
						Reset password
					</v-btn>
					
					<v-btn color="success" @click="signIn">
						Sign In
					</v-btn>
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
		</v-flex>
	</v-content>
</template>

<script>
	import { AmplifyEventBus } from 'aws-amplify-vue';
	
	export default {
		name: 'SignIn',
		data() {
			return {
				password: '',
				error: '',
				logger: {}
			};
		},
		computed: {
			options() {
				return {
					header: 'Sign In',
					username: ''
				};
			}
		},
		mounted() {
			this.logger = new this.$Amplify.Logger( this.$options.name );
		},
		methods: {
			async signIn( event ) {
				try {
					const data = await this.$Amplify
						.Auth
						.signIn( this.options.username, this.password );
					
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
						AmplifyEventBus.$emit( 'localUser', { username: this.options.username } );
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
