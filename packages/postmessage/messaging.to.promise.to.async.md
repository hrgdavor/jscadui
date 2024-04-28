# Messagings VS async

Messaging over websockt or postMessage is one level harder to handle than async fetch calls.

With fetch at least code is in one place but with ugly extra indent especially if there is more than one Promise in chain.

```
// code
```

Luckily for Promises, async/await makes code much cleaner, and even though it is still async, code looks
like normal procedural code (the interpreter takes care of splitting the code into callbacks internally, or compiler when targeting JS versions before async).
```

```


With messaging it is even worse. Code that sends a message can be in many places, but code that will
receive the response is in single method that then needs to have multiple if statements and call proper
handler with intermediate values stored globally or in class props.

```
// code

```

