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
			
			<v-btn icon @click="listFolder">
				<v-icon>refresh</v-icon>
			</v-btn>
		
		</v-layout>
		
		<SignOut
			v-if="signedIn"
			class="hidden-xs-only"/>
		
		<VersionBadge/>
	
	</v-toolbar>
</template>

<script>
	import { mapActions, mapMutations, mapGetters } from 'vuex';
	import SignOut from '@/components/Auth/SignOut';
	import VersionBadge from '@/components/VersionBadge';
	
	export default {
		name: 'Toolbar',
		components: {
			SignOut,
			VersionBadge
		},
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
			...mapMutations( 'app', [ 'toggleSidebar' ] ),
			...mapActions( 'email', [ 'listFolder' ] )
		}
	};
</script>

<style lang="scss" scoped>

</style>
