import { type Component, mount as svelteMount } from 'svelte';

const mount = <P extends Record<string, any>>(
    component: Component<P>,
    rootElement: HTMLElement,
    props = {} as P
) => {

    rootElement.innerHTML = '';

    return svelteMount(component, {
        target: rootElement,
        props
    });
};

export default mount;