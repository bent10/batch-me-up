import { getAvailableBatch } from './utils.js'

/**
 * Generates batches of data based on the number of CPUs available or a
 * provided batch size.
 *
 * @param data The array of data to be batched.
 * @param batchSize Optional custom batch size.
 * @returns An array of batches containing the provided data.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function generateBatches<T = any>(
  data: T[],
  batchSize?: number
): Promise<T[][]> {
  if (!batchSize) {
    batchSize = await getAvailableBatch()
  }

  const batches: T[][] = []

  for (let i = 0; i < data.length; i += batchSize) {
    const batch: T[] = data.slice(i, i + batchSize)
    batches.push(batch)
  }

  return batches
}
