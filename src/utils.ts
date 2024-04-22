/**
 * Returns the number of CPUs available in the current environment or a
 * default value if unavailable.
 *
 * @returns The number of CPUs available or the default value.
 */
export async function getAvailableBatch(): Promise<number> {
  try {
    if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) {
      return navigator.hardwareConcurrency * 2
    }

    const os = await import('os')
    return os.cpus().length
  } catch (error) {
    console.error('Error determining available CPUs:', error)
  }

  // the default value
  return 8
}
