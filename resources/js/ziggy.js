const Ziggy = {
	url: 'http://localhost',
	port: null,
	defaults: {},
	routes: {
		'sanctum.csrf-cookie': {
			uri: 'sanctum/csrf-cookie',
			methods: ['GET', 'HEAD'],
		},
		'ignition.healthCheck': {
			uri: '_ignition/health-check',
			methods: ['GET', 'HEAD'],
		},
		'ignition.executeSolution': {
			uri: '_ignition/execute-solution',
			methods: ['POST'],
		},
		'ignition.updateConfig': {
			uri: '_ignition/update-config',
			methods: ['POST'],
		},
		index: { uri: '/', methods: ['GET', 'HEAD'] },
		'privacy-policy': { uri: 'privacy-policy', methods: ['GET', 'HEAD'] },
		'terms-of-service': { uri: 'terms-of-service', methods: ['GET', 'HEAD'] },
		'auth.register.create': { uri: 'register', methods: ['GET', 'HEAD'] },
		'auth.register.store': { uri: 'register', methods: ['POST'] },
		'profile.edit': { uri: 'profile', methods: ['GET', 'HEAD'] },
		'profile.update': { uri: 'profile', methods: ['PATCH'] },
		'profile.destroy': { uri: 'profile', methods: ['DELETE'] },
		'users.list': { uri: 'users', methods: ['GET', 'HEAD'] },
		'users.create': { uri: 'users/create', methods: ['GET', 'HEAD'] },
		'users.show': {
			uri: 'users/{user}',
			methods: ['GET', 'HEAD'],
			parameters: ['user'],
			bindings: { user: 'id' },
		},
		'users.edit': {
			uri: 'users/{user}/edit',
			methods: ['GET', 'HEAD'],
			parameters: ['user'],
			bindings: { user: 'id' },
		},
		'users.store': { uri: 'users', methods: ['POST'] },
		'users.update': {
			uri: 'users/{user}',
			methods: ['PUT'],
			parameters: ['user'],
			bindings: { user: 'id' },
		},
		'users.destroy': {
			uri: 'users/{user}',
			methods: ['DELETE'],
			parameters: ['user'],
			bindings: { user: 'id' },
		},
		'users.destroyMultiple': { uri: 'users', methods: ['DELETE'] },
		'classes.list': { uri: 'curriculum', methods: ['GET', 'HEAD'] },
		login: { uri: 'login', methods: ['POST'] },
		'password.request': { uri: 'forgot-password', methods: ['GET', 'HEAD'] },
		'password.email': { uri: 'forgot-password', methods: ['POST'] },
		'password.reset': {
			uri: 'reset-password/{token}',
			methods: ['GET', 'HEAD'],
			parameters: ['token'],
		},
		'password.store': { uri: 'reset-password', methods: ['POST'] },
		'verification.notice': { uri: 'verify-email', methods: ['GET', 'HEAD'] },
		'verification.verify': {
			uri: 'verify-email/{id}/{hash}',
			methods: ['GET', 'HEAD'],
			parameters: ['id', 'hash'],
		},
		'verification.send': {
			uri: 'email/verification-notification',
			methods: ['POST'],
		},
		'password.confirm': { uri: 'confirm-password', methods: ['GET', 'HEAD'] },
		'password.update': { uri: 'password', methods: ['PUT'] },
		logout: { uri: 'logout', methods: ['POST'] },
	},
}
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
	Object.assign(Ziggy.routes, window.Ziggy.routes)
}
export { Ziggy }
