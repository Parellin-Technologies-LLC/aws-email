<template>
	<v-container fluid fill-height>
		<v-layout justify-center align-center>
			<v-flex shrink>
				Email
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	import { mapActions } from 'vuex';
	
	export default {
		name: 'Email',
		mounted() {
			this.loadEmailConfig();
		},
		methods: {
			...mapActions( 'email', [ 'loadEmailConfig' ] )
		}
	};
</script>
