<template>
	<div>
		<v-list-tile @click="">
			<v-list-tile-action>
				<v-icon>mdi-account</v-icon>
			</v-list-tile-action>
			<v-list-tile-content>
				<v-list-tile-title>profile</v-list-tile-title>
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
		
		<SignOut class="xs-only"/>
	</div>
</template>

<script>
	import SignOut from '@/components/Auth/SignOut';
	
	export default {
		name: 'ProfileSidebar',
		components: { SignOut }
	};
</script>
