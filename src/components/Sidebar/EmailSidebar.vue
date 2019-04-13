<template>
	<div>
		<v-list-tile @click="">
			<v-list-tile-action>
				<v-icon>email</v-icon>
			</v-list-tile-action>
			<v-list-tile-content>
				<v-list-tile-title>Email</v-list-tile-title>
			</v-list-tile-content>
		</v-list-tile>
		
		<v-list-tile @click="">
			<v-list-tile-action>
				<v-icon>settings</v-icon>
			</v-list-tile-action>
			<v-list-tile-content>
				<v-list-tile-title>Settings</v-list-tile-title>
			</v-list-tile-content>
		</v-list-tile>
	</div>
</template>

<script>
	export default {
		name: 'EmailSidebar'
	};
</script>
