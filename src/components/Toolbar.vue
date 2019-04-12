<template>
	
	<v-toolbar color="primary" app dark>
		
		<v-toolbar-side-icon></v-toolbar-side-icon>
		
		<v-toolbar-title class="headline mr-3">
			<span class="font-weight-light">Email</span>
		</v-toolbar-title>
		
		<v-btn to="/" v-if="$store.state.signedIn" icon>
			<v-icon>email</v-icon>
		</v-btn>
		
		<v-btn to="/profile" v-if="$store.state.signedIn" icon>
			<v-icon>mdi-account</v-icon>
		</v-btn>
		
		<v-spacer></v-spacer>
		
		<v-btn v-if="$store.state.signedIn" icon>
			<v-icon>refresh</v-icon>
		</v-btn>
		
		<SignOut/>
	
	</v-toolbar>

</template>

<script>
	import SignOut from '@/components/Auth/SignOut';
	
	export default {
		name: 'Toolbar',
		components: { SignOut }
	};
</script>

<style lang="scss" scoped>

</style>
