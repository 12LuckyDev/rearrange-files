import { Depth, RearrangeHandler } from '../src';

it('should fire', (done) => {
  const handler = new RearrangeHandler({
    srcPath: './test-data',
    targetPath: './result',
    depth: Depth.day,
  });

  handler.start().subscribe({
    next: () => done(),
    error: () => done(),
    complete: () => done(),
  });
}, 5000);
