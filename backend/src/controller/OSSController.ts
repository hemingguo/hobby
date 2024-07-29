import { Controller, Post, Files, Inject } from '@midwayjs/core';
import { OSS_Service } from '../service/OSSService';

@Controller('/upload')
export class OSSController {

    @Inject()
    ossService: OSS_Service;

    @Post('/')
    async upload(@Files() files: any[]) {
        console.log("接收到的文件:", files);

        if (!files || files.length === 0) {
            console.log("No file uploaded");
            return {
                success: false,
                message: 'No file uploaded',
            };
        }

        const file = files[0];
        console.log("Processing file:", file);
        try {
            const result = await this.ossService.upload(file);
            console.log("Upload result:", result);
            return {
                success: true,
                url: result.url,
            };
        } catch (error) {
            console.error('Upload error:', error);
            return {
                success: false,
                message: 'Upload failed',
            };
        }
    }
}
