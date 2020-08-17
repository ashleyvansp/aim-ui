

/**
 * Load a component.
 * @param {object} Vue
 * @param {string} Component name
 * @param {object} Component definition
 */
export const registerComponent = (Vue, name, def) => {
    if (Vue && name && def) {
      Vue.component(name, def)
    }
  }
  
  /**
   * Load a group of components.
   * @param {object} Vue
   * @param {object} Object of component definitions
   */
  export const registerComponents = (Vue, components = {}) => {
    for (const component in components) {
      registerComponent(Vue, component, components[component])
    }
  }

/**
 * Load a group of plugins.
 * @param {object} Vue
 * @param {object} Plugin definitions
 */
export const registerPlugins = (Vue, plugins = {}) => {
    for (const plugin in plugins) {
        if (plugin && plugins[plugin]) {
            Vue.use(plugins[plugin]);
        }
    }
};

/**
 * Plugin install factory function.
 * @param {object} { components, directives }
 * @returns {function} plugin install function
 */
export const installFactory = ({ components, plugins } = {}) => {
    const install = (Vue, config = {}) => {
        if (install.installed) {
            return;
        }
        install.installed = true;
        registerComponents(Vue, components);
        registerPlugins(Vue, plugins);
    }
    install.installed = false;
    return install;
};

/**
 * Plugin object factory function.
 * @param {object} { components, directives, plugins }
 * @returns {object} plugin install object
 */
export const pluginFactory = (options = {}, extend = {}) => ({
    ...extend,
    install: installFactory(options)
  })