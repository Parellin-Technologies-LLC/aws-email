<template>
	<v-container fluid>
		<EmailList/>
		<ViewEmailModal/>
		<ComposeEmailModal/>
	</v-container>
</template>

<script>
	import { mapActions } from 'vuex';
	import EmailList from '@/components/Email/EmailList';
	import ViewEmailModal from '@/components/Email/ViewEmailModal';
	import ComposeEmailModal from '@/components/Email/ComposeEmailModal';
	
	export default {
		name: 'Email',
		components: {
			EmailList,
			ViewEmailModal,
			ComposeEmailModal
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
