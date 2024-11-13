import { RearrangeHandler, Depth, HandlerStage } from 'rearrange-files';
import { SingleBar, Presets } from 'cli-progress';

const main = async (): Promise<void> => {
  const handler = new RearrangeHandler({
    srcPath: './test-files',
    targetPath: './result',
    depth: Depth.day,
  });
  const bar = new SingleBar({}, Presets.shades_classic);

  handler.start().subscribe({
    next: ({ stage, total, current }) => {
      if (stage === HandlerStage.files_loaded) {
        bar.start(total, current);
      } else if (stage === HandlerStage.in_progress) {
        bar.update(current + 1);
      }
    },
    complete: () => bar.stop(),
  });
};

main();
