<template>
	<v-container fluid>
		<EmailList/>
		<EmailModal/>
	</v-container>
</template>

<script>
	import { mapActions } from 'vuex';
	import EmailList from '@/components/Email/EmailList';
	import EmailModal from '@/components/Email/EmailModal';
	
	export default {
		name: 'Email',
		components: {
			EmailList,
			EmailModal
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
