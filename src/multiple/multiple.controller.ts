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
import { MultipleService } from './multiple.service';
import { Multiple } from './schemas/multiple.schema';
import { CreateMultipleDto } from './dto/create-multiple.dto';
import { UpdateMultipleDto } from './dto/update-multiple.dto';

@ApiBasicAuth()
@ApiTags('multiple')
@Controller('multiple')
export class MultipleController {
  constructor(private readonly multipleService: MultipleService) {}

  @ApiOperation({ summary: 'Create multiple question' })
  @Post()
  @ApiBody({
    description: 'Multiple record',
    type: Multiple,
  })
  @ApiResponse({
    status: 201,
    description: 'Multiple created',
    type: Multiple,
  })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createMultipleDto: CreateMultipleDto) {
    return await this.multipleService.create(createMultipleDto);
  }

  @ApiOperation({ summary: 'Update multiple question by id' })
  @ApiResponse({
    status: 200,
    description: 'Updated',
  })
  @ApiBody({
    description: 'Multiple record',
    type: Multiple,
  })
  @Put(':id')
  update(
    @Body() updateMultipleDto: UpdateMultipleDto,
    @Param('id') id: string,
  ): Promise<Multiple> {
    return this.multipleService.update(id, updateMultipleDto);
  }

  @ApiOperation({ summary: 'Get multiple question by id' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Multiple,
  })
  @Get(':id')
  getOne(@Param('id') id: string): Promise<Multiple> {
    return this.multipleService.getById(id);
  }

  @ApiOperation({ summary: 'Get all multiple questions' })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: [Multiple],
  })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Multiple,
  })
  @Get()
  async findAll(): Promise<Multiple[]> {
    return this.multipleService.findAll();
  }

  @ApiOperation({ summary: 'Delete multiple question by id' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Multiple> {
    return this.multipleService.remove(id);
  }
}
