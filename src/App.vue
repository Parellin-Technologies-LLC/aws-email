<template>
	<v-app>
		
		<Sidebar v-if="$route.meta.isDashboard"/>
		<Toolbar/>
		
		<v-content>
			<router-view></router-view>
		</v-content>
	
	</v-app>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex';
	import { AmplifyEventBus } from 'aws-amplify-vue';
	import Toolbar from '@/components/Toolbar';
	import Sidebar from '@/components/Sidebar';
	
	export default {
		name: 'App',
		components: { Sidebar, Toolbar },
		beforeCreate() {
			console.log( this );
			
			AmplifyEventBus.$on( 'authState',
				info => {
					this.authState( info );
					
					if( info === 'signedIn' ) {
						this.$router.push( '/dashboard' );
					} else if( info === 'signedOut' ) {
						this.$router.push( '/auth' );
					}
				}
			);
		},
		async mounted() {
			await this.currentSession();
			await this.currentAuthenticatedUser();
			
			if( !this.signedIn ) {
				this.$router.push( '/auth' );
			}
		},
		computed: {
			...mapGetters( 'auth', {
				signedIn: 'getSignedIn'
			} )
		},
		methods: {
			...mapActions( 'auth', [
				'authState',
				'currentSession',
				'currentAuthenticatedUser'
			] )
		}
	};
</script>

<style lang="scss">
	@import '@/styles/index.scss';
</style>
