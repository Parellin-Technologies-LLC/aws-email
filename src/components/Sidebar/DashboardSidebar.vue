<template>
	<div>
		<v-list-tile @click="">
			<v-list-tile-action>
				<v-icon>dashboard</v-icon>
			</v-list-tile-action>
			<v-list-tile-content>
				<v-list-tile-title>Dashboard</v-list-tile-title>
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
		name: 'DashboardSidebar'
	};
</script>
