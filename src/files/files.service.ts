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
    {
      destination,
      rename,
      allowedMimetypes,
      maxFileSize,
    }: UploadFileOptions = {
      destination: fileConstants.PUBLIC_PATH,
      rename: (oldName) => `${Date.now()}_${oldName}`,
      allowedMimetypes: fileConstants.ALLOWED_MIMETYPES,
      maxFileSize: fileConstants.MAX_FILE_SIZE,
    },
  ): Promise<string> {
    if (!req.isMultipart) {
      throw new BadRequestException('Expected multipart request');
    }

    const { file, filename, mimetype } = await req.file({
      limits: { fileSize: maxFileSize },
    });

    if (file.readableLength === 0) {
      throw new BadRequestException('Empty file');
    }

    // Validate the mimetype
    if (!allowedMimetypes.includes(mimetype)) {
      throw new BadRequestException(
        `Invalid mimetype! Only ${allowedMimetypes.join(', ')} are allowed`,
      );
    }

    // Check if the destination directory exists. If not, create it.
    if (!fs.existsSync(destination)) {
      fs.mkdirSync(destination);
    }

    const filePath = `${destination}/${rename(filename)}`;
    const writeStream = fs.createWriteStream(filePath);
    await this.pump(file, writeStream);

    // Validate the file size.
    if (file.truncated) {
      // Delete the file if it was truncated.
      await this.deleteFile(filePath);
      throw new BadRequestException(
        `File is too large. Max: ${maxFileSize} bytes`,
      );
    }

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
      return fs.createReadStream(filePath);
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
