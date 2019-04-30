<template>
	<v-btn
		v-if="!!npmPackage"
		class="text-lowercase"
		:href="npmPackage.repository.url"
		flat>
		v{{ npmPackage.version }}
	</v-btn>
</template>

<script>
	import { mapGetters } from 'vuex';
	
	export default {
		name: 'VersionBadge',
		computed: {
			...mapGetters( 'app', {
				npmPackage: 'getPackage'
			} )
		}
	};
</script>
