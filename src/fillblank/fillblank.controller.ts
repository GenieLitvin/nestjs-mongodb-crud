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
import { FillblankService } from './fillblank.service';
import { Fillblank } from './schemas/fillblank.schema';
import { CreateFillblankDto } from './dto/create-fillblank.dto';
import { UpdateFillblankDto } from './dto/update-fillblank.dto';

@Controller('fillblank')
export class FillblankController {
  constructor(private readonly fillblankService: FillblankService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createFillblankDto: CreateFillblankDto) {
    return await this.fillblankService.create(createFillblankDto);
  }

  @Put(':id')
  update(
    @Body() updateFillblankDto: UpdateFillblankDto,
    @Param('id') id: string,
  ): Promise<Fillblank> {
    return this.fillblankService.update(id, updateFillblankDto);
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<Fillblank> {
    return this.fillblankService.getById(id);
  }

  @Get()
  async findAll(): Promise<Fillblank[]> {
    return this.fillblankService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<Fillblank> {
    return this.fillblankService.remove(id);
  }
}
