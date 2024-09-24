const express = require('express');
const postsRouter = require('./routes/posts');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const cors = require('cors');
const app = express();
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/posts', postsRouter);
app.use('/api/login', loginRouter);
app.use('/api/signup', signupRouter);

app.listen(3000, () => {
  console.log('server up');
});
