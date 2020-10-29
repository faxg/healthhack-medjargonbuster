import App from './App.svelte';

/**
 * Entry point: Create the svelte app for "public/index.html" 
 * and mount it on the "wrapper" element
 */
const app = new App({
  target: document.getElementById('wrapper')
  // hydrate: true
});
