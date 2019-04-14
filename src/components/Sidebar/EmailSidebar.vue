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
							<v-list-tile-title>Admin</v-list-tile-title>
						</v-list-tile>
					</template>
					
					<v-list-tile
						v-for="(admin, i) in admins"
						:key="i"
						@click="">
						
						<v-list-tile-title v-text="admin[0]"></v-list-tile-title>
						<v-list-tile-action>
							<v-icon v-text="admin[1]"></v-icon>
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
	
	<!--	<div>-->
	<!--		<v-list-tile @click="">-->
	<!--			<v-list-tile-action>-->
	<!--				<v-icon>email</v-icon>-->
	<!--			</v-list-tile-action>-->
	<!--			<v-list-tile-content>-->
	<!--				<v-list-tile-title>All Mail</v-list-tile-title>-->
	<!--			</v-list-tile-content>-->
	<!--		</v-list-tile>-->
	<!--		-->
	<!--		<v-list-tile @click="">-->
	<!--			<v-list-tile-action>-->
	<!--				<v-icon>email</v-icon>-->
	<!--			</v-list-tile-action>-->
	<!--			<v-list-tile-content>-->
	<!--				<v-list-tile-title>Inbox</v-list-tile-title>-->
	<!--			</v-list-tile-content>-->
	<!--		</v-list-tile>-->
	<!--		-->
	<!--		<v-list-tile @click="">-->
	<!--			<v-list-tile-action>-->
	<!--				<v-icon>email</v-icon>-->
	<!--			</v-list-tile-action>-->
	<!--			<v-list-tile-content>-->
	<!--				<v-list-tile-title>Sent</v-list-tile-title>-->
	<!--			</v-list-tile-content>-->
	<!--		</v-list-tile>-->
	<!--		-->
	<!--		<v-list-tile @click="">-->
	<!--			<v-list-tile-action>-->
	<!--				<v-icon>email</v-icon>-->
	<!--			</v-list-tile-action>-->
	<!--			<v-list-tile-content>-->
	<!--				<v-list-tile-title>Drafts</v-list-tile-title>-->
	<!--			</v-list-tile-content>-->
	<!--		</v-list-tile>-->
	<!--		-->
	<!--		<v-list-tile @click="">-->
	<!--			<v-list-tile-action>-->
	<!--				<v-icon>email</v-icon>-->
	<!--			</v-list-tile-action>-->
	<!--			<v-list-tile-content>-->
	<!--				<v-list-tile-title>Trash</v-list-tile-title>-->
	<!--			</v-list-tile-content>-->
	<!--		</v-list-tile>-->
	<!--		-->
	<!--		<v-list-tile @click="">-->
	<!--			<v-list-tile-action>-->
	<!--				<v-icon>settings</v-icon>-->
	<!--			</v-list-tile-action>-->
	<!--			<v-list-tile-content>-->
	<!--				<v-list-tile-title>Settings</v-list-tile-title>-->
	<!--			</v-list-tile-content>-->
	<!--		</v-list-tile>-->
	<!--	</div>-->
</template>

<script>
	export default {
		name: 'EmailSidebar',
		data() {
			return {
				admins: [
					[ 'Management', 'people_outline' ],
					[ 'Settings', 'settings' ]
				],
				cruds: [
					[ 'Create', 'add' ],
					[ 'Read', 'insert_drive_file' ],
					[ 'Update', 'update' ],
					[ 'Delete', 'delete' ]
				]
			};
		},
		methods: {
			createEmail() {
				console.log( 'here' );
			}
		}
	};
</script>
