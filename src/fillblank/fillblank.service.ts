import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { Fillblank } from './schemas/fillblank.schema';
import { CreateFillblankDto } from './dto/create-fillblank.dto';
import { UpdateFillblankDto } from './dto/update-fillblank.dto';

@Injectable()
export class FillblankService {
  constructor(
    @Inject(Fillblank.name)
    private readonly fillblankModel: Model<Fillblank>,
  ) {}

  async create(createFillblankDto: CreateFillblankDto): Promise<Fillblank> {
    const createdFillblank = await this.fillblankModel.create(
      createFillblankDto,
    );
    return createdFillblank;
  }
  async update(
    id: string,
    fillblankDto: UpdateFillblankDto,
  ): Promise<Fillblank> {
    return this.fillblankModel.findByIdAndUpdate(id, fillblankDto, {
      new: true,
    });
  }
  async remove(id: string): Promise<Fillblank> {
    return this.fillblankModel.findByIdAndRemove(id);
  }
  async findAll(): Promise<Fillblank[]> {
    return this.fillblankModel.find().exec();
  }
  async getById(id: string): Promise<Fillblank> {
    return this.fillblankModel.findById(id);
  }
}
