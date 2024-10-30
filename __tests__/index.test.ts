import { example } from '../src/';

test('TESTING example func', () => {
  expect(example('TEST!!!')).toEqual('This is TEST!!!');
});
