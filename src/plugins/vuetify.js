import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.use( Vuetify, {
	iconfont: 'mdi',
	theme: {
		primary: '#3498db',
		secondary: '#34495e',
		success: '#2ecc71',
		danger: '#e74c3c',
		warning: '#f1c40f',
		'warning-dark': '#ffa21a',
		info: '#00d3ee',
		light: '#ecf0f1',
		dark: '#2c3e50',
		tertiary: '#495057',
		accent: '#95a5a6',
		error: '#c0392b'
	}
} );
