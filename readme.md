# batch-me-up

A utility for efficiently splitting data into batches based on available CPU resources.

## Why?

- **Automatic Batch Sizing:** Optimizes batch size based on the number of available CPUs for efficient processing.
- **Custom Batch Sizes:** Allows us to specify batch sizes for specific needs.
- **Flexibility:** Works with arrays of any data type.

## Install

```bash
npm install batch-me-up
```

Or yarn:

```bash
yarn add batch-me-up
```

Alternatively, you can also include this module directly in your HTML file from CDN:

```yml
UMD: https://cdn.jsdelivr.net/npm/batch-me-up/dist/index.umd.js
ESM: https://cdn.jsdelivr.net/npm/batch-me-up/+esm
CJS: https://cdn.jsdelivr.net/npm/batch-me-up/dist/index.cjs
```

## Usage

```js
import generateBatches from 'batch-me-up'

const data = [1, 2, 3, 4, 5, 6, 7, 8]

// determine batch size based on available CPUs
const batches = await generateBatches(data)

// or specify a custom batch size
const batchesWithCustomSize = await generateBatches(data, 2)

// process each batch
const results = await Promise.all(
  batches.map(async batch => {
    // process each item within the batch concurrently
    return await Promise.all(batch.map(processItem))
  })
)

// flatten the results array, if needed
const finalResults = results.flat()
console.log(finalResults) // Output: [2, 4, 6, 8, 10, 12, 14, 16]
```

## API

### `generateBatches<T = any>(data: T[], batchSize?: number): Promise<T[][]>`

Generates batches of data based on the number of CPUs available or a provided batch size.

- `data` (array): The array of data to be batched.
- `batchSize` (number, optional): The desired size of each batch. If not provided, the function automatically determines the optimal batch size based on available CPUs.

**Returns:** An array of arrays, where each sub-array represents a batch of the original data.

## Use cases

- **Parallel Processing:** Divide a large dataset into batches for parallel processing using libraries like `Promise.all` or worker threads.
- **Streaming Data:** Process data in chunks as it is received from a stream or API.
- **Machine Learning:** Batch training data for efficient model training.

## Contributing

We 💛&nbsp; issues.

When committing, please conform to [the semantic-release commit standards](https://www.conventionalcommits.org/). Please install `commitizen` and the adapter globally, if you have not already.

```bash
npm i -g commitizen cz-conventional-changelog
```

Now you can use `git cz` or just `cz` instead of `git commit` when committing. You can also use `git-cz`, which is an alias for `cz`.

```bash
git add . && git cz
```

## License

![GitHub](https://img.shields.io/github/license/bent10/batch-me-up)

A project by [Stilearning](https://stilearning.com) &copy; 2021-2024.
