/// <reference types="vitest/globals" />

import generateBatches from '../src/index.js'
import * as utils from '../src/utils.js'

beforeEach(() => {
  vi.restoreAllMocks()
})

it('should generate batches with default batch size based on CPUs', async () => {
  vi.spyOn(utils, 'getAvailableBatch').mockResolvedValueOnce(4)

  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const batches = await generateBatches(data)

  expect(batches).toHaveLength(3)
  expect(batches[0]).toEqual([1, 2, 3, 4])
  expect(batches[1]).toEqual([5, 6, 7, 8])
  expect(batches[2]).toEqual([9, 10])
})

it('should generate batches with custom batch size', async () => {
  const data = [1, 2, 3, 4, 5]
  const batches = await generateBatches(data, 2)

  expect(batches).toHaveLength(3)
  expect(batches[0]).toEqual([1, 2])
  expect(batches[1]).toEqual([3, 4])
  expect(batches[2]).toEqual([5])
})

it('should handle empty input array', async () => {
  const data: number[] = []
  const batches = await generateBatches(data)

  expect(batches).toHaveLength(0)
})

it('should return the correct number of CPUs in browser environment', async () => {
  global.navigator = {
    hardwareConcurrency: 4
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any

  const availableBatch = await utils.getAvailableBatch()
  expect(availableBatch).toEqual(8)
})

it('should handle errors gracefully and return the default value', async () => {
  vi.doMock('os', () => ({
    cpus: vi.fn(() => new Error('error'))
  }))

  const data = [1, 2, 3, 4, 5, 6, 7, 8]
  const batches = await generateBatches(data)

  expect(batches).toHaveLength(1)
  expect(batches[0]).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
})
