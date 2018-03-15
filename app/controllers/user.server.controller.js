// 登录
export async function login(ctx) {
	const { User } = ctx.orm();
	const { username, password } = ctx.request.body;

	if (!username) {
		ctx.body = { 
			data: {

			},
			returnCode: '4000',
			message: 'username is required'
		};
		return;
	}

	if (!password) {
		ctx.body = { 
			data: {
				
			},
			returnCode: '4000',
			message: 'password is required'
		};
		return;
	}

	const user = await User.find({
		where: {
			username: username,
			password: password
		}
	});

	if (!user) {
		ctx.body = { 
			data: {
				
			},
			returnCode: '4003',
			message: 'password is invalid'
		};
		return;
	}

	ctx.session.authenticated = true;
	ctx.session.user = user;

	ctx.body = { 
		data: {
			user
		},
		returnCode: '1001',
		message: 'success' 
	};
}

export async function info(ctx) {
	let user = ctx.session.user;
	let authenticated = ctx.session.authenticated;

	if (authenticated) {
		ctx.body = {
			data: {
				user,
				authenticated
			},
			returnCode: '1001',
			message: 'success' 
		}
	} else {
		ctx.body = {
			data: {
				user,
				authenticated
			},
			returnCode: '2002',
			message: 'fail' 
		}
	}
}

// 退出登录
export async function logout(ctx, next) {
	if (ctx.session.authenticated) {
		delete ctx.session.authenticated;
		delete ctx.session.user;

		ctx.body = {
			data: {},
			returnCode: '1001',
			message: 'success' 
		}
	} else {
		ctx.body = {
			data: {},
			returnCode: '2002',
			message: 'faild' 
		}
	}
}