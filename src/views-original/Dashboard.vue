<template>
	<v-container fill-height fluid grid-list-xl>
		<v-layout wrap>
			<v-flex md12 sm12 lg12>
				
				<material-card class="card-tabs" color="green">
					
					<v-flex slot="header">
						<v-tabs v-model="tabs" color="transparent" slider-color="white">
							<span class="subheading font-weight-light mr-3" style="align-self: center">
								Mail:
							</span>
							<v-tab class="mr-3">
								<v-icon class="mr-2">mdi-inbox-arrow-down</v-icon>
								Inbox
							</v-tab>
							<v-tab class="mr-3">
								<v-icon class="mr-2">mdi-inbox-arrow-down</v-icon>
								Sent
							</v-tab>
							<v-tab class="mr-3">
								<v-icon class="mr-2">mdi-calendar-edit</v-icon>
								Drafts
							</v-tab>
							<v-tab class="mr-3">
								<v-icon class="mr-2">mdi-delete-empty</v-icon>
								Trash
							</v-tab>
						</v-tabs>
					</v-flex>
					
					<v-data-table
						:headers="headers"
						:items="items"
						hide-actions>
						<template slot="headerCell" slot-scope="{ header }">
					<span
						class="font-weight-light text-warning text--darken-3"
						v-text="header.text">
					</span>
						</template>
						<template slot="items" slot-scope="{ index, item }">
							<td>{{ index + 1 }}</td>
							<td>{{ item.name }}</td>
							<td class="text-xs-right">{{ item.salary }}</td>
							<td class="text-xs-right">{{ item.country }}</td>
							<td class="text-xs-right">{{ item.city }}</td>
						</template>
					</v-data-table>
					
					<v-tabs-items v-model="tabs">
						<v-tab-item v-for="n in 3" :key="n">
							<v-list three-line>
								<v-list-tile @click="complete( 0 )">
									<v-list-tile-action>
										<v-checkbox :value="list[ 0 ]" color="green"/>
									</v-list-tile-action>
									<v-list-tile-title>
										Sign contract for "What are conference organized afraid of?"
									</v-list-tile-title>
									<div class="d-flex">
										<v-tooltip
											top
											content-class="top">
											<v-btn
												slot="activator"
												class="v-btn--simple"
												color="success"
												icon>
												<v-icon color="primary">mdi-pencil</v-icon>
											</v-btn>
											<span>Edit</span>
										</v-tooltip>
										<v-tooltip
											top
											content-class="top">
											<v-btn
												slot="activator"
												class="v-btn--simple"
												color="danger"
												icon>
												<v-icon color="error">mdi-close</v-icon>
											</v-btn>
											<span>Close</span>
										</v-tooltip>
									
									</div>
								</v-list-tile>
								<v-divider/>
								<v-list-tile @click="complete(1)">
									<v-list-tile-action>
										<v-checkbox
											:value="list[1]"
											color="success"/>
									</v-list-tile-action>
									<v-list-tile-title>
										Lines From Great Russian Literature? Or E-mails From My Boss?
									</v-list-tile-title>
									<div class="d-flex">
										<v-tooltip
											top
											content-class="top">
											<v-btn
												slot="activator"
												class="v-btn--simple"
												color="success"
												icon>
												<v-icon color="primary">mdi-pencil</v-icon>
											</v-btn>
											<span>Edit</span>
										</v-tooltip>
										
										<v-tooltip
											top
											content-class="top">
											<v-btn
												slot="activator"
												class="v-btn--simple"
												color="danger"
												icon>
												<v-icon color="error">mdi-close</v-icon>
											</v-btn>
											<span>Close</span>
										</v-tooltip>
									</div>
								</v-list-tile>
								<v-divider/>
								<v-list-tile @click="complete(2)">
									<v-list-tile-action>
										<v-checkbox :value="list[2]" color="success"/>
									</v-list-tile-action>
									<v-list-tile-title>
										Flooded: One year later, assessing what was lost and what was found when a
										ravaging rain swept through metro Detroit
									</v-list-tile-title>
									<div class="d-flex">
										<v-tooltip top content-class="top">
											<v-btn slot="activator" class="v-btn--simple" color="success" icon>
												<v-icon color="primary">mdi-pencil</v-icon>
											</v-btn>
											<span>Edit</span>
										</v-tooltip>
										<v-tooltip top content-class="top">
											<v-btn slot="activator" class="v-btn--simple" color="danger" icon>
												<v-icon color="error">mdi-close</v-icon>
											</v-btn>
											<span>Close</span>
										</v-tooltip>
									
									</div>
								</v-list-tile>
							</v-list>
						</v-tab-item>
					</v-tabs-items>
				</material-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	export default {
		data() {
			return {
				dailySalesChart: {
					data: {
						labels: [ 'M', 'T', 'W', 'T', 'F', 'S', 'S' ],
						series: [
							[ 12, 17, 7, 17, 23, 18, 38 ]
						]
					},
					options: {
						lineSmooth: this.$chartist.Interpolation.cardinal( {
							tension: 0
						} ),
						low: 0,
						high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
						chartPadding: {
							top: 0,
							right: 0,
							bottom: 0,
							left: 0
						}
					}
				},
				dataCompletedTasksChart: {
					data: {
						labels: [ '12am', '3pm', '6pm', '9pm', '12pm', '3am', '6am', '9am' ],
						series: [
							[ 230, 750, 450, 300, 280, 240, 200, 190 ]
						]
					},
					options: {
						lineSmooth: this.$chartist.Interpolation.cardinal( {
							tension: 0
						} ),
						low: 0,
						high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
						chartPadding: {
							top: 0,
							right: 0,
							bottom: 0,
							left: 0
						}
					}
				},
				emailsSubscriptionChart: {
					data: {
						labels: [ 'Ja', 'Fe', 'Ma', 'Ap', 'Mai', 'Ju', 'Jul', 'Au', 'Se', 'Oc', 'No', 'De' ],
						series: [
							[ 542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895 ]
						
						]
					},
					options: {
						axisX: {
							showGrid: false
						},
						low: 0,
						high: 1000,
						chartPadding: {
							top: 0,
							right: 5,
							bottom: 0,
							left: 0
						}
					},
					responsiveOptions: [
						[ 'screen and (max-width: 640px)', {
							seriesBarDistance: 5,
							axisX: {
								labelInterpolationFnc: function( value ) {
									return value[ 0 ];
								}
							}
						} ]
					]
				},
				headers: [
					{
						sortable: false,
						text: 'ID',
						value: 'id'
					},
					{
						sortable: false,
						text: 'Name',
						value: 'name'
					},
					{
						sortable: false,
						text: 'Salary',
						value: 'salary',
						align: 'right'
					},
					{
						sortable: false,
						text: 'Country',
						value: 'country',
						align: 'right'
					},
					{
						sortable: false,
						text: 'City',
						value: 'city',
						align: 'right'
					}
				],
				items: [
					{
						name: 'Dakota Rice',
						country: 'Niger',
						city: 'Oud-Tunrhout',
						salary: '$35,738'
					},
					{
						name: 'Minerva Hooper',
						country: 'Curaçao',
						city: 'Sinaai-Waas',
						salary: '$23,738'
					}, {
						name: 'Sage Rodriguez',
						country: 'Netherlands',
						city: 'Overland Park',
						salary: '$56,142'
					}, {
						name: 'Philip Chanley',
						country: 'Korea, South',
						city: 'Gloucester',
						salary: '$38,735'
					}, {
						name: 'Doris Greene',
						country: 'Malawi',
						city: 'Feldkirchen in Kārnten',
						salary: '$63,542'
					}
				],
				tabs: 0,
				list: {
					0: false,
					1: false,
					2: false,
					3: false
				}
			};
		},
		methods: {
			complete( index ) {
				this.list[ index ] = !this.list[ index ];
			}
		}
	};
</script>
