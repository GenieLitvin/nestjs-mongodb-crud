import {
  Body,
  Controller,
  Delete,
  Get,
  Put,
  Param,
  Post,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { VideoService } from './video.service';
import { Video } from './schemas/video.schema';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createVideoDto: CreateVideoDto) {
    return await this.videoService.create(createVideoDto);
  }

  @Put(':id')
  update(
    @Body() updateVideoDto: UpdateVideoDto,
    @Param('id') id: string,
  ): Promise<Video> {
    return this.videoService.update(id, updateVideoDto);
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Video> {
    return this.videoService.getById(id);
  }

  @Get()
  async findAll(): Promise<Video[]> {
    return this.videoService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Video> {
    return this.videoService.remove(id);
  }
}
