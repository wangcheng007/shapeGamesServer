// koa服务器实例
import Koa from 'koa';
import logger from 'koa-logger';
import bodyParser from 'koa-bodyparser';
import session from 'koa-session';
import view from 'koa-view';
import ORM from 'koa-orm';

import cors from '../app/middlewares/cors';

import config from './config';
import routes from '../app/routes/index';

export default function() {
	console.log('init koa server...');

	const app = new Koa();
	app.use(bodyParser());
	app.use(logger());

	// session
	app.keys = config.keys;
	app.use(session(config.session, app));

	// ORM
	app.orm = ORM(config.database);
	app.use(app.orm.middleware);
	

	console.log('start connect jcdb...');
	// sync detabase
	app.orm.database().sync({
		force: false
	}).then( () => {
		console.log('success!!!');
	});

	// middlewares
	cors(app, config);

	// Routes
	routes(app, config);

	console.log('success koa server...');
	return app;
}