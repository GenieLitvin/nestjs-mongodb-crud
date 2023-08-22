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
import {
  ApiBasicAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBody,
} from '@nestjs/swagger';
import { VideoService } from './video.service';
import { Video } from './schemas/video.schema';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@ApiBasicAuth()
@ApiTags('video')
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) {}

  @Post()
  @ApiOperation({ summary: 'Create video question' })
  @ApiBody({
    description: 'Video record',
    type: Video,
  })
  @ApiResponse({
    status: 201,
    description: 'Video created',
    type: Video,
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createVideoDto: CreateVideoDto) {
    return await this.videoService.create(createVideoDto);
  }

  @ApiOperation({ summary: 'Update video question' })
  @ApiResponse({
    status: 200,
    description: 'Updated',
  })
  @ApiBody({
    description: 'Video record',
    type: Video,
  })
  @Put(':id')
  update(
    @Body() updateVideoDto: UpdateVideoDto,
    @Param('id') id: string,
  ): Promise<Video> {
    return this.videoService.update(id, updateVideoDto);
  }

  @ApiOperation({ summary: 'Get video question by id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Video,
  })
  @Get(':id')
  getOne(@Param('id') id: string): Promise<Video> {
    return this.videoService.getById(id);
  }

  @ApiOperation({ summary: 'Get all video questions' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [Video],
  })
  @Get()
  async findAll(): Promise<Video[]> {
    return this.videoService.findAll();
  }

  @ApiOperation({ summary: 'Delete video question by id' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Video> {
    return this.videoService.remove(id);
  }
}
