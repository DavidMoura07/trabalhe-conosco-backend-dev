import { defineFeature, loadFeature } from 'jest-cucumber';
import { Test } from '@nestjs/testing';
const feature = loadFeature('./test/features/searchUser.feature');

import { INestApplication, HttpService } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

defineFeature(feature, test => {
  let keyword;
  let page;
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  test('I request for a list of users', ({ given, when, then }) => {
    given('I send {string} as keyword', givenKeyword => {
      keyword = givenKeyword;
    });

    given('send {int} as page number', givenPage => {
      page = givenPage;
    });

    when('I make the request', () => {
      request(app.getHttpServer())
        .get('/users/search/' + keyword + '/' + page)
        .expect(200);
    });

    then('I recive this status code: {int}', () => {
      request(app.getHttpServer())
        .get('/users/search/' + keyword + '/' + page)
        .expect(200);
    });
  });
});
