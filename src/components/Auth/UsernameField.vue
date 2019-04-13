<template>
	<v-text-field
		prepend-icon="mdi-account"
		type="text"
		name="username"
		label="Username"
		color="success"
		:rules="usernameRules"
		v-model="content"
		@input="handleInput"
		v-on:keyup.enter="onKeyupEnter"
		required
		autofocus>
	</v-text-field>
</template>

<script>
	export default {
		name: 'UsernameField',
		props: {
			onKeyupEnter: {
				type: Function
			},
			value: {
				type: String
			}
		},
		data() {
			return {
				content: this.value,
				usernameRules: [
					v => !!v || 'Username is required',
					v => ( v && v.length >= 5 ) || 'Username must have at least 5 characters'
				]
			};
		},
		methods: {
			handleInput() {
				this.$emit( 'input', this.content );
			}
		}
	};
</script>
