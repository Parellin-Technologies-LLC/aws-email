export default [
	{
		path: '/',
		name: 'Home',
		view: 'Home',
		meta: {
			isDashboard: false
		}
	},
	{
		path: '/auth',
		name: 'Auth',
		view: 'Auth',
		meta: {
			isDashboard: false
		}
	},
	{
		path: '/dashboard',
		name: 'Dashboard',
		view: 'Dashboard',
		meta: {
			isDashboard: true,
			requiresAuth: true
		}
	},
	{
		path: '/email',
		name: 'Email',
		view: 'Email',
		meta: {
			isDashboard: true,
			requiresAuth: true
		}
	},
	{
		path: '/profile',
		name: 'Profile',
		view: 'Profile',
		meta: {
			isDashboard: true,
			requiresAuth: true
		}
	}
];
