<template>
	<v-alert
		v-bind="$attrs"
		v-if="active"
		:type="type"
		:icon="icon"
		:value="true"
		v-on="$listeners"
		transition="fade-transition">
		{{ msg }}
	</v-alert>
</template>

<script>
	// TODO::: clean up this module
	export default {
		name: 'NotificationBar',
		inheritAttrs: false,
		props: {
			_active: {
				type: Boolean,
				default: false
			},
			get active() {
				return this._active;
			},
			set active( v ) {
				this._active = v;
				
				clearTimeout( this.activeTimer );
				
				if( v ) {
					this.activeTimer = setTimeout(
						() => {
							console.log( 'kill it' );
							this.active = false;
						}, 5000
					);
				}
			},
			type: {
				type: String,
				default: 'error'
			},
			icon: {
				type: String,
				default: 'mdi-warning'
			},
			msg: {
				type: String,
				default: 'An error occurred'
			}
		},
		data() {
			return {
				// $active: false,
				// activeTimer: null
				// get active() {
				// 	return this.$active;
				// },
				// set active( v ) {
				// 	this.$active = v;
				//
				// 	if( v ) {
				// 		clearTimeout( this.activeTimer );
				// 		this.activeTimer = setTimeout(
				// 			() => this.active = false, 5000
				// 		);
				// 	}
				// }
			};
		}
	};
</script>
