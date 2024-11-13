import { Depth, RearrangeHandler } from '../src';

it('should fire', (done) => {
  const handler = new RearrangeHandler({
    srcPath: '../test-data/files',
    targetPath: '../test-data/result',
    depth: Depth.day,
  });

  handler.start().subscribe({
    next: () => done(),
    complete: () => done(),
    error: (e) => {
      throw e;
    },
  });
}, 10000);
