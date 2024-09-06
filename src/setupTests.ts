import { expect, beforeAll, afterEach, afterAll } from 'vitest';
import { server } from './mocks/node';
import matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
