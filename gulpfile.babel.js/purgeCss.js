// purge unsued css from bootstrap grid

import { config } from './config';

import { src, dest } from 'gulp';
import size from 'gulp-size';
import { purgecss } from 'gulp-purgecss';

export const purgeCss = () => src(['./src/sass/vendor/not-purged/grid.scss'])
    .pipe(size({ title: 'before purgeCss:' }))
    .pipe(purgecss({
        content: ['./dist/index.html']
    }))
    .pipe(size({ title: 'after purgeCss:' }))
    .pipe(dest('./src/sass/vendor/'));