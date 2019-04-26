<template>
	<v-data-table
		v-model="selected"
		:headers="headers"
		:items="emailData"
		:loading="isLoading"
		:pagination.sync="pagination"
		:total-items="estimateItemsInFolder"
		select-all
		item-key="key"
		class="elevation-1">
		
		<template v-slot:headers="props">
			<tr>
				<th>
					<v-checkbox
						:input-value="props.all"
						:indeterminate="props.indeterminate"
						primary
						hide-details
						@click.stop="toggleAll"
					></v-checkbox>
				</th>
				
				<th
					v-for="header in props.headers"
					:key="header.text"
					:class="[
						'column sortable',
						pagination.descending ? 'desc' : 'asc',
						header.value === pagination.sortBy ? 'active' : ''
					]"
					@click="changeSort(header.value)">
					
					<v-icon small>arrow_upward</v-icon>
					{{ header.text }}
				</th>
			</tr>
		</template>
		
		<v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
		
		<template v-slot:items="props">
			<tr :active="props.selected" @click="props.selected = !props.selected">
				<td>
					<v-checkbox
						:input-value="props.selected"
						primary
						hide-details
					></v-checkbox>
				</td>
				
				<td>{{ props.item.from }}</td>
				<td class="text-xs-right">{{ props.item.subject }}</td>
				<td class="text-xs-right">{{ props.item.ts }}</td>
			</tr>
		</template>
	
	</v-data-table>
</template>

<script>
	import { mapActions, mapMutations, mapGetters } from 'vuex';
	
	export default {
		computed: {
			...mapGetters( 'email', {
				isLoading: 'getIsLoading',
				currentFolder: 'getCurrentFolder',
				headers: 'getEmailHeaders',
				emailData: 'getEmailData',
				lastEvaluatedKey: 'getLastEvaluatedKey',
				estimateItemsInFolder: 'getEstimateItemsInFolder'
			} )
		},
		data() {
			return {
				search: '',
				pagination: {
					descending: true,
					sortBy: 'ts'
				},
				selected: [],
				paginationIndex: {}
			};
		},
		watch: {
			pagination: {
				async handler() {
					const
						{
							page,
							rowsPerPage: Limit
						} = this.pagination;
					
					const
						folder = this.currentFolder,
						opts   = {
							Limit
						};
					
					this.paginationIndex[ page ] = { ...this.lastEvaluatedKey };
					opts.ExclusiveStartKey       = this.paginationIndex[ page ];
					opts.folder                  = folder;
					
					await this.listFolder( opts );
				},
				deep: true
			}
		},
		methods: {
			...mapActions( 'email', [
				'listFolder',
				'countItemsInFolder'
			] ),
			...mapMutations( 'email', [ 'setPageLimit' ] ),
			toggleAll() {
				if( this.selected.length ) {
					this.selected = [];
				} else {
					this.selected = this.emailData.slice();
				}
			},
			changeSort( column ) {
				if( this.pagination.sortBy === column ) {
					this.pagination.descending = !this.pagination.descending;
				} else {
					this.pagination.sortBy     = column;
					this.pagination.descending = false;
				}
			}
		},
		mounted() {
			setTimeout(
				async () => {
					const { rowsPerPage: Limit } = this.pagination;
					
					this.setPageLimit( Limit );
					await this.countItemsInFolder();
					await this.listFolder();
				}, 1000
			);
		}
	};
</script>
