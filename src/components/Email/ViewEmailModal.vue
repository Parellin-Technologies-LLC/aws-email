<template>
	<v-layout row justify-center>
		<v-dialog
			:value="visible"
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
					
					<v-btn icon dark @click="moveEmailToFolder( 'archive' )">
						<v-icon>mdi-package-down</v-icon>
					</v-btn>
					
					<v-btn icon dark @click="moveEmailToFolder( 'spam' )">
						<v-icon>mdi-alert-octagon</v-icon>
					</v-btn>
					
					<v-btn icon dark @click="moveEmailToFolder( 'trash' )">
						<v-icon>mdi-delete</v-icon>
					</v-btn>
					
					<v-btn icon dark @click="markAsUnread()">
						<v-icon>mdi-email-mark-as-unread</v-icon>
					</v-btn>
					
					<v-btn icon dark @click="folderSelectionOpen = true">
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
							v-for="( attachment, i ) in openEmail.data.attachments"
							:key="i">
							
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
				
				<v-layout row justify-center>
					<v-dialog v-model="folderSelectionOpen" scrollable max-width="300px">
						<v-card>
							<v-card-title>Move to Folder</v-card-title>
							<v-divider></v-divider>
							<v-card-text style="height: 300px;">
								<v-btn
									block
									v-for="( item, index ) in config.folder"
									:key="index"
									@click="moveEmailToFolder( item[ 0 ] )">
									{{ item[ 0 ] }}
								</v-btn>
							</v-card-text>
						</v-card>
					</v-dialog>
				</v-layout>
			
			</v-card>
		
		</v-dialog>
	</v-layout>
</template>
<script>
	import { mapActions, mapState } from 'vuex';
	import { randomHex } from '@/utils';
	
	export default {
		name: 'ViewEmailModal',
		data() {
			return {
				visible: false,
				folderSelectionOpen: false
			};
		},
		computed: {
			...mapState( 'email', [
				'config',
				'openEmail'
			] )
		},
		watch: {
			openEmail( val ) {
				this.visible = Object.keys( val ).length;
				
				if( this.visible ) {
					this.markOpen();
				}
			}
		},
		methods: {
			...mapActions( 'email', [
				'clearEmail',
				'updateEmail'
			] ),
			randomHex,
			async markOpen() {
				if( !this.openEmail.read ) {
					this.openEmail.read = true;
					await this.updateEmail( {
						ts: this.openEmail.ts,
						UpdateExpression: 'set #key = :val',
						ExpressionAttributeNames: { '#key': 'read' },
						ExpressionAttributeValues: { ':val': true }
					} );
				}
			},
			async markAsUnread() {
				this.openEmail.read = false;
				await this.updateEmail( {
					ts: this.openEmail.ts,
					UpdateExpression: 'set #key = :val',
					ExpressionAttributeNames: { '#key': 'read' },
					ExpressionAttributeValues: { ':val': false }
				} );
				
				this.clearEmail();
			},
			async moveEmailToFolder( folder ) {
				this.folderSelectionOpen = false;
				this.openEmail.folder    = folder;
				
				// TODO: modal popup for "marked as spam" check if use wants to make rule for it
				await this.updateEmail( {
					ts: this.openEmail.ts,
					UpdateExpression: 'set #key = :val',
					ExpressionAttributeNames: { '#key': 'folder' },
					ExpressionAttributeValues: { ':val': folder }
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
