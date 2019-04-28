<template>
	<v-data-table
		v-model="selected"
		:headers="headers"
		:items="emailData"
		:loading="isLoading"
		:pagination.sync="pagination"
		:total-items="estimateItemsInFolder"
		select-all
		item-key="key">
		
		<template slot="headers" slot-scope="props">
			<tr>
				<th>
					<v-checkbox
						:input-value="props.all"
						:indeterminate="props.indeterminate"
						primary
						hide-details
						@click.stop="toggleAll">
					</v-checkbox>
				</th>
				
				<th
					v-for="header in props.headers"
					:key="header.text"
					:class="[
						'column sortable',
						pagination.descending ? 'desc' : 'asc',
						header.value === pagination.sortBy ? 'active' : ''
					]"
					@click="changeSort( header.value )">
					
					<v-icon small>arrow_upward</v-icon>
					{{ header.text }}
				</th>
			</tr>
		</template>
		
		<v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
		
		<template slot="items" slot-scope="props">
			<tr :active="props.selected"
				:style="{ backgroundColor: ( !props.item.read ? 'rgba( 0, 211, 238, 0.25 )' : 'white' ) }">
				<td>
					<v-checkbox
						:input-value="props.selected"
						@click="props.selected = !props.selected"
						primary
						hide-details>
					</v-checkbox>
				</td>
				
				<td class="text-xs-center"
					@click="openEmailModal( props )">
					{{ props.item.fromUser }}
				</td>
				<td class="text-xs-center"
					@click="openEmailModal( props )">
					{{ props.item.subject }}
				</td>
				<td class="text-xs-center"
					@click="openEmailModal( props )">
					{{ props.item.timeFrom }}
				</td>
			</tr>
		</template>
	</v-data-table>
</template>

<script>
	import { mapActions, mapMutations, mapGetters } from 'vuex';
	
	// TODO::: swap v-data-table to scroll loading
	// https://stackoverflow.com/questions/52425086/scrollable-data-tables-using-vuetify
	
	export default {
		name: 'EmailList',
		data() {
			return {
				search: '',
				pagination: {
					sortBy: 'ts'
				},
				selected: [],
				paginationIndex: {}
			};
		},
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
		watch: {
			pagination: {
				descending: false,
				sortBy: 'ts',
				async handler() {
					const
						{
							page,
							rowsPerPage: Limit
						} = this.pagination;
					
					const
						folder = this.currentFolder,
						opts   = { Limit };
					
					console.log( this.pagination );
					
					if( !this.paginationIndex.hasOwnProperty( page ) ) {
						this.paginationIndex[ page ] = { ...this.lastEvaluatedKey };
					}
					
					opts.ExclusiveStartKey = this.paginationIndex[ page ];
					opts.folder            = folder;
					opts.ScanIndexForward  = this.pagination.descending;
					
					await this.listFolder( opts );
				},
				deep: true
			}
		},
		methods: {
			...mapActions( 'email', [
				'listFolder',
				'countItemsInFolder',
				'loadEmail'
			] ),
			...mapMutations( 'email', [ 'setPageLimit' ] ),
			openEmailModal( email ) {
				this.loadEmail( email.item );
			},
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
					// await this.listFolder();
				}, 1000
			);
		}
	};
</script>
