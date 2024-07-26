// src/controller/UploadController.ts
import { Controller, Post, Files, Context } from '@midwayjs/core';
import { OSSService } from '../service/OSSService';

@Controller('/upload')
export class UploadController {
    ctx: Context;

    constructor(private ossService: OSSService) { }

    @Post('/')
    async uploadFile(@Files() files) {
        const file = files.file[0]; // 获取上传的文件
        if (!file) {
           
            return { success: false, message: 'No file uploaded' };
        }

        try {
            const result = await this.ossService.put(file.filename, file.buffer);
            return { success: true, url: result.url };
        } catch (err) {
          
            console.error('Error uploading file:', err);
            return { success: false, message: 'Upload failed' };
        }
    }
}
