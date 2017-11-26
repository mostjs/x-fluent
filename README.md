**EXPERIMENTAL** This is an experimental package.

# @most/fluent

Use `@most/core` with a fluent API.  `@most/fluent` wraps a `@most/core` Stream in a FluentStream type that provides `thru` and `to` methods for dot-chaining.

## Get it

`npm i @most/fluent --save`

`yarn add @most/fluent`

## Types

### FluentStream

*info coming soon*

## API

### fluently :: Stream a &rarr; FluentStream a

Wrap a `@most/core` Stream in a FluentStream.

### thru :: FluentStream a ~> (Stream a &rarr; Stream b) &rarr; FluentStream b

Apply functions fluently to a Stream, wrapping the result in a FluentStream.  Use `thru` when you want to continue dot-chaining other Stream operations.

```js
import { change } from `@most/dom-event`
import { map, filter } from `@most/core`
import { fluently } from `@most/fluent`

const changes = change(inputElement)

// Wrap a @most/core stream of change events and fluently
// map change events to their associated input value, and
// retain only non-empty values
const changesFluent = fluently(changes)
  .thru(map(e => e.target.value))
  .thru(filter(value => value.length > 0))
```

### to :: FluentStream a ~> (Stream a &rarr; b) &rarr; b

Apply functions fluently to a Stream, _without_ wrapping the result.  Use `to` to return something other than a Stream.

*example coming soon*
