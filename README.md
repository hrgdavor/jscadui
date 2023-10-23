If you want to discuss jscad or jscadui you can also join us on discord: https://discord.gg/AaqGskur93


# usable bits

Most of the things are work in progres, but some parts are pretty ready to be used

- [packages/html-gizmo](./packages/html-gizmo) - a gizmo to display current camera direction

# demo
[jscad.app](https://jscad.app) is a nice demo and our attempt at making a an improved version of [openjscad.xyz](https://openjscad.xyz).


# Worker
 - [x] can run folder projects 
 - [x] can run scripts that pull deps from unkpg by simply using import or require
 - [x] can run es6 modules code
 - [x] can run typescript
 - [x] can run mixed typescript js+require, js+import
 - [x] worker is preserved, so caching optimizations are possible between parameter changes


# About jscadui

A jscad UI playground developed here and meant to be later contributed into jscad. This way this is not limited by jscad release cycle.
 - support Three.js Babylon.js regl
 - create nodep pure js parameters
 - allow to be easily used within React, angula, Vue,Solidj ... or whatever is popular at some point.
 - simplify integrating worker 



As proof of concept, the goal is to make UI for jscad development that should be able to visualize the changes in realtime.

- to feel responsive on script save, refresh of the preview under 50ms is desirable, but can be few times higher

- for responsiveness to on live parameter change it should feel like animation (60fps\~16ms, 30fps\~32ms)

## Bring more options for debugging
 - `jscadDebugger(shapes|object)` - function that can be called at any point to see intermediate results from the script 
 - it will also dump it in console, but more importantly also start a parallel instance of jscad that can be used to view
   any model provided via jscadDebugger calls
 - initial `async await` idea was abandoned as it complicates things greatly, and actual debugger in the browser can be used
   to pause the script and to step through the code. 
 - A second instance of jscad can be used to display any shapes needed to be seen while debugging (original instance can be frozen by debugger)
 - the debugger instance of jscad can also be further enhanced to inspect the 3d model

## allow fastest response 

- initial render may be a simple preview with progressive enhancement in background. 
- global precision should be possible so preview has lower precision
- output precision should be configurable so when exporting, recalculation can be done and prepare more precise model in background
- progressive enhancement may be allowed to go to the level of precision that is for export, thus reducing wait time for export
- progressive enhancement should be stopped and restarted on script or parameter change


##  Parallelizing background work 

- Use of TypedArrays where possible is preferred to allow for sending data between thread with no cost
- it should be examined if regenerating model in the worker is fast enough, as sending TypedArray out removes access for the sender and coordinating who needs which data can be difficult.
- consider a hybrid approach of sending typed arrays data out, to be given back, or regenerated if needed in multiple places
- sets of boolean operations can be done in background
- Making long running operations like booleans interruptible would be ideal.
- calculating operation complexity in advance would be useful (based on precision that can affect the expected output size and amount of calculation)


##  Allowing for changes to be localized instead of recalculating everything

- to extent this can be automatic
- much more is possible if developers are taught some best practices that allow for most performance



