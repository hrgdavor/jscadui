
## Easy: edit online


## Advanced: edit in your fav code editor

Any text or code editor will work for this (vi, vim, neovim, notepad++, VSCodium , VSCode, Atom, SublimeText...).

- create a file `someScript.js` 
- copy exmaple code form jscad.app
- save the file
- drag&drop the file to jscad.app browser window
- put your editor and jscad.app side by side
- edit the file, save the changes, jscad.app will automatically re-run the script

A chromium based browser is required, as other browser do not allow JS to see changes to the file.

## Enthusiast: a multifile project

## Expert: project with package.json and workspaces for internal libs


Bonus: if you change `main` in package.json, project will be reloaded
and that file will be the new starting point for the project without you needing
D&D again. 

https://github.com/hrgdavor/jscadui/assets/2480762/63821c2d-3b2c-45cb-816a-b99f2f0e24fe


better option is to download a nice editor that can syntax highlight JS code
edit with the said editor (you may try VScode if it works well on your computer)
save the fil on yor drive, and keep the openjscad window open, then drag and drop the file there
it will render the script, and check for changes, so you continue editing it the text editor on your computer
as soon as you save it will pick-up the changes
... another simpler option that was made available recently on https://jscad.app/ is to copy the script text from openjscad

paste there, and then just use CTRL+S it will aks the first time permission to save the file, and further saving will save the file, and render changes
jscad.app is not official yet, but works rather well
I personally prefer to use VSCode and drag/drop my file onto jscad.app to see it rendered there, and export in the end for 3d printing


any editor
drag and dropping file to openjscad or jscad.app will cause it to be given to the browser with permission to read it.
You must use Chrome for jscad to be able to check few times a second to see if it changed
Only Chrome can get change info and read new content ... Firefox plays dumb and will indefinitely give the initial file version, even after it chanes on your drive



