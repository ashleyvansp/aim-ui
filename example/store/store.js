/**
 * @module store/store
 */
import Vue from 'vue';
import Vuex from 'vuex';
import { MUTATION_TYPE, THEMES } from '../utils/constants';

Vue.use(Vuex);

/**
  * The store for AIMViewer
  * @type {Vuex.Store}
  */
const store = new Vuex.Store({
     state: {
        windowOpenModes: [...Array(100).keys()].map(x => true),
        theme: THEMES.NO_PREFERENCE,
     },
     getters: {
        getWindowIsOpen: (state) => (i) => state.windowOpenModes[i],
        currentTheme: (state) => state.theme,
     },
     mutations: {
        [MUTATION_TYPE.SET_WINDOW_IS_OPEN](state, { index, mode }) {
            state.windowOpenModes = [...state.windowOpenModes];
            state.windowOpenModes[index] = mode;
        },
        [MUTATION_TYPE.SET_THEME](state, theme) {
            state.theme = theme;
        }
     },
     actions: {
        setWindowOpen({ commit }, { index, mode }) {
            commit(MUTATION_TYPE.SET_WINDOW_IS_OPEN, { index, mode });
        },
        toggleWindowOpen({ commit, getters }, index) {
            const mode = !getters.getWindowIsOpen(index);
            commit(MUTATION_TYPE.SET_WINDOW_IS_OPEN, { index, mode });
        },
        toggleTheme({ commit, getters }) {
            let dataTheme = null;
            if(getters.currentTheme === THEMES.NO_PREFERENCE
                    || getters.currentTheme === THEMES.DARK) {
                commit(MUTATION_TYPE.SET_THEME, THEMES.LIGHT);
                dataTheme = "light";
            } else  {
                commit(MUTATION_TYPE.SET_THEME, THEMES.DARK);
                dataTheme = "dark";
            }
            document.body.setAttribute("data-theme", dataTheme);
        },
     },
});

export default store;