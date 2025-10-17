import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import {federation} from "@module-federation/vite";
import { devDependencies  } from "./package.json"
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        svelte(),
        federation({
            name: "gallery",
            filename: "remoteEntry.js",
            exposes: {
                "./Gallery": "./src/page/Gallery.mount.ts",
            },
            shared: {
                'svelte': {
                    requiredVersion: devDependencies ["svelte"],
                    singleton: true,
                }
            },
            library: {
                type: "module"
            }
        }),
        cssInjectedByJsPlugin({
            jsAssetsFilterFunction: (outputChunk) => {
                return outputChunk.name === 'remoteEntry' ||
                    outputChunk.fileName.includes('remoteEntry');
            }
        })
    ],
    optimizeDeps: {
        exclude: ["@module-federation/vite"]
    },
    build: {
        modulePreload: false,
        target: "esnext",
        minify: false,
        cssCodeSplit: false,
        rollupOptions: {
            output: {
                assetFileNames() {
                    return "[name][extname]";
                },
            },
        }
    }
})
