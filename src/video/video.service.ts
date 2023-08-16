import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { Video } from './schemas/video.schema';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';

@Injectable()
export class VideoService {
  constructor(
    @Inject(Video.name)
    private readonly videoModel: Model<Video>,
  ) {}

  async create(createVideoDto: CreateVideoDto): Promise<Video> {
    const createdVideo = await this.videoModel.create(createVideoDto);
    return createdVideo;
  }
  async update(id: string, videoDto: UpdateVideoDto): Promise<Video> {
    return this.videoModel.findByIdAndUpdate(id, videoDto, {
      new: true,
    });
  }
  async remove(id: string): Promise<Video> {
    return this.videoModel.findByIdAndRemove(id);
  }
  async findAll(): Promise<Video[]> {
    return this.videoModel.find().exec();
  }
  async getById(id: string): Promise<Video> {
    return this.videoModel.findById(id);
  }
}
