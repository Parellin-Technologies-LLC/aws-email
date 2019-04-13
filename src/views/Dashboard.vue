<template>
	<v-app id="inspire">
		
<!--		<v-navigation-drawer v-model="drawer" clipped fixed app>-->
<!--			<v-list dense>-->
<!--				<v-list-tile @click="">-->
<!--					<v-list-tile-action>-->
<!--						<v-icon>dashboard</v-icon>-->
<!--					</v-list-tile-action>-->
<!--					<v-list-tile-content>-->
<!--						<v-list-tile-title>Dashboard</v-list-tile-title>-->
<!--					</v-list-tile-content>-->
<!--				</v-list-tile>-->
<!--				<v-list-tile @click="">-->
<!--					<v-list-tile-action>-->
<!--						<v-icon>settings</v-icon>-->
<!--					</v-list-tile-action>-->
<!--					<v-list-tile-content>-->
<!--						<v-list-tile-title>Settings</v-list-tile-title>-->
<!--					</v-list-tile-content>-->
<!--				</v-list-tile>-->
<!--			</v-list>-->
<!--		</v-navigation-drawer>-->
		
		<v-content>
			<v-container fluid fill-height>
				<v-layout justify-center align-center>
					<v-flex shrink>
						<v-tooltip right>
							<template #activator="{ on }">
								<v-btn :href="source" icon large target="_blank" v-on="on">
									<v-icon large>code</v-icon>
								</v-btn>
							</template>
							<span>Source</span>
						</v-tooltip>
					</v-flex>
				</v-layout>
			</v-container>
		</v-content>
		
		<v-footer app fixed>
			<span>&copy; 2017</span>
		</v-footer>
	</v-app>
</template>

<script>
	export default {
		data: () => ( {
			drawer: null
		} ),
		props: {
			source: String
		}
	};
</script>

<style lang="scss">
	@import '@/styles/index.scss';
</style>
