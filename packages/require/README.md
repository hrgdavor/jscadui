# require
This is an implementation of import/require to be able to run JavaScript(and TypeScript) files.
It is primarily used in jscad.app to execute the scripts.

I admire the JSFiddle, CodePen, stackBlitz, and any other such tool I may not know about, but
currently my impression is that most of the effort is put into monetizing this knowledge, instead
of consolidating it for the community to thrive on top of it. Tools like Vite are very nice
but it is making developers lazy and I do not like the systems that create complex engines with plugins.
I prefer tools that do their own thing well, combined with shared knowledge how to combine them.

Hopefully this `require` implementation will enable running complex jscad scripts, and allow some other
similar projects by using the package, or learning from it.

There is a long history of JS modules, from non-existent to multiple attempts, to finally ESM,
this package will help handle those, and document the limits, where you must intervene or provide
extra information for a specific import. It remains to be seen how far can this go to make imports
work automatically.

## import.meta.url

When running a ESM module it is useful for a module to know it's location to load additional
resources like WASM file. Try to `eval` ESM script that uses `import.meta.url` and it will fail. Fortunately `module.meta.url` is same length as `import.meta.url` so simply replacing it before evaluation will not affect line numbers in source-maps.

