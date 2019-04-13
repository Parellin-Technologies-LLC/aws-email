<template>
	<v-toolbar color="primary" app dark fixed clipped-left>
		
		<v-toolbar-side-icon
			v-if="$route.meta.isDashboard"
			@click.stop="toggleSidebar"/>
		
		<v-toolbar-title class="headline mr-3 hidden-xs-only">
			<span class="font-weight-light">Email</span>
		</v-toolbar-title>
		
		<v-layout v-if="signedIn">
			
			<v-btn to="/dashboard" icon>
				<v-icon>home</v-icon>
			</v-btn>
			
			<v-btn to="/email" icon>
				<v-icon>email</v-icon>
			</v-btn>
			
			<v-btn to="/profile" icon>
				<v-icon>mdi-account</v-icon>
			</v-btn>
			
			<v-spacer></v-spacer>
			
			<v-btn icon>
				<v-icon>refresh</v-icon>
			</v-btn>
		
		</v-layout>
		
		<SignOut class="hidden-xs-only"/>
	
	</v-toolbar>
</template>

<script>
	import { mapMutations, mapGetters } from 'vuex';
	import SignOut from '@/components/Auth/SignOut';
	
	export default {
		name: 'Toolbar',
		components: { SignOut },
		data() {
			return {
				drawer: null
			};
		},
		computed: {
			...mapGetters( 'auth', { signedIn: 'getSignedIn' } ),
			...mapGetters( 'app', [ 'isSidebarOpen' ] )
		},
		methods: {
			...mapMutations( 'app', [ 'toggleSidebar' ] )
		}
	};
</script>

<style lang="scss" scoped>

</style>
