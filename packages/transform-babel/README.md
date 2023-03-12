# transformer to help run the code

It is not possible to fake `import` statements from es6(at least at the moment) so code needs to be transformed by babel into code that calls `require`. Also this open posibilities to run `TypeScript` or other stuff that can be transformed by Babel.

The transformation also generates inline `sourceMap` so errors will point back to correct line numbers in the source.

