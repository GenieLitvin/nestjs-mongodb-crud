import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { Multiple } from './schemas/multiple.schema';
import { CreateMultipleDto } from './dto/create-multiple.dto';
import { UpdateMultipleDto } from './dto/update-multiple.dto';

@Injectable()
export class MultipleService {
  constructor(
    @Inject(Multiple.name)
    private readonly multipleModel: Model<Multiple>,
  ) {}

  async create(createMultipleDto: CreateMultipleDto): Promise<Multiple> {
    const createdMultiple = await this.multipleModel.create(createMultipleDto);
    return createdMultiple;
  }
  async update(id: string, multipleDto: UpdateMultipleDto): Promise<Multiple> {
    return this.multipleModel.findByIdAndUpdate(id, multipleDto, { new: true });
  }
  async remove(id: string): Promise<Multiple> {
    return this.multipleModel.findByIdAndRemove(id);
  }
  async findAll(): Promise<Multiple[]> {
    return this.multipleModel.find().exec();
  }
  async getById(id: string): Promise<Multiple> {
    return this.multipleModel.findById(id);
  }
}
