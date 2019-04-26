<template>
	<v-container fluid>
		<EmailList/>
	</v-container>
</template>

<script>
	import { mapActions } from 'vuex';
	import EmailList from '@/components/Email/EmailList';
	
	export default {
		name: 'Email',
		components: {
			EmailList
		},
		async mounted() {
			await this.currentAuthenticatedUser();
			await this.loadEmailConfig();
		},
		methods: {
			...mapActions( 'auth', [
				'currentAuthenticatedUser'
			] ),
			...mapActions( 'email', [ 'loadEmailConfig' ] )
		}
	};
</script>
