const express = require('express')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const compression = require('compression')
const cors = require('cors')

const AppError = require('./utils/appError')
const globalErrorHandler = require('./controllers/errorController.js')

//importing routers from routes folder
const guardRouter = require('./routes/guardRoutes')
const userRouter = require('./routes/userRoutes')
const clientRouter = require('./routes/clientRoutes')
const locationRouter = require('./routes/locationRoutes')

// initial express with app
const app = express()

/** GLOBAL MIDDLEWARE
 *  add express.json() * express middleware * to get access to
 * data (data from client) on the request body
 * # app.use # allows you to add middleware to your middleware stack
 */


//allows CORS
// app.use(cors())
// app.options('*', cors())

app.use(cors({
    origin: '*'
}));

// Set security HTTP headers
app.use(helmet())

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }))

// morgan is logging http requests in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Rate limit => prevents too many request from one IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour'
})

app.use('/api', limiter)

// Data sanitization again NoSQL query injection
app.use(mongoSanitize())

// Data sanitization against XSS
app.use(xss())

// prevent parameter pollution
app.use(
  hpp({
    // whitelist: [] // add parameters that can be duplicated
  })
)

app.use(compression())


// allows us to serve static files in the public folder
// app.use(express.static(`${__dirname / public}`));

// middleware example
app.use((req, res, next) => {
  console.log('Hello from the middleware...👊🏾')

  // always call the next function, code hangs if this is not called.
  next()
})

// Routes
// app.get("/api/v1/guards", getAllGuards);
// app.post("/api/v1/guards", createGuard);
// app.get("/api/v1/guards/:id", getGuard);
// app.patch("/api/v1/guards/:id", updateGuard);
// app.delete("/api/v1/guards/:id", deleteGuard);

// Routes Middlewares*
app.use('/api/v1/guards', guardRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/clients', clientRouter)
app.use('/api/v1/zones', locationRouter)

//catch all unhandled routes all(get,post,update,delete) * == all
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404))
})

// Global error handler
app.use(globalErrorHandler)

module.exports = app
