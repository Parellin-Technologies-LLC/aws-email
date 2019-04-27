<template>
	<v-layout row justify-center>
		<v-dialog
			v-model="Object.keys( openEmail ).length"
			fullscreen
			hide-overlay
			transition="dialog-bottom-transition">
			
			<v-card
				v-if="openEmail.hasOwnProperty( 'data' )"
				class="hide-overflow"
				style="position: relative;">
				
				<v-toolbar
					dark
					fixed
					dense
					color="primary">
					
					<v-btn icon dark @click="clearEmail()">
						<v-icon>mdi-close</v-icon>
					</v-btn>
					
					<v-btn icon dark @click="archiveEmail()">
						<v-icon>mdi-package-down</v-icon>
					</v-btn>
					
					<v-btn icon dark @click="markAsSpam( {} )">
						<v-icon>mdi-alert-octagon</v-icon>
					</v-btn>
					
					<v-btn icon dark @click="deleteEmail( {} )">
						<v-icon>mdi-delete</v-icon>
					</v-btn>
					
					<v-btn icon dark @click="markAsUnread( {} )">
						<v-icon>mdi-email-mark-as-unread</v-icon>
					</v-btn>
					
					<v-btn icon dark @click="moveToFolder( {} )">
						<v-icon>mdi-folder-move</v-icon>
					</v-btn>
					
					<v-btn icon dark @click="reply( {} )">
						<v-icon>mdi-reply</v-icon>
					</v-btn>
				</v-toolbar>
				
				<v-list three-line class="ml-3 mt-5">
					<v-list-tile class="mt-1">
						<v-list-tile-content>
							<v-list-tile-sub-title class="mb-1">
								From: {{ openEmail.data.from.text }}
							</v-list-tile-sub-title>
							<v-list-tile-sub-title class="mb-1">
								To: {{ openEmail.data.to.text }}
							</v-list-tile-sub-title>
							<v-list-tile-sub-title class="mb-1">
								Date: {{ openEmail.readableTime }}
							</v-list-tile-sub-title>
						</v-list-tile-content>
					</v-list-tile>
				</v-list>
				
				<v-divider></v-divider>
				
				<v-container fluid grid-list-sm tag="section">
					
					<v-layout row wrap>
						<v-flex tag="h1" class="headline">{{ openEmail.subject }}</v-flex>
						<v-flex d-flex xs12 order-xs5>
							<v-layout column>
								<v-flex>
									<v-card flat>
										<v-card-text v-html="openEmail.data.html"/>
									</v-card>
								</v-flex>
							</v-layout>
						</v-flex>
					</v-layout>
				
				</v-container>
				
				<v-container fluid class="bottom">
					<v-layout align-end justify-start row fill-height>
						<v-card
							v-for="attachment in openEmail.data.attachments"
							:key="attachment.checksum">
							
							<v-card-title primary-title>
								<div>
									<h3 class="headline">{{ attachment.filename }}</h3>
									<p>Size: {{ attachment.size }}</p>
									<p>Type: {{ attachment.contentType }}</p>
								</div>
							</v-card-title>
							
							<v-card-actions>
								<v-btn flat color="orange">Download</v-btn>
							</v-card-actions>
						
						</v-card>
					</v-layout>
				</v-container>
			
			</v-card>
		
		</v-dialog>
	</v-layout>
</template>
<script>
	import { mapActions, mapState } from 'vuex';
	
	export default {
		name: 'EmailModal',
		data() {
			return {
				notifications: false,
				sound: true,
				widgets: false,
				localEmail: {}
			};
		},
		computed: {
			...mapState( 'email', [
				'openEmail'
			] )
		},
		methods: {
			...mapActions( 'email', [
				'clearEmail',
				'updateEmail'
			] ),
			async archiveEmail() {
				await this.updateEmail( {
					ts: this.openEmail.ts,
					UpdateExpression: 'set #key = :val',
					ExpressionAttributeNames: { '#key': 'folder' },
					ExpressionAttributeValues: { ':val': 'archive' }
				} );
				
				this.clearEmail();
			}
		},
		mounted() {
			console.log( this.openEmail );
		}
	};
</script>

<style scoped>
	.bottom {
		position: absolute;
		bottom: 0;
		overflow-x: scroll;
	}
</style>
