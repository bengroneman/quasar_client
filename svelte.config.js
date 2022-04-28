// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),
  compilerOptions: {
    hydratable: true
  },
  kit: {
    adapter: adapter(),
    trailingSlash: 'ignore',
    prerender: {
      default: true
    }
  }
};

export default config;
