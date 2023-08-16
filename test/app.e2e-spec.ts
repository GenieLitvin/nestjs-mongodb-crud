import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateMultipleDto } from '../src/multiple/dto/create-multiple.dto';
import { UpdateMultipleDto } from '../src/multiple/dto/update-multiple.dto';
import { CreateQuestionDto } from '../src/question/dto/create-question.dto';
import { UpdateQuestionDto } from '../src/question/dto/update-question.dto';
import { CreateVideoDto } from '../src/video/dto/create-video.dto';
import { UpdateVideoDto } from '../src/video/dto/update-video.dto';
import { CreateFillblankDto } from '../src/fillblank/dto/create-fillblank.dto';
import { UpdateFillblankDto } from '../src/fillblank/dto/update-fillblank.dto';

import { MultipleController } from '../src/multiple/multiple.controller';
import { MultipleService } from '../src/multiple/multiple.service';
import { QuestionController } from '../src/question/question.controller';
import { QuestionService } from '../src/question/question.service';
import { VideoController } from '../src/video/video.controller';
import { VideoService } from '../src/video/video.service';
import { FillblankController } from '../src/fillblank/fillblank.controller';
import { FillblankService } from '../src/fillblank/fillblank.service';
import { CollectionController } from '../src/collection/collection.controller';
import { CollectionService } from '../src/collection/collection.service';

import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '../src/auth/auth.guard';
import { ConfigModule } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
const createId = '64835432a38a32b94f2bb886';
const mockMultiple = {
  _id: createId,
};

describe('MultipleController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [MultipleController],
      providers: [
        {
          provide: MultipleService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockMultiple),
            update: jest.fn().mockResolvedValue(mockMultiple),
            getById: jest.fn().mockResolvedValue(mockMultiple),
            findAll: jest.fn().mockResolvedValue([mockMultiple]),
            remove: jest.fn().mockResolvedValue(mockMultiple),
          },
        },
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const createMultipleDto: CreateMultipleDto = {
    sentence: 'How many // do you have on your shelf',
    weight: 0,
    options: [
      { option: 'book', isCorrect: true },
      { option: 'book', isCorrect: false },
    ],
    topic: 'аrticles',
  };
  const createMultipleDto1: CreateMultipleDto = {
    sentence: '',
    weight: 0,
    options: [
      { option: 'book', isCorrect: false },
      { option: 'book', isCorrect: false },
    ],
    topic: 'аrticles',
  };
  const createMultipleDto2: CreateMultipleDto = {
    sentence: 'How many // do you have on your shelf',
    weight: 0,
    options: [
      { option: 'book', isCorrect: true },
      { option: 'book', isCorrect: true },
      { option: 'book', isCorrect: false },
    ],
    topic: 'аrticles',
  };
  const updateMultipleDto: UpdateMultipleDto = {
    sentence: 'How many // do you have on your shelf',
    weight: 0,
    options: [
      { option: 'book', isCorrect: true },
      { option: 'book', isCorrect: false },
    ],
    topic: 'аrticles',
  };
  it('/multiple (POST) - Unauthorized error"', () => {
    return request(app.getHttpServer())
      .post('/multiple')
      .expect(HttpStatus.UNAUTHORIZED)
      .send(createMultipleDto)
      .then((response) => {
        const createdMultiple = response.body;
        expect(createdMultiple).toHaveProperty('message');
      });
  });

  it('/multiple (POST) - создание объекта "multiple"', () => {
    return request(app.getHttpServer())
      .post('/multiple')
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .expect(HttpStatus.CREATED)
      .send(createMultipleDto)
      .then((response) => {
        const createdMultiple = response.body;
        expect(createdMultiple).toHaveProperty('_id');
      });
  });
  it('/multiple (POST) - создание объекта "multiple" invalid request, all options are false', () => {
    return request(app.getHttpServer())
      .post('/multiple')
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .expect(HttpStatus.BAD_REQUEST)
      .send(createMultipleDto1)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      });
  });
  it('/multiple (POST) - создание объекта "multiple" invalid request, more then 1  option is true', () => {
    return request(app.getHttpServer())
      .post('/multiple')
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .expect(HttpStatus.BAD_REQUEST)
      .send(createMultipleDto2)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      });
  });

  it('/multiple/:id (PUT) - обновление объекта "multiple"', () => {
    return request(app.getHttpServer())
      .put(`/multiple/${createId}`)
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .send(updateMultipleDto)
      .expect(HttpStatus.OK)
      .then((response) => {
        const updatedMultiple = response.body;
        expect(updatedMultiple).toHaveProperty('_id', createId);
      });
  });

  it('/multiple/:id (GET) - получение объекта "multiple" по ID', () => {
    return request(app.getHttpServer())
      .get(`/multiple/${createId}`)
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .expect(HttpStatus.OK)
      .then((response) => {
        const multiple = response.body;
        expect(multiple).toHaveProperty('_id', createId);
      });
  });

  it('/multiple (GET) - получение списка всех объектов "multiple"', () => {
    return request(app.getHttpServer())
      .get('/multiple')
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .expect(HttpStatus.OK)
      .then((response) => {
        const multiples = response.body;
        expect(Array.isArray(multiples)).toBe(true);
      });
  });

  it('/multiple/:id (DELETE) - удаление объекта "multiple" по ID', () => {
    return request(app.getHttpServer())
      .delete(`/multiple/${createId}`)
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .expect(HttpStatus.OK)
      .then((response) => {
        const deletedMultiple = response.body;
        expect(deletedMultiple).toHaveProperty('_id', createId);
      });
  });
});

describe('QuestionController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [QuestionController],
      providers: [
        {
          provide: QuestionService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockMultiple),
            update: jest.fn().mockResolvedValue(mockMultiple),
            getById: jest.fn().mockResolvedValue(mockMultiple),
            findAll: jest.fn().mockResolvedValue([mockMultiple]),
            remove: jest.fn().mockResolvedValue(mockMultiple),
          },
        },
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const createQuestionDto: CreateQuestionDto = {
    question: 'How many // do you have on your shelf',
  };
  const createQuestionDto1: CreateQuestionDto = {
    question: '',
  };

  const updateQuestionDto: UpdateQuestionDto = {
    question: 'How many // do you have on your shelf',
  };
  it('/question (POST) - Unauthorized error"', () => {
    return request(app.getHttpServer())
      .post('/question')
      .expect(HttpStatus.UNAUTHORIZED)
      .send(createQuestionDto)
      .then((response) => {
        const createdQuestion = response.body;
        expect(createdQuestion).toHaveProperty('message');
      });
  });

  it('/question (POST) - создание объекта "question"', () => {
    return request(app.getHttpServer())
      .post('/question')
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .expect(HttpStatus.CREATED)
      .send(createQuestionDto)
      .then((response) => {
        const createdQuestion = response.body;
        expect(createdQuestion).toHaveProperty('_id');
      });
  });
  it('/question (POST) - создание объекта "createQuestionDto1" invalid request', () => {
    return request(app.getHttpServer())
      .post('/question')
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .expect(HttpStatus.BAD_REQUEST)
      .send(createQuestionDto1)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      });
  });
  it('/question/:id (PUT) - обновление объекта "question"', () => {
    return request(app.getHttpServer())
      .put(`/question/${createId}`)
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .send(updateQuestionDto)
      .expect(HttpStatus.OK)
      .then((response) => {
        const updatedQuestion = response.body;
        expect(updatedQuestion).toHaveProperty('_id', createId);
      });
  });

  it('/question/:id (GET) - получение объекта "question" по ID', () => {
    return request(app.getHttpServer())
      .get(`/question/${createId}`)
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .expect(HttpStatus.OK)
      .then((response) => {
        const multiple = response.body;
        expect(multiple).toHaveProperty('_id', createId);
      });
  });

  it('/question (GET) - получение списка всех объектов "question"', () => {
    return request(app.getHttpServer())
      .get('/question')
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .expect(HttpStatus.OK)
      .then((response) => {
        const questions = response.body;
        expect(Array.isArray(questions)).toBe(true);
      });
  });

  it('/question/:id (DELETE) - удаление объекта "question" по ID', () => {
    return request(app.getHttpServer())
      .delete(`/question/${createId}`)
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .expect(HttpStatus.OK)
      .then((response) => {
        const deletedQuestion = response.body;
        expect(deletedQuestion).toHaveProperty('_id', createId);
      });
  });
});
describe('Video (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [VideoController],
      providers: [
        {
          provide: VideoService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockMultiple),
            update: jest.fn().mockResolvedValue(mockMultiple),
            getById: jest.fn().mockResolvedValue(mockMultiple),
            findAll: jest.fn().mockResolvedValue([mockMultiple]),
            remove: jest.fn().mockResolvedValue(mockMultiple),
          },
        },
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const createVideoDto: CreateVideoDto = {
    video: 'https://www.youtube.com/watch?v=3MqYE2UuN24',
    weight: 1,
    questions: [
      { question: 'It’s better to walk in the rain', answer: false },
      { question: 'It’s better to run in the rain', answer: true },
      {
        question: 'Either you run or walk it makes no difference',
        answer: false,
      },
    ],
  };
  const createVideoDto1: CreateVideoDto = {
    video: 'https://www.youtube.com/watch?v=3MqYE2UuN24',
    weight: 1,
    questions: [
      { question: 'It’s better to walk in the rain', answer: false },
      { question: 'It’s better to run in the rain', answer: false },
      {
        question: 'Either you run or walk it makes no difference',
        answer: false,
      },
    ],
  };
  const createVideoDto2: CreateVideoDto = {
    video: 'https://www.youtube.com/watch?v=3MqYE2UuN24',
    weight: 1,
    questions: [
      { question: 'It’s better to walk in the rain', answer: true },
      { question: 'It’s better to run in the rain', answer: true },
      {
        question: 'Either you run or walk it makes no difference',
        answer: false,
      },
    ],
  };
  const updateVideoDto: UpdateVideoDto = {
    video: 'https://www.youtube.com/watch?v=3MqYE2UuN24',
    weight: 1,
    questions: [
      { question: 'It’s better to walk in the rain', answer: false },
      { question: 'It’s better to run in the rain', answer: true },
      {
        question: 'Either you run or walk it makes no difference',
        answer: false,
      },
    ],
  };
  it('/video (POST) - Unauthorized error"', () => {
    return request(app.getHttpServer())
      .post('/video')
      .expect(HttpStatus.UNAUTHORIZED)
      .send(createVideoDto)
      .then((response) => {
        const createdVideo = response.body;
        expect(createdVideo).toHaveProperty('message');
      });
  });

  it('/video (POST) - создание объекта "video"', () => {
    return request(app.getHttpServer())
      .post('/video')
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .expect(HttpStatus.CREATED)
      .send(createVideoDto)
      .then((response) => {
        const createdVideo = response.body;
        expect(createdVideo).toHaveProperty('_id');
      });
  });
  it('/video (POST) - создание объекта "video" invalid request, all answers are false', () => {
    return request(app.getHttpServer())
      .post('/video')
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .expect(HttpStatus.BAD_REQUEST)
      .send(createVideoDto1)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      });
  });
  it('/video (POST) - создание объекта "video" invalid request, more then 1  answer is true', () => {
    return request(app.getHttpServer())
      .post('/video')
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .expect(HttpStatus.BAD_REQUEST)
      .send(createVideoDto2)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      });
  });

  it('/video/:id (PUT) - обновление объекта "video"', () => {
    return request(app.getHttpServer())
      .put(`/video/${createId}`)
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .send(updateVideoDto)
      .expect(HttpStatus.OK)
      .then((response) => {
        const updatedVideo = response.body;
        expect(updatedVideo).toHaveProperty('_id', createId);
      });
  });

  it('/video/:id (GET) - получение объекта "video" по ID', () => {
    return request(app.getHttpServer())
      .get(`/video/${createId}`)
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .expect(HttpStatus.OK)
      .then((response) => {
        const video = response.body;
        expect(video).toHaveProperty('_id', createId);
      });
  });

  it('/video (GET) - получение списка всех объектов "video"', () => {
    return request(app.getHttpServer())
      .get('/video')
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .expect(HttpStatus.OK)
      .then((response) => {
        const videos = response.body;
        expect(Array.isArray(videos)).toBe(true);
      });
  });

  it('/video/:id (DELETE) - удаление объекта "video" по ID', () => {
    return request(app.getHttpServer())
      .delete(`/video/${createId}`)
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .expect(HttpStatus.OK)
      .then((response) => {
        const deletedVideo = response.body;
        expect(deletedVideo).toHaveProperty('_id', createId);
      });
  });
});
describe('Fillblank (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [FillblankController],
      providers: [
        {
          provide: FillblankService,
          useValue: {
            create: jest.fn().mockResolvedValue(mockMultiple),
            update: jest.fn().mockResolvedValue(mockMultiple),
            getById: jest.fn().mockResolvedValue(mockMultiple),
            findAll: jest.fn().mockResolvedValue([mockMultiple]),
            remove: jest.fn().mockResolvedValue(mockMultiple),
          },
        },
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ transform: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  const createFillblankDto: CreateFillblankDto = {
    sentence:
      "I'm going to make a sandwich for lunch. Do you want _____ on yours?",
    weight: 2,
    topic: '',
    answer: 'mayonnaise',
  };
  const createFillblankDto1: CreateFillblankDto = {
    sentence: '',
    weight: 2,
    topic: '',
    answer: 'mayonnaise',
  };

  const updateFillblankDto: UpdateFillblankDto = {
    sentence:
      "I'm going to make a sandwich for lunch. Do you want _____ on yours?",
    weight: 2,
    topic: '',
    answer: 'mayonnaise',
  };
  it('/fillblank (POST) - Unauthorized error"', () => {
    return request(app.getHttpServer())
      .post('/fillblank')
      .expect(HttpStatus.UNAUTHORIZED)
      .send(createFillblankDto)
      .then((response) => {
        const createdFillblank = response.body;
        expect(createdFillblank).toHaveProperty('message');
      });
  });

  it('/fillblank (POST) - создание объекта "fillblank"', () => {
    return request(app.getHttpServer())
      .post('/fillblank')
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .expect(HttpStatus.CREATED)
      .send(createFillblankDto)
      .then((response) => {
        const createdFillblank = response.body;
        expect(createdFillblank).toHaveProperty('_id');
      });
  });
  it('/fillblank (POST) - создание объекта "fillblank" invalid request', () => {
    return request(app.getHttpServer())
      .post('/fillblank')
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .expect(HttpStatus.BAD_REQUEST)
      .send(createFillblankDto1)
      .then((response) => {
        expect(response.body).toHaveProperty('message');
      });
  });
  it('/fillblank/:id (PUT) - обновление объекта "fillblank"', () => {
    return request(app.getHttpServer())
      .put(`/fillblank/${createId}`)
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .send(updateFillblankDto)
      .expect(HttpStatus.OK)
      .then((response) => {
        const updatedFillblank = response.body;
        expect(updatedFillblank).toHaveProperty('_id', createId);
      });
  });

  it('/fillblank/:id (GET) - получение объекта "fillblank" по ID', () => {
    return request(app.getHttpServer())
      .get(`/fillblank/${createId}`)
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .expect(HttpStatus.OK)
      .then((response) => {
        const fillblank = response.body;
        expect(fillblank).toHaveProperty('_id', createId);
      });
  });

  it('/fillblank (GET) - получение списка всех объектов "fillblank"', () => {
    return request(app.getHttpServer())
      .get('/fillblank')
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .expect(HttpStatus.OK)
      .then((response) => {
        const fillblanks = response.body;
        expect(Array.isArray(fillblanks)).toBe(true);
      });
  });

  it('/fillblank/:id (DELETE) - удаление объекта "fillblank" по ID', () => {
    return request(app.getHttpServer())
      .delete(`/fillblank/${createId}`)
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .expect(HttpStatus.OK)
      .then((response) => {
        const deletedFillblank = response.body;
        expect(deletedFillblank).toHaveProperty('_id', createId);
      });
  });
});

describe('Collection (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      controllers: [CollectionController],
      providers: [
        {
          provide: CollectionService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([mockMultiple]),
          },
        },
        {
          provide: APP_GUARD,
          useClass: AuthGuard,
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/collection (GET) - Unauthorized error"', () => {
    return request(app.getHttpServer())
      .get('/collection')
      .expect(HttpStatus.UNAUTHORIZED)
      .then((response) => {
        const createdCollection = response.body;
        expect(createdCollection).toHaveProperty('message');
      });
  });
  it('/collection (GET) - получение списка всех объектов "collection"', () => {
    return request(app.getHttpServer())
      .get('/collection')
      .auth(process.env.SERVICE_USER, process.env.SERVICE_PASSWORD, {
        type: 'basic',
      })
      .expect(HttpStatus.OK)
      .then((response) => {
        const collections = response.body;
        expect(Array.isArray(collections)).toBe(true);
      });
  });
});
