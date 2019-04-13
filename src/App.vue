<template>
	<v-app>
		
		<Toolbar/>
		<Sidebar/>
		
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
			
			if( !this.signedIn ) {
				this.$router.push( '/auth' );
			} else {
				this.$router.push( '/dashboard' );
			}
		},
		computed: {
			...mapGetters( 'auth', {
				signedIn: 'getSignedIn'
			} )
		},
		methods: {
			...mapActions( 'auth', [
				'currentSession',
				'authState'
			] )
		}
	};
</script>

<style lang="scss">
	@import '@/styles/index.scss';
</style>
