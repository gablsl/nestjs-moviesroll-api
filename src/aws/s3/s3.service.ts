import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';
import * as AWS from 'aws-sdk';
import * as fs from 'fs';

@Injectable()
export class S3Service {
  AWS_S3_BUCKET = process.env.AWS_BUCKET_NAME;
  s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const { originalname, mimetype, path } = file;

    const randomName = this.generateRandomFileName(originalname);
    const fileBuffer = file.buffer || fs.readFileSync(path);

    const s3Response = await this.s3_upload(
      fileBuffer,
      this.AWS_S3_BUCKET,
      randomName,
      mimetype,
    );
    return s3Response.Location;
  }

  async s3_upload(
    file: Buffer,
    bucket: string,
    name: string,
    mimetype: string,
  ) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: this.s3.config.region,
      },
    };

    try {
      const s3Response = await this.s3.upload(params).promise();
      return s3Response;
    } catch (error) {
      console.log(error);
      throw new Error('Error uploading file to S3');
    }
  }

  private generateRandomFileName(originalName: string): string {
    const fileExtension = originalName.split('.').pop();
    const randomString = crypto.randomBytes(16).toString('hex');
    return `${randomString}.${fileExtension}`;
  }
}
