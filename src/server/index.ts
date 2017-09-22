import * as restify from 'restify';
import * as path from 'path';
import * as chalk from 'chalk';
import * as logger from "morgan";
import { mongo, Mongoose } from 'mongoose';

import { CoreConfig } from '../common/config/core.config';
import { Api } from './api';


const mongoose = new Mongoose();
mongoose.set('debug', true);
const connection = mongoose.createConnection(CoreConfig.MONGO_URL);
connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', () => {
  console.log(chalk.green(`Connected to mongodb at ${ chalk.cyan(CoreConfig.MONGO_URL) }`));
  const server = restify.createServer();
  server.use(restify.plugins.acceptParser(server.acceptable));
  server.use(restify.plugins.queryParser());
  server.use(restify.plugins.bodyParser());
  // server.use(logger('dev'));

  new Api(server, connection);

  server.get(/\.*/, restify.plugins.serveStatic({
    directory: '../client',
    default: 'index.html',
    gzip: true
  }));

  server.listen(CoreConfig.PORT, function() {
    console.log(chalk.green(`${ CoreConfig.APP_NAME } listening at ${ chalk.cyan(`http://127.0.0.1:${ CoreConfig.PORT }${ CoreConfig.BASE_API }`) }`));
  });
});


