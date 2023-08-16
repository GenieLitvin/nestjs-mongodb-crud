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
import { MultipleService } from './multiple.service';
import { Multiple } from './schemas/multiple.schema';
import { CreateMultipleDto } from './dto/create-multiple.dto';
import { UpdateMultipleDto } from './dto/update-multiple.dto';

@Controller('multiple')
export class MultipleController {
  constructor(private readonly multipleService: MultipleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createMultipleDto: CreateMultipleDto) {
    return await this.multipleService.create(createMultipleDto);
  }

  @Put(':id')
  update(
    @Body() updateMultipleDto: UpdateMultipleDto,
    @Param('id') id: string,
  ): Promise<Multiple> {
    return this.multipleService.update(id, updateMultipleDto);
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Multiple> {
    return this.multipleService.getById(id);
  }

  @Get()
  async findAll(): Promise<Multiple[]> {
    return this.multipleService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Multiple> {
    return this.multipleService.remove(id);
  }
}
