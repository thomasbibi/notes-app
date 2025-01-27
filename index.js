import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import sequelize from './config/config.js';
import route from './routes/index.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1',route);


app.listen(5000,()=>{
    console.log("App is listening on 5000")
})

sequelize.sync().then(
  function () {
    console.log('== DB connection successful. ==');
  },
  function (err) {
    // catch error here
    console.log('SequelizeError: ', err.message);
  }
);

export default app;