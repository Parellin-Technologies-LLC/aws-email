export default [
	{
		path: '/',
		name: 'Home',
		view: 'Home'
	},
	{
		path: '/auth',
		name: 'Auth',
		view: 'Auth'
	},
	{
		path: '/protected',
		name: 'Protected',
		view: 'Protected',
		meta: { requiresAuth: true }
	},
	{
		path: '/profile',
		name: 'Profile',
		view: 'Profile',
		meta: { requiresAuth: true }
	}
];
