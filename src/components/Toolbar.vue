<template>
	<v-toolbar color="primary" app dark fixed clipped-left>
		
		<v-toolbar-side-icon @click.stop="toggleSidebar"></v-toolbar-side-icon>
		
		<v-toolbar-title class="headline mr-3">
			<span class="font-weight-light">Email</span>
		</v-toolbar-title>
		
		<v-btn to="/" v-if="signedIn" icon>
			<v-icon>email</v-icon>
		</v-btn>
		
		<v-btn to="/profile" v-if="signedIn" icon>
			<v-icon>mdi-account</v-icon>
		</v-btn>
		
		<v-spacer></v-spacer>
		
		<v-btn v-if="signedIn" icon>
			<v-icon>refresh</v-icon>
		</v-btn>
		
		<SignOut/>
	
	</v-toolbar>
</template>

<script>
	import { mapGetters, mapMutations } from 'vuex';
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
			...mapGetters( 'app', [ 'toggleSidebar' ] )
		},
		methods: {
			...mapMutations( 'app', [ 'toggleSidebar' ] )
		}
	};
</script>

<style lang="scss" scoped>

</style>
