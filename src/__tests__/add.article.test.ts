import request from 'supertest';
import express from 'express';
import articleRouter from '../routes/crud.route';

// Mock DB a Redis
jest.mock('../config/database.config', () => ({
  db: {
    prepare: jest.fn(() => ({
      run: jest.fn(() => ({})),
    })),
  },
}));

jest.mock('../config/redis.client', () => ({
  redis: {
    del: jest.fn(() => Promise.resolve(1)),
  },
}));

const app = express();
app.use(express.json());
app.use('/api', articleRouter);

describe('POST /api/add', () => {
  it('should add an article with valid input', async () => {
    const validArticle = {
      author: 'John Doe',
      title: 'Valid Blog Title',
      content: 'This is some valid content with more than 30 characters.',
      tags: ['tech', 'coding']
    };

    const res = await request(app)
      .post('/api/add')
      .send(validArticle);

    expect([200, 201]).toContain(res.statusCode);
    expect(res.body.message).toBeDefined();
  });

  it('should fail with short author name', async () => {
    const invalidArticle = {
      author: 'Jo',
      title: 'Valid Blog Title',
      content: 'This is some valid content with more than 30 characters.',
      tags: ['tech', 'coding']
    };

    const res = await request(app)
      .post('/api/add')
      .send(invalidArticle);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain('Author name is too short.');
  });

  it('should fail with short content', async () => {
    const invalidArticle = {
      author: 'John Doe',
      title: 'Valid Blog Title',
      content: 'Too short',
      tags: ['tech', 'coding']
    };

    const res = await request(app)
      .post('/api/add')
      .send(invalidArticle);

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toContain('Content must be at least 30 characters long.');
  });

  it('should fail with too few tags', async () => {
    const invalidArticle = {
      author: 'John Doe',
      title: 'Valid Blog Title',
      content: 'This is some valid content with more than 30 characters.',
      tags: ['t']
    };

    const res = await request(app)
      .post('/api/add')
      .send(invalidArticle);

    expect(res.statusCode).toBe(400);
    // Could be either tag too short or not enough tags
    expect(
      res.body.message.some((msg: string) =>
        msg.includes('Tag must be at least 2 characters long.') ||
        msg.includes('At least 2 tags are required.')
      )
    ).toBe(true);
  });
});
