import { BadRequestException, Injectable } from '@nestjs/common';
import * as fastify from 'fastify';
import * as fs from 'fs';
import { pipeline } from 'stream';
import * as util from 'util';
import { fileConstants } from './constant';

@Injectable()
export class FilesService {
  /**
   * Upload a file to the server.
   * @param req The request object.
   * @throws {BadRequestException} If the request is not a multipart request.
   */
  async uploadFile(req: fastify.FastifyRequest) {
    if (!req.isMultipart) {
      throw new BadRequestException('Expected multipart request');
    }

    const multipart = req.multipart(
      async (field, file, filename) => {
        // Upload the file
        const pump = util.promisify(pipeline);
        const writeStream = fs.createWriteStream(
          `${fileConstants.publicPath}/${filename}`,
        );
        await pump(file, writeStream);
      },
      (err) => {
        // Uploading finished
        if (err) {
          throw err;
        }
      },
    );

    multipart.on('field', (key, value) => {
      console.log(`Field ${key} is ${value}`);
    });
  }
}
