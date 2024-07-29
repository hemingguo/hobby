import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';
import * as axios from '@midwayjs/axios';
import * as mongoose from '@midwayjs/mongoose';
import * as typegoose from '@midwayjs/typegoose';
import * as crossDomain from '@midwayjs/cross-domain';
import * as oss from '@midwayjs/oss';

import * as upload from '@midwayjs/upload';
@Configuration({
  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
    mongoose,
    typegoose,
    axios,
    crossDomain,
    oss,
    upload,
  ],
  importConfigs: [join(__dirname, './config')],
})


export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    // add middleware
    
    this.app.useMiddleware([ReportMiddleware]);
    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
