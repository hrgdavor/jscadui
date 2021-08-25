# jscadui

Alternative jscad UI playground.

The goal is to make UI for jscad development that should be able to visualize the changes in realtime.

- to feel responsive on save, refresh of the preview can even be over 50ms.

- for responsiveness to on live parameter change it should feel that feels like animation (60fps~16ms, 30fps~32ms)



To allow fastest response 

- initial render may be a simple preview with progressive enhancement in background. 
- global precision should be possible so preview has lower precision
- output precision should be configurable so when exporting, recalculation can be done and prepare more precise model in background
- progressive enhancement may be allowed to go to the level of precision that is for export, thus reducing wait time for export
- progressive enhancement should be stopped and restarted on script or parameter change



Allowing for changes to be localized instead of recalculating everything is crucial here.

- to extent this can be automatic
- much more is possible if developers are taught some best practices that allow for most performance



