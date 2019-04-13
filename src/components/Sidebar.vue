<template>
	<v-navigation-drawer
		:value="isSidebarOpen"
		clipped
		fixed
		app>
		
		<v-list dense>
			
			<DashboardSidebar v-if="$route.name === 'Dashboard'"/>
			<EmailSidebar v-if="$route.name === 'Email'"/>
			<ProfileSidebar v-if="$route.name === 'Profile'"/>
		
		</v-list>
	
	</v-navigation-drawer>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	import DashboardSidebar from '@/components/Sidebar/DashboardSidebar';
	import EmailSidebar from '@/components/Sidebar/EmailSidebar';
	import ProfileSidebar from '@/components/Sidebar/ProfileSidebar';
	
	// TODO::: double click issues with draw when on mobile
	export default {
		name: 'Sidebar',
		components: { ProfileSidebar, EmailSidebar, DashboardSidebar },
		computed: {
			...mapGetters( 'app', [ 'isSidebarOpen' ] )
		},
		methods: {
			...mapMutations( 'app', [ 'toggleSidebar' ] )
		}
	};
</script>
