// @flow
import { describe, it } from 'mocha'
import { is, eq } from '@briancavalier/assert'
import { type Stream } from '@most/types'
import { now, at, mergeArray, tap, runEffects } from '@most/core'
import { newDefaultScheduler } from '@most/scheduler'

import { fluently } from './index'

const identity = <A> (a: A): A => a

const collectEvents = <A>(stream: Stream<A>, events: A[] = []): Promise<A[]> =>
  runEffects(tap(x => events.push(x), stream), newDefaultScheduler())
    .then(_ => events)

const eqEventValues = <A>(s1: Stream<A>, s2: Stream<A>): Promise<*> =>
  collectEvents(s1).then(expectedEvents =>
    collectEvents(fluently(s2)).then(actualEvents =>
      eq(expectedEvents, actualEvents)))

describe('fluently', () => {
  it('fluently(s).to(identity) === s', () => {
    const s = now(1)
    is(s, fluently(s).to(identity))
  })

  it('fluently(s).thru(f) ~= fluently(f(s))', () => {
    const s = mergeArray([at(0, 0), at(1, 1), at(2, 2)])
    return eqEventValues(fluently(identity(s)), fluently(s).thru(identity))
  })

  it('s ~= fluently(s)', () => {
    const s = mergeArray([at(0, 0), at(1, 1), at(2, 2)])
    return eqEventValues(s, fluently(s))
  })
})
