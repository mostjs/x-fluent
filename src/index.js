// @flow
import type { Disposable, Scheduler, Sink, Stream } from '@most/types'
import { run } from '@most/core'

export const fluently = <A> (stream: Stream<A>): Fluent<A> =>
  new Fluent(stream)

class Fluent <A> {
  stream: Stream<A>

  constructor (stream: Stream<A>) {
    this.stream = stream
  }

  thru <B> (f: Stream<A> => Stream<B>): Fluent<B> {
    return new Fluent(f(this.stream))
  }

  to <B> (f: Stream<A> => B): B {
    return f(this.stream)
  }

  run (sink: Sink<A>, scheduler: Scheduler): Disposable {
    return this.to(run(sink, scheduler))
  }
}
