<template>
	<v-card class="elevation-1">
		
		<v-toolbar dark color="success">
			<v-toolbar-title>Reset your password</v-toolbar-title>
		</v-toolbar>
		
		<v-card-text>
			<v-form ref="form" lazy-validation>
				
				<UsernameField
					v-model="username"
					:onKeyupEnter="sendCode"/>
				
				<v-text-field
					v-if="codeSent"
					prepend-icon="mdi-counter"
					type="text"
					name="code"
					label="Code"
					v-model="code"
					v-on:keyup.enter="sendCode"
					:rules="codeRules"
					required>
				</v-text-field>
				
				<PasswordField
					v-if="codeSent"
					v-model="password"
					label="New Password"
					:onKeyupEnter="sendCode"/>
			</v-form>
		</v-card-text>
		
		<v-card-actions>
			<v-flex xs12>
				<v-layout align-end justify-space-between fill-height>
					<v-btn
						v-if="!codeSent"
						@click="sendCode"
						color="primary">
						Back to Sign In
					</v-btn>
					
					<v-btn
						v-if="codeSent"
						@click="submit"
						color="primary">
						Resend Code
					</v-btn>
					
					<v-btn
						v-if="!codeSent"
						color="primary"
						@click="submit"
						:disabled="!username">
						Send Code
					</v-btn>
					
					<v-btn
						v-if="codeSent"
						color="primary"
						@click="verify"
						:disabled="!username">
						Submit
					</v-btn>
				</v-layout>
			</v-flex>
		</v-card-actions>
		
		<NotificationBar
			:active="status.active"
			:type="status.type"
			:icon="status.icon"
			:msg="status.msg"/>
	
	</v-card>
</template>

<script>
	import { AmplifyEventBus } from 'aws-amplify-vue';
	import NotificationBar from '@/components/NotificationBar';
	import UsernameField from '@/components/Auth/UsernameField';
	import PasswordField from '@/components/Auth/PasswordField';
	
	// TODO:: continue cleaning up this component
	
	export default {
		name: 'ForgotPassword',
		components: { UsernameField, PasswordField, NotificationBar },
		data() {
			return {
				username: '',
				code: '',
				password: '',
				codeRules: [
					v => !!v || 'Code is required',
					v => ( v && /^[0-9]{6,8}$/.test( v ) ) || 'Code must be 6-8 numbers'
				],
				codeSent: false,
				status: {
					active: false,
					type: 'success',
					icon: '',
					msg: ''
				},
				logger: {}
			};
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
					
					this.codeSent = true;
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
			sendCode() {
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
