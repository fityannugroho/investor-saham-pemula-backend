import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import * as fs from 'fs';
import { pipeline } from 'stream';
import { promisify } from 'util';
import { fileConstants } from './constant';
import { UploadFileOptions } from './types/upload-file-options.type';

@Injectable()
export class FilesService {
  private readonly pump = promisify(pipeline);

  /**
   * Upload a file to the server.
   * @param req The request object that contains the file to upload.
   * @param options The options to use when uploading the file. The default options are:
   * ```
   * destination  = 'fileConstants.PUBLIC_PATH'
   * rename       = (oldName) => Date.now() + '_' + oldName
   * ```
   * See the {@link UploadFileOptions} type for more details.
   * @returns The path to the uploaded file.
   * @throws {BadRequestException} If the request is not a multipart request or if the file is not provided.
   */
  async uploadFile(
    req: FastifyRequest,
    { destination, rename }: UploadFileOptions = {
      destination: fileConstants.PUBLIC_PATH,
      rename: (oldName) => `${Date.now()}_${oldName}`,
    },
  ): Promise<string> {
    if (!req.isMultipart) {
      throw new BadRequestException('Expected multipart request');
    }

    const { file, filename } = await req.file();
    if (file.readableLength === 0) {
      throw new BadRequestException('Empty file');
    }

    // Check if the destination directory exists. If not, create it.
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }

    const filePath = `${destination}/${rename(filename)}`;
    const writeStream = fs.createWriteStream(filePath);
    await this.pump(file, writeStream);
    return filePath;
  }

  /**
   * Get a file.
   * @param filePath The path to the file.
   * @returns The file's content.
   * @throws {NotFoundException} If the file is not found.
   */
  async getFile(filePath: string): Promise<fs.ReadStream> {
    if (fs.existsSync(filePath)) {
      return fs.createReadStream(filePath, { autoClose: true });
    }
    throw new NotFoundException('File not found');
  }

  /**
   * Delete a file.
   * @param filePath The path to the file.
   */
  async deleteFile(filePath: string): Promise<void> {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
}
