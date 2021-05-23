// .test-init.js
const { addHook } = require('pirates');

const IGNORE_EXTENSIONS = ['.scss', '.svg', '.css'];

addHook(() => '', { exts: IGNORE_EXTENSIONS });
