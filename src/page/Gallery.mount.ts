import baseMount from '../utils/bootstrap';
import Gallery from './Gallery.svelte';

export const mount = (rootElement: HTMLElement) => baseMount(Gallery, rootElement);