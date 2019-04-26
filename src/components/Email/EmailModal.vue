<template>
	<v-layout row justify-center>
		<v-dialog
			:value="isEmailOpen"
			fullscreen
			hide-overlay
			transition="dialog-bottom-transition">
			
			<v-card>
				<v-toolbar dark color="primary">
					<v-btn icon dark @click="isEmailOpen = false">
						<v-icon>close</v-icon>
					</v-btn>
					
					<v-toolbar-title>Settings</v-toolbar-title>
					<v-spacer></v-spacer>
					<v-toolbar-items>
						<v-btn dark flat @click="dialog = false">Save</v-btn>
					</v-toolbar-items>
				</v-toolbar>
				
				<v-list three-line subheader>
					<v-subheader>User Controls</v-subheader>
					<v-list-tile avatar>
						<v-list-tile-content>
							<v-list-tile-title>Content filtering</v-list-tile-title>
							<v-list-tile-sub-title>
								Set the content filtering level to restrict apps that can be downloaded
							</v-list-tile-sub-title>
						</v-list-tile-content>
					</v-list-tile>
					<v-list-tile avatar>
						<v-list-tile-content>
							<v-list-tile-title>Password</v-list-tile-title>
							<v-list-tile-sub-title>Require password for purchase or use password to restrict purchase
							</v-list-tile-sub-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>
				
				<v-divider></v-divider>
				
				<v-list three-line subheader>
					<v-subheader>General</v-subheader>
					<v-list-tile avatar>
						<v-list-tile-action>
							<v-checkbox v-model="notifications"></v-checkbox>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title>Notifications</v-list-tile-title>
							<v-list-tile-sub-title>Notify me about updates to apps or games that I downloaded
							</v-list-tile-sub-title>
						</v-list-tile-content>
					</v-list-tile>
					<v-list-tile avatar>
						<v-list-tile-action>
							<v-checkbox v-model="sound"></v-checkbox>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title>Sound</v-list-tile-title>
							<v-list-tile-sub-title>Auto-update apps at any time. Data charges may apply
							</v-list-tile-sub-title>
						</v-list-tile-content>
					</v-list-tile>
					<v-list-tile avatar>
						<v-list-tile-action>
							<v-checkbox v-model="widgets"></v-checkbox>
						</v-list-tile-action>
						<v-list-tile-content>
							<v-list-tile-title>Auto-add widgets</v-list-tile-title>
							<v-list-tile-sub-title>Automatically add home screen widgets</v-list-tile-sub-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>
			</v-card>
		
		</v-dialog>
	</v-layout>
</template>
<script>
	import { mapActions, mapState } from 'vuex';
	
	export default {
		data() {
			return {
				dialog: false,
				notifications: false,
				sound: true,
				widgets: false,
				localEmail: {}
			};
		},
		methods: {
			...mapActions( 'email', [ 'loadEmail' ] )
		},
		computed: {
			...mapState( 'email', [
				'openEmail'
			] ),
			isEmailOpen: {
				set( v ) {
					if( !v ) {
						this.loadEmail( {} );
					} else {
						this.localEmail = v;
					}
				},
				get() {
					const localEmailPresent = Object.keys( this.openEmail ).length;
					
					if( localEmailPresent ) {
						this.localEmail = this.openEmail;
						console.log( 'loadEmail', this.openEmail );
					}
					
					return localEmailPresent;
				}
			}
		},
		mounted() {
			console.log( this.openEmail );
		}
	};
</script>
