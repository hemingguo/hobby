import { MidwayConfig } from '@midwayjs/core';
import { User } from '../entity/user';
import { Circle } from '../entity/circle';
import { Post } from '../entity/post';
import { Comment } from '../entity/comment';

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
      entities: [User, Circle, Post, Comment],
    },
  },
  cors: {
    origin: '*',  // 允许所有来源

  },
  controller: {
    directories: ['src/controller'],
  },
  oss: {
    region: 'oss-cn-shanghai', // 替换为你的OSS区域
    accessKeyId: 'LTAI5tADsPiNirkRAB2noLyS', // 替换为你的AccessKeyId
    accessKeySecret: 'hixCuJrk571WAnIk3EdzkistzhQ5tB', // 替换为你的AccessKeySecret
    bucket: 'jxhobby', // 替换为你的Bucket名称
  },
} as MidwayConfig;
