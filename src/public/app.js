const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const http = require('http');
const {Server} = require('socket.io');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const collabsRouter = require('./routes/collabs');
const registerRouter = require('./routes/register');
const productsRouter = require('./routes/products');
const servicesRouter = require('./routes/services');
const contactRouter = require('./routes/contact');
const chatRouter = require('./routes/chat');
const groupChatRouter = require('./routes/group-chat');
const orderRouter = require('./routes/order');
const homeRouter = require('./routes/home');
const stockRouter = require('./routes/stock');
const rolesRouter = require('./routes/roles');
var favicon = require('serve-favicon');


const chatonlineRouter = require('./routes/chat-online');


const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.locals.title = "Solopods";
app.locals.openChats = new Set();
app.locals.openChats.add('group-chat');


io.on('connection', (socket) => {
  console.log("New user connection");
  // Cuando se recibe un mensaje por un chat, se reenvía a todos los participantes
  app.locals.openChats.forEach(chat => {
    socket.on(chat, (msg) => {
      // Reenviamos el mensaje a todos los usuarios conectados
      io.emit(chat, msg);
    });
  });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: "Solopods solo hay uno",
  resave: false,
  saveUninitialized: true
}));

app.use((req,res,next) => {
  const message = req.session.message;
  const error = req.session.error;
  let chat = req.session.chat;
  delete req.session.message;
  delete req.session.error;
  
  res.locals.message = "";
  res.locals.error = "";
  if(message) res.locals.message = `<p>${message}</p>`;
  if(error) res.locals.error = `<p>${error}</p>`;
  if (!app.locals.openChats.has(chat)) app.locals.openChats.add(chat);
  next();
});

app.use('/', indexRouter);
app.use('/home', homeRouter);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/collabs', collabsRouter);
app.use('/products', productsRouter);
app.use('/services', servicesRouter);
app.use('/contact', contactRouter);
app.use('/stock', restricted, stockRouter);
app.use('/order', restricted, orderRouter);
app.use('/roles', restricted, rolesRouter);

app.use('/chat', restricted, checkRoomExists, chatRouter);
app.use('/group-chat', restricted, groupChatRouter);
app.use('/chat-online', restricted, chatonlineRouter);

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/logout', (req,res) =>{
  req.session.destroy();
  res.redirect("/");
});

// Favicon
app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

function restricted(req, res, next){
  if(req.session.user){
    next();
  } else {
    res.redirect("/login");
  }
}


// Función que comprueba si la sala a la que se desea unir el usuario existe
function checkRoomExists(req, res, next) {
  console.log(req.session.chat);
  console.log(app.locals.openChats);
  if (req.session.chat && app.locals.openChats.has(req.session.chat)) {
    next();
  } else {
    // Si la sala no existe, se muestra un mensaje de error
    req.session.error = 'Error: La sala indicada no existe';
    res.redirect('/');
  }
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = { app, server};
