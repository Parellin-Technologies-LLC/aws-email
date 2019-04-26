<template>
	<div>
		
		<v-list-tile @click="createEmail">
			<v-list-tile-action>
				<v-icon color="success">mdi-plus-circle</v-icon>
			</v-list-tile-action>
			<v-list-tile-title>Create Email</v-list-tile-title>
		</v-list-tile>
		
		<v-list>
			
			<v-list-group
				prepend-icon="email"
				value="true">
				
				<template v-slot:activator>
					<v-list-tile>
						<v-list-tile-title>Folders</v-list-tile-title>
					</v-list-tile>
				</template>
				
				<v-list-group
					no-action
					sub-group
					value="true">
					
					<template v-slot:activator>
						<v-list-tile>
							<v-list-tile-title>Folders</v-list-tile-title>
						</v-list-tile>
					</template>
					
					<v-list-tile
						v-for="(folder, i) in config.folder"
						:key="i"
						@click="listFolder( { folder: folder[ 0 ] } )">
						<v-list-tile-title>{{ folder[ 0 ] }}</v-list-tile-title>
						<v-list-tile-action>
							<v-icon>{{ folder[ 1 ] }}</v-icon>
						</v-list-tile-action>
					</v-list-tile>
				</v-list-group>
				
				<v-list-group
					sub-group
					no-action>
					
					<template v-slot:activator>
						<v-list-tile>
							<v-list-tile-title>Actions</v-list-tile-title>
						</v-list-tile>
					</template>
					<v-list-tile
						v-for="(crud, i) in cruds"
						:key="i"
						@click="">
						
						<v-list-tile-title v-text="crud[0]"></v-list-tile-title>
						<v-list-tile-action>
							<v-icon v-text="crud[1]"></v-icon>
						</v-list-tile-action>
					</v-list-tile>
				</v-list-group>
			
			</v-list-group>
		
		</v-list>
	
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	
	export default {
		name: 'EmailSidebar',
		data() {
			return {
				cruds: [
					[ 'Create', 'add' ],
					[ 'Read', 'insert_drive_file' ],
					[ 'Update', 'update' ],
					[ 'Delete', 'delete' ]
				]
			};
		},
		computed: {
			...mapGetters( 'email', {
				config: 'getConfig'
			} )
		},
		methods: {
			...mapActions( 'email', [ 'listFolder' ] ),
			createEmail() {
				console.log( 'here' );
			}
		}
	};
</script>
