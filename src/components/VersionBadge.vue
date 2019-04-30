<template>
	<v-btn class="text-lowercase" flat>
		v{{ version }}
	</v-btn>
</template>

<script>
	import { mapGetters } from 'vuex';
	
	export default {
		name: 'VersionBadge',
		computed: {
			...mapGetters( 'app', {
				version: 'getVersion'
			} )
		}
	};
</script>
