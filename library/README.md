# rearrange-files

A library that allows you to reorganize the structure of files based on their creation date.

## Usage

```javascript
import { RearrangeHandler } from 'rearrange-files';

const handler = new RearrangeHandler({
  srcPath: 'E:/photos-src',
  targetPath: 'E:/photos-traget',
});

handler.start();
// handler returns rxjs Observable to track progress
```

## RearrangeOptionsModel

| Property        | Type                  | Default Value      | Description                                                                                                                 |
| --------------- | --------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `srcPath`       | `string` _(required)_ | –                  | Source path of directory to process.                                                                                        |
| `targetPath`    | `string`              | `undefined`        | Target path where the output will be written. When `undefined`, `srcPath` is used instead                                   |
| `depth`         | `Depth \| null`       | `Depth.month`      | Defines the depth of output directories tree.                                                                               |
| `template`      | `string`              | `YYYYMMDD_HHmmss`  | Template of output files naming.                                                                                            |
| `clearTarget`   | `boolean`             | `false`            | Whether to clear the target directory before execution.                                                                     |
| `mode`          | `HandlerMode`         | `HandlerMode.copy` | Defines the operation mode, copy or move.                                                                                   |
| `hoursModifier` | `number \| null`      | `null`             | The number of hours that will be added to the file timestamp. Useful when files/photos were created in different time zone. |
