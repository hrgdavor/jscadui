# postMessage utility

Allows for simpler usage of [postMessage](https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage) by defining a kind of RPC protocol that can send notifications or call methods. Calling methods is handled with Promises because the postMessage is async by definition.

If you use this utility in your main thread and in the worker, it will (in my opinion) simplify

## transferable

It is simple to send transferable objects when sending a message to the worker by adding a parameter.

It is however more tricky to support transferable for return values without complicating simple use
cases that do not need transferable.

If you have a method that can be called and it needs to return transferable then you must use object as a return value.
When returning such object, include `__transferable` key in the return value. It will not be in the data at the receiving end but will be taken out and passed to postMessage as a transferable parameter.
