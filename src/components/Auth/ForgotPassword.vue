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
							v-model="username"
							v-on:keyup.enter="signIn"
							autofocus>
						</v-text-field>
						
						<v-text-field
							v-if="sent"
							prepend-icon="mdi-counter"
							type="text"
							name="code"
							label="Code"
							v-model="code"
							v-on:keyup.enter="signIn">
						</v-text-field>
						
						<v-text-field
							v-if="sent"
							prepend-icon="mdi-lock"
							type="password"
							name="password"
							label="New Password"
							v-model="password"
							v-on:keyup.enter="signIn">
						</v-text-field>
					</v-form>
				</v-card-text>
				
				<v-card-actions>
					<v-layout justify-start row>
						<v-flex
							v-if="!sent"
							@click="signIn"
							xs12 sm4 text-xs-left>
							<div>
								<v-btn color="primary" small>
									Back to Sign In
								</v-btn>
							</div>
						</v-flex>
						
						<v-flex
							v-if="sent"
							@click="submit"
							xs12 sm4 text-xs-left>
							<div>
								<v-btn color="primary" small>
									Resend Code
								</v-btn>
							</div>
						</v-flex>
					</v-layout>
					
					<v-btn
						v-if="!sent"
						color="primary"
						@click="submit"
						:disabled="!username">
						Send Code
					</v-btn>
					
					<v-btn
						v-if="sent"
						color="primary"
						@click="verify"
						:disabled="!username">
						Submit
					</v-btn>
				</v-card-actions>
				
				<NotificationBar
					:active="status.active"
					:type="status.type"
					:icon="status.icon"
					:msg="status.msg"/>
			
			</v-card>
		</v-flex>
	</v-content>
</template>

<script>
	import { AmplifyEventBus } from 'aws-amplify-vue';
	import NotificationBar from '@/components/NotificationBar';
	
	export default {
		name: 'ForgotPassword',
		components: { NotificationBar },
		data() {
			return {
				username: '',
				code: '',
				password: '',
				sent: false,
				status: {
					active: false,
					type: 'success',
					icon: '',
					msg: ''
				},
				logger: {}
			};
		},
		computed: {
			options() {
				return {
					header: 'Reset your password'
				};
			}
		},
		mounted() {
			this.logger = new this.$Amplify.Logger( this.$options.name );
		},
		methods: {
			async submit() {
				// CodeDeliveryDetails
				try {
					const { CodeDeliveryDetails } = await this.$Amplify.Auth.forgotPassword( this.username );
					
					this.setStatus(
						'success',
						CodeDeliveryDetails.DeliveryMedium === 'SMS' ? 'mdi-cellphone-basic' : 'mdi-email-alert',
						`${ CodeDeliveryDetails.DeliveryMedium } sent to ${ CodeDeliveryDetails.Destination }`
					);
					
					this.sent = true;
					this.logger.info( 'forgotPassword success' );
				} catch( e ) {
					this.setStatus( 'error', 'warning', e );
				}
			},
			async verify() {
				try {
					await this.$Amplify.Auth.forgotPasswordSubmit( this.username, this.code, this.password );
					this.logger.info( 'forgotPasswordSubmit success' );
					AmplifyEventBus.$emit( 'authState', 'signedOut' );
				} catch( e ) {
					this.setStatus( 'error', 'warning', e );
				}
			},
			signIn() {
				AmplifyEventBus.$emit( 'authState', 'signedOut' );
			},
			setStatus( type, icon, msg ) {
				this.status.active = true;
				
				this.status.type = type;
				this.status.icon = icon;
				this.status.msg  = msg;
				
				if( type === 'error' ) {
					this.status.msg = this.$Amplify.I18n.get( msg.message || msg );
					this.logger.error( this.status.msg );
				}
			}
		}
	};
</script>
