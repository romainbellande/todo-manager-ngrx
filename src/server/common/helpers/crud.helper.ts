import * as restify from 'restify';
import * as chalk from 'chalk';

import { Model, Document } from 'mongoose';
import { CoreConfig } from '../../../common/config/core.config';
import { CrudOptions } from '../interfaces';
import { Endpoint } from '../../../common/interfaces';

type Middleware = (req: restify.Request, res: restify.Response, next: restify.Next) => void;

export class Crud<T extends Document> {

  constructor(protected server: restify.Server,
              private endpoint: Endpoint,
              private MyModel: Model<T>,
              private options?: CrudOptions) {}

  public generate(): void {
    this.find();
    this.findById();
    this.create();
    this.update();
    this.replace();
    this.remove();
  }

  private create(middleware?: Middleware): void {
    this.displayEndpoint('create', this.url());
    this.server.post(this.url(), middleware || this.createMiddleware.bind(this));
  }

  private createMiddleware(req: restify.Request, res: restify.Response, next: restify.Next): void {
    const doc = new this.MyModel(req.body);
    doc.save((err, createdDoc) => {
      let data: any;
      res.send(err || createdDoc);
      next();
    });
  }

  private reqId(req: restify.Request): string {
    return req.params[this.endpoint.name + 'Id'];
  }

  private remove(middleware?: Middleware): void {
    this.displayEndpoint('remove', this.url(true));
    this.server.del(this.url(true), middleware || this.removeMiddleware.bind(this));
  }

  private removeMiddleware(req: restify.Request, res: restify.Response, next: restify.Next): void {
    this.MyModel.findByIdAndRemove(this.reqId(req), (err, docs) => {
      res.send(err || docs);
      next();
    });
  }

  private find(middleware?: Middleware): void {
    this.displayEndpoint('find', this.url());
    this.server.get(this.url(), middleware || this.findMiddleware.bind(this));
  }

  private findMiddleware(req: restify.Request, res: restify.Response, next: restify.Next): void {
    this.MyModel.find((err, docs) => {
      res.send(err || docs);
      next();
    });
  }

  private findById(middleware?: Middleware): void {
    this.displayEndpoint('findById', this.url(true));
    this.server.get(this.url(true), middleware || this.findByIdMiddleware.bind(this));
  }

  private findByIdMiddleware(req: restify.Request, res: restify.Response, next: restify.Next): void {
    this.MyModel.findById(this.reqId(req), (err, doc) => {
      res.send(err || doc);
    });
  }

  private displayEndpoint(method: string, url: string) {
    console.info('[' + chalk.cyan(method.toUpperCase()) + '] ' + chalk.grey(CoreConfig.BASE_URL + url));
  }

  private update(middleware?: Middleware): void {
    this.displayEndpoint('update', this.url(true));
    this.server.patch(this.url(true), middleware || this.updateMiddleware.bind(this));
  }

  private updateMiddleware(req: restify.Request, res: restify.Response, next: restify.Next): void {
    this.MyModel.findById(this.reqId(req), (err, doc) => {
      if (err) {
        res.send(err).status(500);
      } else {
        Object.assign(doc, req.body);
        if (doc) {
          doc.save((err, createdDoc) => {
            let data: any;
            res.send(err || createdDoc);
            next();
          });
        } else {
          res.send(err).status(500);
        }
      }
    });
  }

  private replace(middleware?: Middleware): void {
    this.displayEndpoint('replace', this.url(true));
    this.server.put(this.url(true), middleware || this.replaceMiddleware.bind(this));
  }

  private replaceMiddleware(req: restify.Request, res: restify.Response, next: restify.Next): void {
    this.MyModel.findById(this.reqId(req), (err, doc) => {
      if (err) {
        res.send(err).status(500);
      } else {
        doc = req.body;
        if (doc) {
          doc.save((err, createdDoc) => {
            let data: any;
            res.send(err || createdDoc);
            next();
          });
        } else {
          res.send(err).status(500);
        }
      }
    });
  }

  private getEndpoint(isSingle?: boolean) {
    const baseEndpoint = this.endpoint.plural ? this.endpoint.plural : this.endpoint.name + 's';
    const singleEndpoint = isSingle ? `/:${ this.endpoint.name }Id` : '';
    return `/${ baseEndpoint }${ singleEndpoint }`;
  }

  private url(single?: boolean): string {
    return CoreConfig.BASE_API + this.getEndpoint(single);
  }
}
