/* based on 
https://stackoverflow.com/questions/65282666/js-infinite-loop-protection-how-to-use-babel-standalone-plugins-without-node-or
and
https://github.com/facebook/react/blob/d906de7f602df810c38aa622c83023228b047db6/scripts/babel/transform-prevent-infinite-loops.js

*/

// This should be reasonable for all loops in the source.
const MAX_SOURCE_ITERATIONS = 1500

export const preventInfiniteLoops = ({ types: t, template }) => {
  const buildGuard = template(`
    if (ITERATOR++ > MAX_ITERATIONS) {
      throw new RangeError(
        'Potential infinite loop: exceeded ' +
        MAX_ITERATIONS +
        ' iterations.'
      );
    }
  `)

  return {
    visitor: {
      'WhileStatement|ForStatement|DoWhileStatement': (path, file) => {
        // An iterator that is incremented with each iteration
        const iterator = path.scope.parent.generateUidIdentifier('loopIt')
        const iteratorInit = t.numericLiteral(0)
        path.scope.parent.push({
          id: iterator,
          init: iteratorInit,
        })
        // If statement and throw error if it matches our criteria
        const guard = buildGuard({
          ITERATOR: iterator,
          MAX_ITERATIONS: t.numericLiteral(MAX_SOURCE_ITERATIONS),
        })
        // No block statment e.g. `while (1) 1;`
        if (!path.get('body').isBlockStatement()) {
          const statement = path.get('body').node
          path.get('body').replaceWith(t.blockStatement([guard, statement]))
        } else {
          path.get('body').unshiftContainer('body', guard)
        }
      },
    },
  }
}
