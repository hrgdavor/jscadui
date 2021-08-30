# jscadui

Alternative jscad UI playground.

The goal is to make UI for jscad development that should be able to visualize the changes in realtime.

- to feel responsive on script save, refresh of the preview under 50ms is desirable, but can be few times higher

- for responsiveness to on live parameter change it should feel like animation (60fps~16ms, 30fps~32ms)

Bring more options for debugging
 - `jscadDebugger(shapes|object)` - function that can be called at any point to see intermediate results from the script 
 - it will also dump it in console, but more importantly also start a parallel instance of jscad that can be used to view
   any model provided via jscadDebugger calls
 - initial `async await` idea was abandoned as it complicates things greatly, and actual debugger in the browser can be used
   to pause the script and to step through the code. A second instance of jscad can be used to display any shapes needed to be seen while debugging
 - the debbuder instance of jscad can also be further enhanced to inspect the 3d model.

To allow fastest response 

- initial render may be a simple preview with progressive enhancement in background. 
- global precision should be possible so preview has lower precision
- output precision should be configurable so when exporting, recalculation can be done and prepare more precise model in background
- progressive enhancement may be allowed to go to the level of precision that is for export, thus reducing wait time for export
- progressive enhancement should be stopped and restarted on script or parameter change


Parallelizing background work should be utilized

- Use of TypedArrays where possible is preferred to allow for sending data between thread with no cost
- sets of boolean operations can be done in background
- Making long running operations like booleans interruptible would be ideal.
- calculating operation complexitiy in advance would be useful (based on precision that can affect the expected output size and ammount of calculation)


Allowing for changes to be localized instead of recalculating everything is crucial here.

- to extent this can be automatic
- much more is possible if developers are taught some best practices that allow for most performance



