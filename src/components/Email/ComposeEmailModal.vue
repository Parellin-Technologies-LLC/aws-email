<template>
	<v-layout row justify-center>
		<v-dialog
			:value="showComposeEmail"
			fullscreen
			hide-overlay
			transition="dialog-bottom-transition">
			
			<v-card
				class="hide-overflow"
				style="position: relative;">
				
				<v-container fluid>
					<v-layout column>
						<v-layout row>
							<v-toolbar
								dark
								fixed
								dense
								color="primary">
								
								<v-btn icon dark @click="showComposeEmail = false">
									<v-icon>mdi-close</v-icon>
								</v-btn>
							
							</v-toolbar>
						</v-layout>
						
						<v-layout row>
							<v-container fluid grid-list-sm>
								
								<v-form
									ref="form"
									v-model="valid"
									lazy-validation>
									
									<v-text-field
										v-model="email"
										:rules="emailRules"
										label="Send to"
										required>
									</v-text-field>
									
									<v-text-field
										v-model="subject"
										label="Subject">
									</v-text-field>
									
									<v-textarea
										name="body"
										label="Body"
										v-model="body"
										auto-grow
										box>
									</v-textarea>
									
									<v-btn
										color="success"
										@click="addAttachment">
										Add Attachment
									</v-btn>
									
									<v-btn
										:disabled="!valid"
										color="primary"
										@click="submitForm">
										Send
									</v-btn>
								
								</v-form>
							
							</v-container>
							
							<v-container
								class="htmlPreview"
								fluid
								fill-height>
								<v-flex xs12>
									<v-card
										class="mx-auto"
										color="light">
										
										<v-card-title>
											<span class="title font-weight-light">Preview</span>
										</v-card-title>
										
										<v-card-text v-html="body"/>
									
									</v-card>
								</v-flex>
							</v-container>
						
						</v-layout>
						
						<!--						<v-layout row align-end justify-end fill-height>-->
						<!--						</v-layout>-->
					</v-layout>
				</v-container>
			
			</v-card>
		
		</v-dialog>
	</v-layout>
</template>
<script>
	import { mapActions, mapState } from 'vuex';
	
	export default {
		name: 'ComposeEmailModal',
		data() {
			return {
				folderSelectionOpen: false,
				valid: true,
				emailRules: [
					v => !!v || 'Email is required',
					v => /.+@.+/.test( v ) || 'Email is not valid'
				],
				email: '',
				subject: '',
				body: ''
			};
		},
		computed: {
			...mapState( 'email', [
				'config',
				'showComposeEmail'
			] )
		},
		methods: {
			...mapActions( 'email', [
				'clearEmail',
				'updateEmail',
				'sendEmail'
			] ),
			addAttachment() {
			
			},
			submitForm() {
				this.sendEmail( {
					to: this.email,
					subject: this.subject,
					body: this.body
				} );
				console.log( this.email );
				console.log( this.subject );
				console.log( this.body );
			}
		}
	};
</script>

<style scoped>
	/*.htmlPreview {*/
	/*	position: absolute;*/
	/*	*/
	/*	min-width: 40%;*/
	/*	max-width: 40%;*/
	/*	min-height: 40%;*/
	/*	max-height: 40%;*/
	/*	*/
	/*	bottom: 0;*/
	/*	right: 0;*/
	/*	*/
	/*	overflow-x: scroll;*/
	/*}*/
</style>
