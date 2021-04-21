[ethereumjs-client](../README.md) › ["sync/fetcher/fetcher"](../modules/_sync_fetcher_fetcher_.md) › [Fetcher](_sync_fetcher_fetcher_.fetcher.md)

# Class: Fetcher

Base class for fetchers that retrieve various data from peers. Subclasses must
request() and process() methods. Tasks can be arbitrary objects whose structure
is defined by subclasses. A priority queue is used to ensure tasks are fetched
inorder.

**`memberof`** module:sync/fetcher

## Hierarchy

* Readable

  ↳ **Fetcher**

  ↳ [BlockFetcher](_sync_fetcher_blockfetcher_.blockfetcher.md)

## Implements

* ReadableStream

## Index

### Constructors

* [constructor](_sync_fetcher_fetcher_.fetcher.md#constructor)

### Properties

* [config](_sync_fetcher_fetcher_.fetcher.md#config)
* [destroyed](_sync_fetcher_fetcher_.fetcher.md#destroyed)
* [readable](_sync_fetcher_fetcher_.fetcher.md#readable)
* [readableEncoding](_sync_fetcher_fetcher_.fetcher.md#readableencoding)
* [readableEnded](_sync_fetcher_fetcher_.fetcher.md#readableended)
* [readableFlowing](_sync_fetcher_fetcher_.fetcher.md#readableflowing)
* [readableHighWaterMark](_sync_fetcher_fetcher_.fetcher.md#readablehighwatermark)
* [readableLength](_sync_fetcher_fetcher_.fetcher.md#readablelength)
* [readableObjectMode](_sync_fetcher_fetcher_.fetcher.md#readableobjectmode)

### Methods

* [[Symbol.asyncIterator]](_sync_fetcher_fetcher_.fetcher.md#[symbol.asynciterator])
* [_destroy](_sync_fetcher_fetcher_.fetcher.md#_destroy)
* [_read](_sync_fetcher_fetcher_.fetcher.md#_read)
* [addListener](_sync_fetcher_fetcher_.fetcher.md#addlistener)
* [dequeue](_sync_fetcher_fetcher_.fetcher.md#dequeue)
* [destroy](_sync_fetcher_fetcher_.fetcher.md#destroy)
* [emit](_sync_fetcher_fetcher_.fetcher.md#emit)
* [enqueue](_sync_fetcher_fetcher_.fetcher.md#enqueue)
* [error](_sync_fetcher_fetcher_.fetcher.md#error)
* [eventNames](_sync_fetcher_fetcher_.fetcher.md#eventnames)
* [expire](_sync_fetcher_fetcher_.fetcher.md#expire)
* [failure](_sync_fetcher_fetcher_.fetcher.md#private-failure)
* [fetch](_sync_fetcher_fetcher_.fetcher.md#fetch)
* [getMaxListeners](_sync_fetcher_fetcher_.fetcher.md#getmaxlisteners)
* [isPaused](_sync_fetcher_fetcher_.fetcher.md#ispaused)
* [listenerCount](_sync_fetcher_fetcher_.fetcher.md#listenercount)
* [listeners](_sync_fetcher_fetcher_.fetcher.md#listeners)
* [next](_sync_fetcher_fetcher_.fetcher.md#next)
* [off](_sync_fetcher_fetcher_.fetcher.md#off)
* [on](_sync_fetcher_fetcher_.fetcher.md#on)
* [once](_sync_fetcher_fetcher_.fetcher.md#once)
* [pause](_sync_fetcher_fetcher_.fetcher.md#pause)
* [peer](_sync_fetcher_fetcher_.fetcher.md#peer)
* [pipe](_sync_fetcher_fetcher_.fetcher.md#pipe)
* [prependListener](_sync_fetcher_fetcher_.fetcher.md#prependlistener)
* [prependOnceListener](_sync_fetcher_fetcher_.fetcher.md#prependoncelistener)
* [process](_sync_fetcher_fetcher_.fetcher.md#process)
* [push](_sync_fetcher_fetcher_.fetcher.md#push)
* [rawListeners](_sync_fetcher_fetcher_.fetcher.md#rawlisteners)
* [read](_sync_fetcher_fetcher_.fetcher.md#read)
* [removeAllListeners](_sync_fetcher_fetcher_.fetcher.md#removealllisteners)
* [removeListener](_sync_fetcher_fetcher_.fetcher.md#removelistener)
* [request](_sync_fetcher_fetcher_.fetcher.md#request)
* [resume](_sync_fetcher_fetcher_.fetcher.md#resume)
* [setEncoding](_sync_fetcher_fetcher_.fetcher.md#setencoding)
* [setMaxListeners](_sync_fetcher_fetcher_.fetcher.md#setmaxlisteners)
* [store](_sync_fetcher_fetcher_.fetcher.md#store)
* [success](_sync_fetcher_fetcher_.fetcher.md#private-success)
* [tasks](_sync_fetcher_fetcher_.fetcher.md#tasks)
* [unpipe](_sync_fetcher_fetcher_.fetcher.md#unpipe)
* [unshift](_sync_fetcher_fetcher_.fetcher.md#unshift)
* [wait](_sync_fetcher_fetcher_.fetcher.md#wait)
* [wrap](_sync_fetcher_fetcher_.fetcher.md#wrap)
* [write](_sync_fetcher_fetcher_.fetcher.md#write)
* [from](_sync_fetcher_fetcher_.fetcher.md#static-from)

## Constructors

###  constructor

\+ **new Fetcher**(`options`: [FetcherOptions](../interfaces/_sync_fetcher_fetcher_.fetcheroptions.md)): *[Fetcher](_sync_fetcher_fetcher_.fetcher.md)*

*Overrides void*

*Defined in [lib/sync/fetcher/fetcher.ts:51](https://github.com/ethereumjs/ethereumjs-client/blob/master/lib/sync/fetcher/fetcher.ts#L51)*

Create new fetcher

**Parameters:**

Name | Type |
------ | ------ |
`options` | [FetcherOptions](../interfaces/_sync_fetcher_fetcher_.fetcheroptions.md) |

**Returns:** *[Fetcher](_sync_fetcher_fetcher_.fetcher.md)*

## Properties

###  config

• **config**: *[Config](_config_.config.md)*

*Defined in [lib/sync/fetcher/fetcher.ts:37](https://github.com/ethereumjs/ethereumjs-client/blob/master/lib/sync/fetcher/fetcher.ts#L37)*

___

###  destroyed

• **destroyed**: *boolean*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[destroyed](_sync_fetcher_fetcher_.fetcher.md#destroyed)*

Defined in node_modules/@types/node/stream.d.ts:35

___

###  readable

• **readable**: *boolean*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[readable](_sync_fetcher_fetcher_.fetcher.md#readable)*

Defined in node_modules/@types/node/stream.d.ts:28

___

###  readableEncoding

• **readableEncoding**: *BufferEncoding | null*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[readableEncoding](_sync_fetcher_fetcher_.fetcher.md#readableencoding)*

Defined in node_modules/@types/node/stream.d.ts:29

___

###  readableEnded

• **readableEnded**: *boolean*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[readableEnded](_sync_fetcher_fetcher_.fetcher.md#readableended)*

Defined in node_modules/@types/node/stream.d.ts:30

___

###  readableFlowing

• **readableFlowing**: *boolean | null*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[readableFlowing](_sync_fetcher_fetcher_.fetcher.md#readableflowing)*

Defined in node_modules/@types/node/stream.d.ts:31

___

###  readableHighWaterMark

• **readableHighWaterMark**: *number*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[readableHighWaterMark](_sync_fetcher_fetcher_.fetcher.md#readablehighwatermark)*

Defined in node_modules/@types/node/stream.d.ts:32

___

###  readableLength

• **readableLength**: *number*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[readableLength](_sync_fetcher_fetcher_.fetcher.md#readablelength)*

Defined in node_modules/@types/node/stream.d.ts:33

___

###  readableObjectMode

• **readableObjectMode**: *boolean*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[readableObjectMode](_sync_fetcher_fetcher_.fetcher.md#readableobjectmode)*

Defined in node_modules/@types/node/stream.d.ts:34

## Methods

###  [Symbol.asyncIterator]

▸ **[Symbol.asyncIterator]**(): *AsyncIterableIterator‹any›*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[[Symbol.asyncIterator]](_sync_fetcher_fetcher_.fetcher.md#[symbol.asynciterator])*

Defined in node_modules/@types/node/stream.d.ts:124

**Returns:** *AsyncIterableIterator‹any›*

___

###  _destroy

▸ **_destroy**(`error`: Error | null, `callback`: function): *void*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[_destroy](_sync_fetcher_fetcher_.fetcher.md#_destroy)*

Defined in node_modules/@types/node/stream.d.ts:47

**Parameters:**

▪ **error**: *Error | null*

▪ **callback**: *function*

▸ (`error?`: Error | null): *void*

**Parameters:**

Name | Type |
------ | ------ |
`error?` | Error &#124; null |

**Returns:** *void*

___

###  _read

▸ **_read**(): *void*

*Overrides void*

*Defined in [lib/sync/fetcher/fetcher.ts:116](https://github.com/ethereumjs/ethereumjs-client/blob/master/lib/sync/fetcher/fetcher.ts#L116)*

Implements Readable._read() by pushing completed tasks to the read queue

**Returns:** *void*

___

###  addListener

▸ **addListener**(`event`: "close", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[addListener](_sync_fetcher_fetcher_.fetcher.md#addlistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[addListener](_net_protocol_sender_.sender.md#addlistener)*

Defined in node_modules/@types/node/stream.d.ts:61

Event emitter
The defined events on documents including:
1. close
2. data
3. end
4. error
5. pause
6. readable
7. resume

**Parameters:**

▪ **event**: *"close"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **addListener**(`event`: "data", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[addListener](_sync_fetcher_fetcher_.fetcher.md#addlistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[addListener](_net_protocol_sender_.sender.md#addlistener)*

Defined in node_modules/@types/node/stream.d.ts:62

**Parameters:**

▪ **event**: *"data"*

▪ **listener**: *function*

▸ (`chunk`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |

**Returns:** *this*

▸ **addListener**(`event`: "end", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[addListener](_sync_fetcher_fetcher_.fetcher.md#addlistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[addListener](_net_protocol_sender_.sender.md#addlistener)*

Defined in node_modules/@types/node/stream.d.ts:63

**Parameters:**

▪ **event**: *"end"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **addListener**(`event`: "error", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[addListener](_sync_fetcher_fetcher_.fetcher.md#addlistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[addListener](_net_protocol_sender_.sender.md#addlistener)*

Defined in node_modules/@types/node/stream.d.ts:64

**Parameters:**

▪ **event**: *"error"*

▪ **listener**: *function*

▸ (`err`: Error): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | Error |

**Returns:** *this*

▸ **addListener**(`event`: "pause", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[addListener](_sync_fetcher_fetcher_.fetcher.md#addlistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[addListener](_net_protocol_sender_.sender.md#addlistener)*

Defined in node_modules/@types/node/stream.d.ts:65

**Parameters:**

▪ **event**: *"pause"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **addListener**(`event`: "readable", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[addListener](_sync_fetcher_fetcher_.fetcher.md#addlistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[addListener](_net_protocol_sender_.sender.md#addlistener)*

Defined in node_modules/@types/node/stream.d.ts:66

**Parameters:**

▪ **event**: *"readable"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **addListener**(`event`: "resume", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[addListener](_sync_fetcher_fetcher_.fetcher.md#addlistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[addListener](_net_protocol_sender_.sender.md#addlistener)*

Defined in node_modules/@types/node/stream.d.ts:67

**Parameters:**

▪ **event**: *"resume"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **addListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[addListener](_sync_fetcher_fetcher_.fetcher.md#addlistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[addListener](_net_protocol_sender_.sender.md#addlistener)*

Defined in node_modules/@types/node/stream.d.ts:68

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  dequeue

▸ **dequeue**(): *void*

*Defined in [lib/sync/fetcher/fetcher.ts:102](https://github.com/ethereumjs/ethereumjs-client/blob/master/lib/sync/fetcher/fetcher.ts#L102)*

Dequeue all done tasks that completed in order

**Returns:** *void*

___

###  destroy

▸ **destroy**(`error?`: Error): *void*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[destroy](_sync_fetcher_fetcher_.fetcher.md#destroy)*

Defined in node_modules/@types/node/stream.d.ts:48

**Parameters:**

Name | Type |
------ | ------ |
`error?` | Error |

**Returns:** *void*

___

###  emit

▸ **emit**(`event`: "close"): *boolean*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[emit](_sync_fetcher_fetcher_.fetcher.md#emit)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[emit](_net_protocol_sender_.sender.md#emit)*

Defined in node_modules/@types/node/stream.d.ts:70

**Parameters:**

Name | Type |
------ | ------ |
`event` | "close" |

**Returns:** *boolean*

▸ **emit**(`event`: "data", `chunk`: any): *boolean*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[emit](_sync_fetcher_fetcher_.fetcher.md#emit)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[emit](_net_protocol_sender_.sender.md#emit)*

Defined in node_modules/@types/node/stream.d.ts:71

**Parameters:**

Name | Type |
------ | ------ |
`event` | "data" |
`chunk` | any |

**Returns:** *boolean*

▸ **emit**(`event`: "end"): *boolean*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[emit](_sync_fetcher_fetcher_.fetcher.md#emit)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[emit](_net_protocol_sender_.sender.md#emit)*

Defined in node_modules/@types/node/stream.d.ts:72

**Parameters:**

Name | Type |
------ | ------ |
`event` | "end" |

**Returns:** *boolean*

▸ **emit**(`event`: "error", `err`: Error): *boolean*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[emit](_sync_fetcher_fetcher_.fetcher.md#emit)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[emit](_net_protocol_sender_.sender.md#emit)*

Defined in node_modules/@types/node/stream.d.ts:73

**Parameters:**

Name | Type |
------ | ------ |
`event` | "error" |
`err` | Error |

**Returns:** *boolean*

▸ **emit**(`event`: "pause"): *boolean*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[emit](_sync_fetcher_fetcher_.fetcher.md#emit)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[emit](_net_protocol_sender_.sender.md#emit)*

Defined in node_modules/@types/node/stream.d.ts:74

**Parameters:**

Name | Type |
------ | ------ |
`event` | "pause" |

**Returns:** *boolean*

▸ **emit**(`event`: "readable"): *boolean*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[emit](_sync_fetcher_fetcher_.fetcher.md#emit)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[emit](_net_protocol_sender_.sender.md#emit)*

Defined in node_modules/@types/node/stream.d.ts:75

**Parameters:**

Name | Type |
------ | ------ |
`event` | "readable" |

**Returns:** *boolean*

▸ **emit**(`event`: "resume"): *boolean*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[emit](_sync_fetcher_fetcher_.fetcher.md#emit)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[emit](_net_protocol_sender_.sender.md#emit)*

Defined in node_modules/@types/node/stream.d.ts:76

**Parameters:**

Name | Type |
------ | ------ |
`event` | "resume" |

**Returns:** *boolean*

▸ **emit**(`event`: string | symbol, ...`args`: any[]): *boolean*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[emit](_sync_fetcher_fetcher_.fetcher.md#emit)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[emit](_net_protocol_sender_.sender.md#emit)*

Defined in node_modules/@types/node/stream.d.ts:77

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |
`...args` | any[] |

**Returns:** *boolean*

___

###  enqueue

▸ **enqueue**(`job`: any): *void*

*Defined in [lib/sync/fetcher/fetcher.ts:88](https://github.com/ethereumjs/ethereumjs-client/blob/master/lib/sync/fetcher/fetcher.ts#L88)*

Enqueue job

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`job` | any |   |

**Returns:** *void*

___

###  error

▸ **error**(`error`: Error, `job?`: any): *void*

*Defined in [lib/sync/fetcher/fetcher.ts:201](https://github.com/ethereumjs/ethereumjs-client/blob/master/lib/sync/fetcher/fetcher.ts#L201)*

Handle error

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`error` | Error | error object |
`job?` | any | task  |

**Returns:** *void*

___

###  eventNames

▸ **eventNames**(): *Array‹string | symbol›*

*Inherited from [Sender](_net_protocol_sender_.sender.md).[eventNames](_net_protocol_sender_.sender.md#eventnames)*

Defined in node_modules/@types/node/events.d.ts:77

**Returns:** *Array‹string | symbol›*

___

###  expire

▸ **expire**(`job`: any): *void*

*Defined in [lib/sync/fetcher/fetcher.ts:308](https://github.com/ethereumjs/ethereumjs-client/blob/master/lib/sync/fetcher/fetcher.ts#L308)*

Expire job that has timed out and ban associated peer. Timed out tasks will
be re-inserted into the queue.

**Parameters:**

Name | Type |
------ | ------ |
`job` | any |

**Returns:** *void*

___

### `Private` failure

▸ **failure**(`job`: any, `error?`: Error): *void*

*Defined in [lib/sync/fetcher/fetcher.ts:154](https://github.com/ethereumjs/ethereumjs-client/blob/master/lib/sync/fetcher/fetcher.ts#L154)*

handle failed job completion

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`job` | any | failed job |
`error?` | Error |   |

**Returns:** *void*

___

###  fetch

▸ **fetch**(): *Promise‹undefined | false›*

*Defined in [lib/sync/fetcher/fetcher.ts:246](https://github.com/ethereumjs/ethereumjs-client/blob/master/lib/sync/fetcher/fetcher.ts#L246)*

Run the fetcher. Returns a promise that resolves once all tasks are completed.

**Returns:** *Promise‹undefined | false›*

___

###  getMaxListeners

▸ **getMaxListeners**(): *number*

*Inherited from [Sender](_net_protocol_sender_.sender.md).[getMaxListeners](_net_protocol_sender_.sender.md#getmaxlisteners)*

Defined in node_modules/@types/node/events.d.ts:69

**Returns:** *number*

___

###  isPaused

▸ **isPaused**(): *boolean*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[isPaused](_sync_fetcher_fetcher_.fetcher.md#ispaused)*

Defined in node_modules/@types/node/stream.d.ts:42

**Returns:** *boolean*

___

###  listenerCount

▸ **listenerCount**(`event`: string | symbol): *number*

*Inherited from [Sender](_net_protocol_sender_.sender.md).[listenerCount](_net_protocol_sender_.sender.md#listenercount)*

Defined in node_modules/@types/node/events.d.ts:73

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *number*

___

###  listeners

▸ **listeners**(`event`: string | symbol): *Function[]*

*Inherited from [Sender](_net_protocol_sender_.sender.md).[listeners](_net_protocol_sender_.sender.md#listeners)*

Defined in node_modules/@types/node/events.d.ts:70

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  next

▸ **next**(): *any*

*Defined in [lib/sync/fetcher/fetcher.ts:168](https://github.com/ethereumjs/ethereumjs-client/blob/master/lib/sync/fetcher/fetcher.ts#L168)*

Process next task

**Returns:** *any*

___

###  off

▸ **off**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [Sender](_net_protocol_sender_.sender.md).[off](_net_protocol_sender_.sender.md#off)*

Defined in node_modules/@types/node/events.d.ts:66

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  on

▸ **on**(`event`: "close", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[on](_sync_fetcher_fetcher_.fetcher.md#on)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[on](_net_protocol_sender_.sender.md#on)*

Defined in node_modules/@types/node/stream.d.ts:79

**Parameters:**

▪ **event**: *"close"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **on**(`event`: "data", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[on](_sync_fetcher_fetcher_.fetcher.md#on)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[on](_net_protocol_sender_.sender.md#on)*

Defined in node_modules/@types/node/stream.d.ts:80

**Parameters:**

▪ **event**: *"data"*

▪ **listener**: *function*

▸ (`chunk`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |

**Returns:** *this*

▸ **on**(`event`: "end", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[on](_sync_fetcher_fetcher_.fetcher.md#on)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[on](_net_protocol_sender_.sender.md#on)*

Defined in node_modules/@types/node/stream.d.ts:81

**Parameters:**

▪ **event**: *"end"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **on**(`event`: "error", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[on](_sync_fetcher_fetcher_.fetcher.md#on)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[on](_net_protocol_sender_.sender.md#on)*

Defined in node_modules/@types/node/stream.d.ts:82

**Parameters:**

▪ **event**: *"error"*

▪ **listener**: *function*

▸ (`err`: Error): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | Error |

**Returns:** *this*

▸ **on**(`event`: "pause", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[on](_sync_fetcher_fetcher_.fetcher.md#on)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[on](_net_protocol_sender_.sender.md#on)*

Defined in node_modules/@types/node/stream.d.ts:83

**Parameters:**

▪ **event**: *"pause"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **on**(`event`: "readable", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[on](_sync_fetcher_fetcher_.fetcher.md#on)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[on](_net_protocol_sender_.sender.md#on)*

Defined in node_modules/@types/node/stream.d.ts:84

**Parameters:**

▪ **event**: *"readable"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **on**(`event`: "resume", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[on](_sync_fetcher_fetcher_.fetcher.md#on)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[on](_net_protocol_sender_.sender.md#on)*

Defined in node_modules/@types/node/stream.d.ts:85

**Parameters:**

▪ **event**: *"resume"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **on**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[on](_sync_fetcher_fetcher_.fetcher.md#on)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[on](_net_protocol_sender_.sender.md#on)*

Defined in node_modules/@types/node/stream.d.ts:86

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  once

▸ **once**(`event`: "close", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[once](_sync_fetcher_fetcher_.fetcher.md#once)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[once](_net_protocol_sender_.sender.md#once)*

Defined in node_modules/@types/node/stream.d.ts:88

**Parameters:**

▪ **event**: *"close"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **once**(`event`: "data", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[once](_sync_fetcher_fetcher_.fetcher.md#once)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[once](_net_protocol_sender_.sender.md#once)*

Defined in node_modules/@types/node/stream.d.ts:89

**Parameters:**

▪ **event**: *"data"*

▪ **listener**: *function*

▸ (`chunk`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |

**Returns:** *this*

▸ **once**(`event`: "end", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[once](_sync_fetcher_fetcher_.fetcher.md#once)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[once](_net_protocol_sender_.sender.md#once)*

Defined in node_modules/@types/node/stream.d.ts:90

**Parameters:**

▪ **event**: *"end"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **once**(`event`: "error", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[once](_sync_fetcher_fetcher_.fetcher.md#once)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[once](_net_protocol_sender_.sender.md#once)*

Defined in node_modules/@types/node/stream.d.ts:91

**Parameters:**

▪ **event**: *"error"*

▪ **listener**: *function*

▸ (`err`: Error): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | Error |

**Returns:** *this*

▸ **once**(`event`: "pause", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[once](_sync_fetcher_fetcher_.fetcher.md#once)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[once](_net_protocol_sender_.sender.md#once)*

Defined in node_modules/@types/node/stream.d.ts:92

**Parameters:**

▪ **event**: *"pause"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **once**(`event`: "readable", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[once](_sync_fetcher_fetcher_.fetcher.md#once)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[once](_net_protocol_sender_.sender.md#once)*

Defined in node_modules/@types/node/stream.d.ts:93

**Parameters:**

▪ **event**: *"readable"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **once**(`event`: "resume", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[once](_sync_fetcher_fetcher_.fetcher.md#once)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[once](_net_protocol_sender_.sender.md#once)*

Defined in node_modules/@types/node/stream.d.ts:94

**Parameters:**

▪ **event**: *"resume"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **once**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[once](_sync_fetcher_fetcher_.fetcher.md#once)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[once](_net_protocol_sender_.sender.md#once)*

Defined in node_modules/@types/node/stream.d.ts:95

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  pause

▸ **pause**(): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[pause](_sync_fetcher_fetcher_.fetcher.md#pause)*

Defined in node_modules/@types/node/stream.d.ts:40

**Returns:** *this*

___

###  peer

▸ **peer**(`_job?`: any): *[Peer](_net_peer_peer_.peer.md)‹›*

*Defined in [lib/sync/fetcher/fetcher.ts:280](https://github.com/ethereumjs/ethereumjs-client/blob/master/lib/sync/fetcher/fetcher.ts#L280)*

Returns a peer that can process the given job

**Parameters:**

Name | Type |
------ | ------ |
`_job?` | any |

**Returns:** *[Peer](_net_peer_peer_.peer.md)‹›*

___

###  pipe

▸ **pipe**‹**T**›(`destination`: T, `options?`: undefined | object): *T*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[pipe](_sync_fetcher_fetcher_.fetcher.md#pipe)*

Defined in node_modules/@types/node/stream.d.ts:5

**Type parameters:**

▪ **T**: *WritableStream*

**Parameters:**

Name | Type |
------ | ------ |
`destination` | T |
`options?` | undefined &#124; object |

**Returns:** *T*

___

###  prependListener

▸ **prependListener**(`event`: "close", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[prependListener](_sync_fetcher_fetcher_.fetcher.md#prependlistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[prependListener](_net_protocol_sender_.sender.md#prependlistener)*

Defined in node_modules/@types/node/stream.d.ts:97

**Parameters:**

▪ **event**: *"close"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependListener**(`event`: "data", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[prependListener](_sync_fetcher_fetcher_.fetcher.md#prependlistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[prependListener](_net_protocol_sender_.sender.md#prependlistener)*

Defined in node_modules/@types/node/stream.d.ts:98

**Parameters:**

▪ **event**: *"data"*

▪ **listener**: *function*

▸ (`chunk`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |

**Returns:** *this*

▸ **prependListener**(`event`: "end", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[prependListener](_sync_fetcher_fetcher_.fetcher.md#prependlistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[prependListener](_net_protocol_sender_.sender.md#prependlistener)*

Defined in node_modules/@types/node/stream.d.ts:99

**Parameters:**

▪ **event**: *"end"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependListener**(`event`: "error", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[prependListener](_sync_fetcher_fetcher_.fetcher.md#prependlistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[prependListener](_net_protocol_sender_.sender.md#prependlistener)*

Defined in node_modules/@types/node/stream.d.ts:100

**Parameters:**

▪ **event**: *"error"*

▪ **listener**: *function*

▸ (`err`: Error): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | Error |

**Returns:** *this*

▸ **prependListener**(`event`: "pause", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[prependListener](_sync_fetcher_fetcher_.fetcher.md#prependlistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[prependListener](_net_protocol_sender_.sender.md#prependlistener)*

Defined in node_modules/@types/node/stream.d.ts:101

**Parameters:**

▪ **event**: *"pause"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependListener**(`event`: "readable", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[prependListener](_sync_fetcher_fetcher_.fetcher.md#prependlistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[prependListener](_net_protocol_sender_.sender.md#prependlistener)*

Defined in node_modules/@types/node/stream.d.ts:102

**Parameters:**

▪ **event**: *"readable"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependListener**(`event`: "resume", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[prependListener](_sync_fetcher_fetcher_.fetcher.md#prependlistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[prependListener](_net_protocol_sender_.sender.md#prependlistener)*

Defined in node_modules/@types/node/stream.d.ts:103

**Parameters:**

▪ **event**: *"resume"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[prependListener](_sync_fetcher_fetcher_.fetcher.md#prependlistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[prependListener](_net_protocol_sender_.sender.md#prependlistener)*

Defined in node_modules/@types/node/stream.d.ts:104

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  prependOnceListener

▸ **prependOnceListener**(`event`: "close", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[prependOnceListener](_sync_fetcher_fetcher_.fetcher.md#prependoncelistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[prependOnceListener](_net_protocol_sender_.sender.md#prependoncelistener)*

Defined in node_modules/@types/node/stream.d.ts:106

**Parameters:**

▪ **event**: *"close"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependOnceListener**(`event`: "data", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[prependOnceListener](_sync_fetcher_fetcher_.fetcher.md#prependoncelistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[prependOnceListener](_net_protocol_sender_.sender.md#prependoncelistener)*

Defined in node_modules/@types/node/stream.d.ts:107

**Parameters:**

▪ **event**: *"data"*

▪ **listener**: *function*

▸ (`chunk`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |

**Returns:** *this*

▸ **prependOnceListener**(`event`: "end", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[prependOnceListener](_sync_fetcher_fetcher_.fetcher.md#prependoncelistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[prependOnceListener](_net_protocol_sender_.sender.md#prependoncelistener)*

Defined in node_modules/@types/node/stream.d.ts:108

**Parameters:**

▪ **event**: *"end"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependOnceListener**(`event`: "error", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[prependOnceListener](_sync_fetcher_fetcher_.fetcher.md#prependoncelistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[prependOnceListener](_net_protocol_sender_.sender.md#prependoncelistener)*

Defined in node_modules/@types/node/stream.d.ts:109

**Parameters:**

▪ **event**: *"error"*

▪ **listener**: *function*

▸ (`err`: Error): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | Error |

**Returns:** *this*

▸ **prependOnceListener**(`event`: "pause", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[prependOnceListener](_sync_fetcher_fetcher_.fetcher.md#prependoncelistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[prependOnceListener](_net_protocol_sender_.sender.md#prependoncelistener)*

Defined in node_modules/@types/node/stream.d.ts:110

**Parameters:**

▪ **event**: *"pause"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependOnceListener**(`event`: "readable", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[prependOnceListener](_sync_fetcher_fetcher_.fetcher.md#prependoncelistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[prependOnceListener](_net_protocol_sender_.sender.md#prependoncelistener)*

Defined in node_modules/@types/node/stream.d.ts:111

**Parameters:**

▪ **event**: *"readable"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependOnceListener**(`event`: "resume", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[prependOnceListener](_sync_fetcher_fetcher_.fetcher.md#prependoncelistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[prependOnceListener](_net_protocol_sender_.sender.md#prependoncelistener)*

Defined in node_modules/@types/node/stream.d.ts:112

**Parameters:**

▪ **event**: *"resume"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **prependOnceListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[prependOnceListener](_sync_fetcher_fetcher_.fetcher.md#prependoncelistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[prependOnceListener](_net_protocol_sender_.sender.md#prependoncelistener)*

Defined in node_modules/@types/node/stream.d.ts:113

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  process

▸ **process**(`_job?`: any, `_peer?`: any, `_result?`: any): *void*

*Defined in [lib/sync/fetcher/fetcher.ts:300](https://github.com/ethereumjs/ethereumjs-client/blob/master/lib/sync/fetcher/fetcher.ts#L300)*

Process the reply for the given job

**Parameters:**

Name | Type |
------ | ------ |
`_job?` | any |
`_peer?` | any |
`_result?` | any |

**Returns:** *void*

___

###  push

▸ **push**(`chunk`: any, `encoding?`: BufferEncoding): *boolean*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[push](_sync_fetcher_fetcher_.fetcher.md#push)*

Defined in node_modules/@types/node/stream.d.ts:46

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |
`encoding?` | BufferEncoding |

**Returns:** *boolean*

___

###  rawListeners

▸ **rawListeners**(`event`: string | symbol): *Function[]*

*Inherited from [Sender](_net_protocol_sender_.sender.md).[rawListeners](_net_protocol_sender_.sender.md#rawlisteners)*

Defined in node_modules/@types/node/events.d.ts:71

**Parameters:**

Name | Type |
------ | ------ |
`event` | string &#124; symbol |

**Returns:** *Function[]*

___

###  read

▸ **read**(`size?`: undefined | number): *any*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[read](_sync_fetcher_fetcher_.fetcher.md#read)*

Defined in node_modules/@types/node/stream.d.ts:38

**Parameters:**

Name | Type |
------ | ------ |
`size?` | undefined &#124; number |

**Returns:** *any*

___

###  removeAllListeners

▸ **removeAllListeners**(`event?`: string | symbol): *this*

*Inherited from [Sender](_net_protocol_sender_.sender.md).[removeAllListeners](_net_protocol_sender_.sender.md#removealllisteners)*

Defined in node_modules/@types/node/events.d.ts:67

**Parameters:**

Name | Type |
------ | ------ |
`event?` | string &#124; symbol |

**Returns:** *this*

___

###  removeListener

▸ **removeListener**(`event`: "close", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[removeListener](_sync_fetcher_fetcher_.fetcher.md#removelistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[removeListener](_net_protocol_sender_.sender.md#removelistener)*

Defined in node_modules/@types/node/stream.d.ts:115

**Parameters:**

▪ **event**: *"close"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **removeListener**(`event`: "data", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[removeListener](_sync_fetcher_fetcher_.fetcher.md#removelistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[removeListener](_net_protocol_sender_.sender.md#removelistener)*

Defined in node_modules/@types/node/stream.d.ts:116

**Parameters:**

▪ **event**: *"data"*

▪ **listener**: *function*

▸ (`chunk`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |

**Returns:** *this*

▸ **removeListener**(`event`: "end", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[removeListener](_sync_fetcher_fetcher_.fetcher.md#removelistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[removeListener](_net_protocol_sender_.sender.md#removelistener)*

Defined in node_modules/@types/node/stream.d.ts:117

**Parameters:**

▪ **event**: *"end"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **removeListener**(`event`: "error", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[removeListener](_sync_fetcher_fetcher_.fetcher.md#removelistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[removeListener](_net_protocol_sender_.sender.md#removelistener)*

Defined in node_modules/@types/node/stream.d.ts:118

**Parameters:**

▪ **event**: *"error"*

▪ **listener**: *function*

▸ (`err`: Error): *void*

**Parameters:**

Name | Type |
------ | ------ |
`err` | Error |

**Returns:** *this*

▸ **removeListener**(`event`: "pause", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[removeListener](_sync_fetcher_fetcher_.fetcher.md#removelistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[removeListener](_net_protocol_sender_.sender.md#removelistener)*

Defined in node_modules/@types/node/stream.d.ts:119

**Parameters:**

▪ **event**: *"pause"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **removeListener**(`event`: "readable", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[removeListener](_sync_fetcher_fetcher_.fetcher.md#removelistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[removeListener](_net_protocol_sender_.sender.md#removelistener)*

Defined in node_modules/@types/node/stream.d.ts:120

**Parameters:**

▪ **event**: *"readable"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **removeListener**(`event`: "resume", `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[removeListener](_sync_fetcher_fetcher_.fetcher.md#removelistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[removeListener](_net_protocol_sender_.sender.md#removelistener)*

Defined in node_modules/@types/node/stream.d.ts:121

**Parameters:**

▪ **event**: *"resume"*

▪ **listener**: *function*

▸ (): *void*

**Returns:** *this*

▸ **removeListener**(`event`: string | symbol, `listener`: function): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[removeListener](_sync_fetcher_fetcher_.fetcher.md#removelistener)*

*Overrides [Sender](_net_protocol_sender_.sender.md).[removeListener](_net_protocol_sender_.sender.md#removelistener)*

Defined in node_modules/@types/node/stream.d.ts:122

**Parameters:**

▪ **event**: *string | symbol*

▪ **listener**: *function*

▸ (...`args`: any[]): *void*

**Parameters:**

Name | Type |
------ | ------ |
`...args` | any[] |

**Returns:** *this*

___

###  request

▸ **request**(`_job?`: any, `_peer?`: any): *Promise‹any›*

*Defined in [lib/sync/fetcher/fetcher.ts:290](https://github.com/ethereumjs/ethereumjs-client/blob/master/lib/sync/fetcher/fetcher.ts#L290)*

Request results from peer for the given job. Resolves with the raw result.

**Parameters:**

Name | Type |
------ | ------ |
`_job?` | any |
`_peer?` | any |

**Returns:** *Promise‹any›*

___

###  resume

▸ **resume**(): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[resume](_sync_fetcher_fetcher_.fetcher.md#resume)*

Defined in node_modules/@types/node/stream.d.ts:41

**Returns:** *this*

___

###  setEncoding

▸ **setEncoding**(`encoding`: BufferEncoding): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[setEncoding](_sync_fetcher_fetcher_.fetcher.md#setencoding)*

Defined in node_modules/@types/node/stream.d.ts:39

**Parameters:**

Name | Type |
------ | ------ |
`encoding` | BufferEncoding |

**Returns:** *this*

___

###  setMaxListeners

▸ **setMaxListeners**(`n`: number): *this*

*Inherited from [Sender](_net_protocol_sender_.sender.md).[setMaxListeners](_net_protocol_sender_.sender.md#setmaxlisteners)*

Defined in node_modules/@types/node/events.d.ts:68

**Parameters:**

Name | Type |
------ | ------ |
`n` | number |

**Returns:** *this*

___

###  store

▸ **store**(`_result?`: any): *Promise‹void›*

*Defined in [lib/sync/fetcher/fetcher.ts:328](https://github.com/ethereumjs/ethereumjs-client/blob/master/lib/sync/fetcher/fetcher.ts#L328)*

Store fetch result. Resolves once store operation is complete.

**Parameters:**

Name | Type |
------ | ------ |
`_result?` | any |

**Returns:** *Promise‹void›*

___

### `Private` success

▸ **success**(`job`: any, `result`: any): *void*

*Defined in [lib/sync/fetcher/fetcher.ts:126](https://github.com/ethereumjs/ethereumjs-client/blob/master/lib/sync/fetcher/fetcher.ts#L126)*

handle successful job completion

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`job` | any | successful job |
`result` | any | job result  |

**Returns:** *void*

___

###  tasks

▸ **tasks**(): *object[]*

*Defined in [lib/sync/fetcher/fetcher.ts:80](https://github.com/ethereumjs/ethereumjs-client/blob/master/lib/sync/fetcher/fetcher.ts#L80)*

Generate list of tasks to fetch

**Returns:** *object[]*

tasks

___

###  unpipe

▸ **unpipe**(`destination?`: NodeJS.WritableStream): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[unpipe](_sync_fetcher_fetcher_.fetcher.md#unpipe)*

Defined in node_modules/@types/node/stream.d.ts:43

**Parameters:**

Name | Type |
------ | ------ |
`destination?` | NodeJS.WritableStream |

**Returns:** *this*

___

###  unshift

▸ **unshift**(`chunk`: any, `encoding?`: BufferEncoding): *void*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[unshift](_sync_fetcher_fetcher_.fetcher.md#unshift)*

Defined in node_modules/@types/node/stream.d.ts:44

**Parameters:**

Name | Type |
------ | ------ |
`chunk` | any |
`encoding?` | BufferEncoding |

**Returns:** *void*

___

###  wait

▸ **wait**(`delay?`: undefined | number): *Promise‹void›*

*Defined in [lib/sync/fetcher/fetcher.ts:332](https://github.com/ethereumjs/ethereumjs-client/blob/master/lib/sync/fetcher/fetcher.ts#L332)*

**Parameters:**

Name | Type |
------ | ------ |
`delay?` | undefined &#124; number |

**Returns:** *Promise‹void›*

___

###  wrap

▸ **wrap**(`oldStream`: ReadableStream): *this*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[wrap](_sync_fetcher_fetcher_.fetcher.md#wrap)*

Defined in node_modules/@types/node/stream.d.ts:45

**Parameters:**

Name | Type |
------ | ------ |
`oldStream` | ReadableStream |

**Returns:** *this*

___

###  write

▸ **write**(): *void*

*Defined in [lib/sync/fetcher/fetcher.ts:211](https://github.com/ethereumjs/ethereumjs-client/blob/master/lib/sync/fetcher/fetcher.ts#L211)*

Setup writer pipe and start writing fetch results. A pipe is used in order
to support backpressure from storing results.

**Returns:** *void*

___

### `Static` from

▸ **from**(`iterable`: Iterable‹any› | AsyncIterable‹any›, `options?`: ReadableOptions): *Readable*

*Inherited from [Fetcher](_sync_fetcher_fetcher_.fetcher.md).[from](_sync_fetcher_fetcher_.fetcher.md#static-from)*

Defined in node_modules/@types/node/stream.d.ts:26

A utility method for creating Readable Streams out of iterators.

**Parameters:**

Name | Type |
------ | ------ |
`iterable` | Iterable‹any› &#124; AsyncIterable‹any› |
`options?` | ReadableOptions |

**Returns:** *Readable*
