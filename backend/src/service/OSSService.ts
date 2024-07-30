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
        console.log("当前目录:", __dirname);
        console.log("本地文件路径:", localFilePath);

        try {
            // 将字符串路径转换为 Buffer
            if (typeof file.data === 'string') {
                file.data = fs.readFileSync(file.data);
            }

            // 确保 file.data 为 Buffer 对象
            if (!(file.data instanceof Buffer)) {
                throw new Error("文件数据不是 Buffer 对象");
            }

            // 保存文件到本地
            console.log("开始保存到本地...");
            fs.writeFileSync(localFilePath, file.data);
            console.log("文件成功保存到本地");

            // 上传文件到 OSS
            console.log("开始上传到 OSS...");
            const result = await this.ossService.put(`/uploads/${file.filename}`, localFilePath);
            console.log("OSS 上传结果:", result);

            // 删除本地文件（如果需要）
            console.log("开始删除本地文件...");
            fs.unlinkSync(localFilePath);
            console.log("本地文件删除成功");

            return {
                success: true,
                url: result.url,
            };
        } catch (error) {
            console.error('文件上传失败:', error);
            throw new Error('文件上传失败');
        }
    }

    async getFileUrl(filePath: string) {
        // 获取文件的签名 URL，默认有效期为3600秒（1小时）
        const url = this.ossService.signatureUrl(filePath, { expires: 3600 });
        return url;
    }
}