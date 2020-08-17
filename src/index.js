
import { installFactory, pluginFactory } from './utils/plugins';

/* link */
import AimLink from './components/link/link';

/* button */
import AimButton from './components/button/button';
import AimButtonGroup from './components/button-group/button-group';
import AimExpandButton from './components/expand-button/expand-button';

/* layout */
import AimRow from './components/layout/row';
import AimCol from './components/layout/col';
import AimContainer from './components/layout/container';

/* section */
import AimSection from './components/section/section';
import AimSectionItem from './components/section/section-item';
import AimSectionDivider from './components/section/section-divider';

/* list */
import AimList from './components/list/list';
import AimListItem from './components/list/list-item';

/* grid */
import AimGrid from './components/grid/grid';

/* collapse */
import AimVCollapse from './components/collapse/v-collapse';
import AimHCollapse from './components/collapse/h-collapse';

/* nav */
import AimNavItem from './components/nav/nav-item';
import AimNav from './components/nav/nav';

/* tab */
import AimTabs from './components/tabs/tabs';
import AimTab from './components/tabs/tab';

/* menu */
import AimPaneContainer from './components/pane/pane-container';
import AimPaneMenu from './components/pane/AimPaneMenu.vue';
import AimWindowMenu from './components/window/AimWindowMenu.vue';

/* headerbar */
import AimHeaderbar from './components/headerbar/headerbar';

/* toolbar */
import AimToolbar from './components/toolbar/toolbar';

export const componentsPlugin = pluginFactory({
    components: {
        AimLink,
        AimButton,
        AimButtonGroup,
        AimExpandButton,
        AimRow,
        AimCol,
        AimContainer,
        AimList,
        AimListItem,
        AimSection,
        AimSectionItem,
        AimSectionDivider,
        AimGrid,
        AimVCollapse,
        AimHCollapse,
        AimNavItem,
        AimNav,
        AimTab,
        AimTabs,
        AimPaneContainer,
        AimPaneMenu,
        AimWindowMenu,
        AimHeaderbar,
        AimToolbar
    }
});

const install = installFactory({
    plugins: {
        componentsPlugin
    }
});

const AimUI = {
    install,
    NAME: 'AimUI'
};

export default AimUI;