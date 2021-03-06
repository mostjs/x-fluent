// @flow
import type { Disposable, Scheduler, Sink, Stream } from '@most/types'

export const fluently = <A> (stream: Stream<A>): FluentStream<A> =>
  new FluentStream(stream)

export class FluentStream <A> {
  stream: Stream<A>

  constructor (stream: Stream<A>) {
    this.stream = stream
  }

  thru <B> (f: Stream<A> => Stream<B>): FluentStream<B> {
    return new FluentStream(f(this.stream))
  }

  apply <B> (f: Stream<A> => B): B {
    return f(this.stream)
  }

  run (sink: Sink<A>, scheduler: Scheduler): Disposable {
    return this.stream.run(sink, scheduler)
  }
}
