// src/service/OSSService.ts
import { Provide, Config } from '@midwayjs/core';
import * as OSS from 'ali-oss';

@Provide()
export class OSSService {
    private client: OSS;

    @Config('oss')
    ossConfig;

    constructor() {
        this.client = new OSS({
            region: this.ossConfig.region,
            accessKeyId: this.ossConfig.accessKeyId,
            accessKeySecret: this.ossConfig.accessKeySecret,
            bucket: this.ossConfig.bucket,
        });
    }

    // 上传文件到 OSS
    async put(name: string, file: Buffer | string) {
        try {
            const result = await this.client.put(name, file);
            return result;
        } catch (err) {
            console.error('Error uploading to OSS:', err);
            throw err;
        }
    }

    // 从 OSS 获取文件
    async get(name: string) {
        try {
            const result = await this.client.get(name);
            return result;
        } catch (err) {
            console.error('Error getting from OSS:', err);
            throw err;
        }
    }
}
