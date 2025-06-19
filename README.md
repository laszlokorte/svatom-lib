# Svatom Library

Collection of helper functions to apply the [CalmmJs](https://github.com/calmm-js/documentation/blob/master/introduction-to-calmm.md) architecture in [Svelte (version 5)](https://svelte.dev/)

The core idea is to compose [lenses](https://github.com/calmm-js/partial.lenses) to construct a bidirectional data flow between UI components.

## Dependencies

**Important**: This library contains `.svelte.js` files that need to be compiled in the context of a host project using the svelte compiler.

Svelte is required as peer dependency.

Currently these peer dependencies are required:
```js
{
	"devDependencies": {
		"partial.lenses": "^14.17.0",
		"ramda": "^0.30.1",
		"svelte": "^5.0.0"	
	}
}
```