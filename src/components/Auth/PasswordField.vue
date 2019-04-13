<template>
	<v-text-field
		prepend-icon="mdi-lock"
		type="password"
		name="password"
		color="success"
		:label="label"
		:rules="passwordRules"
		v-model="content"
		@input="handleInput"
		v-on:keyup.enter="onKeyupEnter"
		required>
	</v-text-field>
</template>

<script>
	export default {
		name: 'PasswordField',
		props: {
			onKeyupEnter: {
				type: Function
			},
			value: {
				type: String
			},
			label: {
				type: String,
				default: 'Password'
			}
		},
		data() {
			return {
				content: this.value,
				passwordRules: [
					v => !!v || 'Password is required',
					v => ( v && v.length >= 8 ) || 'Password must have at least 8 characters',
					v => ( v && /[A-Z]/.test( v ) ) || 'Password must have at least 1 uppercase character',
					v => ( v && /[a-z]/.test( v ) ) || 'Password must have at least 1 lowercase character',
					v => ( v && /[0-9]/.test( v ) ) || 'Password must have at least 1 number'
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
