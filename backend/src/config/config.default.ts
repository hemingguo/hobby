import { MidwayConfig } from '@midwayjs/core';
import { User } from '../entity/user';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1721640634128_1039',
  koa: {
    port: 7001,
  },
  mongoose: {
    client: {
      uri: 'mongodb+srv://sosljsos:123321@cluster0.utoqxov.mongodb.net/hobby?retryWrites=true&w=majority&appName=Cluster0&tls=true',
      options: {
        ssl: true,  // 确保使用SSL
        serverApi: {
          version: '1',
          strict: true,
          deprecationErrors: true,
        },
        connectTimeoutMS: 100000,  // 连接超时时间设置为100秒
        socketTimeoutMS: 100000,   // 套接字超时时间设置为100秒
      },
      entities: [User],
    },
  },
  cors: {
    origin: '*',  // 允许所有来源

  },
  controller: {
    directories: ['src/controller'],
  },
} as MidwayConfig;
