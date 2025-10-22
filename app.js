const express = require('express');
const path = require('path');
const postsRouter = require('./routes/posts');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const cors = require('cors');
const app = express();

app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/posts', postsRouter);
app.use('/api/login', loginRouter);
app.use('/api/signup', signupRouter);

app.listen(3000, () => {
  console.log('server up');
});
