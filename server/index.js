const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { syncAndSeed } = require('./db');

app.use('/dist', express.static(path.join(__dirname, '..', 'dist')));
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(cors());
app.use(express.json());

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '..', 'src', 'index.html')));

app.use('/api', require('./api/routes'));

const init = async() => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex) {
    console.log(ex);
  }
};

init();

