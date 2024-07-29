import { OSSService } from '@midwayjs/oss';
import { Provide, Inject } from '@midwayjs/core';
import { join } from 'path';
import * as fs from 'fs';

@Provide()
export class OSS_Service {

    @Inject()
    ossService: OSSService;

    async upload(file: any) {
        const localFilePath = join(__dirname, '../../uploads', file.filename);
        console.log("保存到了" + localFilePath)
        try {
            // 保存文件到本地
            console.log("开始保存了" + localFilePath)
            fs.writeFileSync(localFilePath, file.data);

            // 上传文件到 OSS
            console.log("开始上传了")
            const result = await this.ossService.put(`/uploads/${file.filename}`, localFilePath);

            // 删除本地文件
            console.log("开始删除了" + localFilePath)
            fs.unlinkSync(localFilePath);

            return {
                success: true,
                url: result.url,
            };
        } catch (error) {
            console.error('File upload failed:', error);
            throw new Error('File upload failed');
        }
    }

    async getFileUrl(filePath: string) {
        // 获取文件的签名 URL，默认有效期为3600秒（1小时）
        const url = this.ossService.signatureUrl(filePath, { expires: 3600 });
        return url;
    }
}
