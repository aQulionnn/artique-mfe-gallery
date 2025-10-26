
// Windows temporarily needs this file, https://github.com/module-federation/vite/issues/68

    const importMap = {
      
        "svelte": async () => {
          let pkg = await import("__mf__virtual/gallery__prebuild__svelte__prebuild__.js")
          return pkg
        }
      
    }
      const usedShared = {
      
          "svelte": {
            name: "svelte",
            version: "5.39.11",
            scope: ["default"],
            loaded: false,
            from: "gallery",
            async get () {
              usedShared["svelte"].loaded = true
              const {"svelte": pkgDynamicImport} = importMap 
              const res = await pkgDynamicImport()
              const exportModule = {...res}
              // All npm packages pre-built by vite will be converted to esm
              Object.defineProperty(exportModule, "__esModule", {
                value: true,
                enumerable: false
              })
              return function () {
                return exportModule
              }
            },
            shareConfig: {
              singleton: true,
              requiredVersion: "^5.39.6"
            }
          }
        
    }
      const usedRemotes = [
      ]
      export {
        usedShared,
        usedRemotes
      }
      