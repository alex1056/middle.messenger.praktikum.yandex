const pug = require('pug');

const compiledFunction = pug.compileFile('./test.pug');

const preTemplate = compiledFunction({
  name: 'Timothy',
});

console.log(typeof preTemplate);
console.log(preTemplate);
// export default preTemplate;
module.exports = { preTemplate };

// console.log(template);
// console.log(compiledFunction);
// console.log(
//   compiledFunction({
//     name: 'Timothy',
//   })
// );
