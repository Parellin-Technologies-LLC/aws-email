<template>
	<v-card class="elevation-1">
		
		<v-toolbar dark color="success">
			<v-toolbar-title>Set your password</v-toolbar-title>
		</v-toolbar>
		
		<v-card-text>
			<v-form ref="form" lazy-validation>
				
				<v-text-field
					prepend-icon="mdi-account"
					type="text"
					name="username"
					label="Username"
					color="success"
					:value="user.username"
					readonly>
				</v-text-field>
				
				<PasswordField
					v-model="password"
					label="New Password"
					:onKeyupEnter="submit"/>
			
			</v-form>
		</v-card-text>
		
		<v-card-actions>
			<v-flex xs12>
				<v-layout align-end justify-space-between fill-height>
					<v-btn
						@click="returnToLogin"
						color="primary">
						Back to Sign In
					</v-btn>
					
					<v-btn
						color="primary"
						@click="submit"
						:disabled="!password">
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
	import PasswordField from '@/components/Auth/PasswordField';
	
	// TODO:: continue cleaning up this component
	
	export default {
		name: 'RequireNewPassword',
		components: { PasswordField, NotificationBar },
		props: {
			user: Object
		},
		data() {
			return {
				password: '',
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
				try {
					await this.$Amplify.Auth.completeNewPassword( this.user, this.password );
					AmplifyEventBus.$emit( 'authState', 'signedOut' );
				} catch( e ) {
					this.setStatus( 'error', 'warning', e );
				}
			},
			returnToLogin() {
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
