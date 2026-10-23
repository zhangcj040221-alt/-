import {renderVideo} from '@revideo/renderer';
import {mkdir, stat} from 'node:fs/promises';

await mkdir('out', {recursive: true});
const result = await renderVideo({
  projectFile: './src/project.ts',
  settings: {
    outFile: 'hello-revideo.mp4',
    outDir: './out',
    range: [0, 4],
    dimensions: [1280, 720],
    workers: 1,
    logProgress: true,
    puppeteer: {
      headless: 'shell',
      args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
    },
    ffmpeg: {ffmpegPath: 'ffmpeg', ffmpegLogLevel: 'error'},
  },
});
const target = typeof result === 'string' ? result : 'out/hello-revideo.mp4';
const info = await stat(target);
if (info.size < 1024) throw new Error('Output video too small: ' + info.size);
console.log('VIDEO_OK', target, info.size, 'bytes');
