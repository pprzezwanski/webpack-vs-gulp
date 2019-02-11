import { src, dest } from 'gulp';
import { checkCSS } from 'gulp-check-unused-css';

// chceck unsued css and undefined html classes
export const unusedCss = () => src(['./src/sass/styles.scss', './dist/*.html'])
.pipe(checkCSS({
    globals: [
        /^grid/
    ]
}));