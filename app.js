const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const mongoose = require('mongoose');
const connectMongodbSession = require('connect-mongodb-session');
const path = require('path');
const config = require('config');
const exhb = require('express-handlebars');
const csrf = require('csurf');
const flash = require('connect-flash');


//-----------------------middleware
const authCheck = require('./middlewares/session-middleware');
const var_middleware = require('./middlewares/variables-middleware');
const cors_middleware = require('./middlewares/cors-middleware');
//-----------------------end middleware


//-----------------------require routes
const auth_router = require('./routes/auth/auth-router');
const mysticker_router = require('./routes/sticker/mysticker-router');
const template_router = require('./routes/template/template-router');
const handlers_controller = require('./controllers/handlers-controller');
//-----------------------end require routes


const MongoStore = connectMongodbSession(session);
const app = express();
app.use(helmet());


//-----------------------handlebars
const hbs = exhb.create({
	defaultLayout: 'main',
	extname: 'hbs',
	runtimeOptions: {
		allowProtoPropertiesByDefault: true,
		allowProtoMethodsByDefault: true
	}
});
app.engine('hbs', hbs.engine);
app.set('views', 'views');
app.set('view engine', 'hbs');
//-----------------------end handlebars


//-----------------------init app store for mongo
const store = new MongoStore({
	collection: "sessions",
	uri: config.get("mongoUri"),
});
app.use(session({
	secret: config.get("secret"),
	resave: false,
	saveUninitialized: false,
	store: store,
	cookie: { maxAge: 1000 * 60 * 60 * 24, },
	httpOnly: true,
	secure: true
}));


app.use(express.static(__dirname + '/public'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css')); //add npm i bootstrap and this is line to allow and enable use css styles <link rel="stylesheet" href="/css/bootstrap.min.css">
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); //add npm i bootstrap and this is line to allow and enable use js <script src="/js/bootstrap.min.js"></script>
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
// app.use(csrf())
app.use(var_middleware);
app.use(cors_middleware);


//-----------------------use routes
app.use('/', auth_router);
app.use('/auth', auth_router);
app.use('/my-stickers', authCheck, mysticker_router);
app.use('/templates', authCheck, template_router);
// custom 404 page
app.use(handlers_controller.not_found);
// custom 500 page
app.use(handlers_controller.not_found);


//-----------------------start app with mongo connect
const PORT = process.env.PORT || config.get("port");
async function start() {
	try {
		await mongoose.connect(config.get("mongoUri"), {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		app.listen(PORT, () =>
			console.log(` Приложение запущено\. \n Server: http://localhost:${PORT} `)
		);
	} catch (error) {
		console.log("Server error ", { error: error.message });
		process.exit(1);
	}
}
start();
