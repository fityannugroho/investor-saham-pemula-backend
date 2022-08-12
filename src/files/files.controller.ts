import { Controller, Post, Req } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  async uploadFile(@Req() req: FastifyRequest) {
    await this.filesService.uploadFile(req);
    return {
      statusCode: 201,
      message: 'File uploaded successfully',
    };
  }
}
