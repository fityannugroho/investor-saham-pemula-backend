import { Controller, Post, Req } from '@nestjs/common';
import * as fastify from 'fastify';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  async uploadFile(@Req() req: fastify.FastifyRequest) {
    await this.filesService.uploadFile(req);
    return {
      statusCode: 201,
      message: 'File uploaded successfully',
    };
  }
}
