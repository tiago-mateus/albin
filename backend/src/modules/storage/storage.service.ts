import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { v4 as uuid } from 'uuid';

@Injectable()
export class StorageService {
  private s3: AWS.S3;
  private bucket = process.env.S3_BUCKET || 'albin-uploads';

  constructor() {
    this.s3 = new AWS.S3({
      region: process.env.S3_REGION || 'us-east-1',
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY || 'fake',
        secretAccessKey: process.env.S3_SECRET_KEY || 'fake',
      },
      signatureVersion: 'v4',
    });
  }

  async generatePresignedUrl(fileName: string) {
    const key = `${uuid()}-${fileName}`;
    const params = {
      Bucket: this.bucket,
      Key: key,
      Expires: 300,
      ContentType: 'image/jpeg',
    };
    const uploadUrl = await this.s3.getSignedUrlPromise('putObject', params);
    const fileUrl = `https://${this.bucket}.s3.amazonaws.com/${key}`;
    return { uploadUrl, fileUrl };
  }
}
