import AimButton, { props as btnProps } from '../button/button';
import AimButtonGroup from '../button-group/button-group';
import AimHCollapse from '../collapse/h-collapse';

/**
 * Expandable button group.
 */
export default {
    name: 'AimExpandButton',
    props: {
        ...btnProps,
        /**
         * Text content to place in expand button.
         */
        text: {
            type: String,
            default: '',
        },
        /**
         * Whether to make component content initially visible.
         */
        startOpen: {
            type: Boolean,
            default: false, 
        },
    },
    data() {
        return {
            show: this.startOpen,
            transitioning: false,
        };
    },
    computed: {
        classObject() {
            return {
                collapse: !this.transitioning,
                show: this.show && !this.transitioning,
            };;
        },
    },
    methods: {
        onEnter() {
            this.transitioning = true;
        },
        onAfterEnter() {
            this.transitioning = false;
        },
        onLeave() {
            this.transitioning = true;
        },
        onAfterLeave() {
            this.transitioning = false;
        },
        handleShow(show) {
            this.show = show;
        },
        createWrapper(h, children) {
            const toggleExpandBtn = h(
                AimButton,
                {
                    props: {
                        pressed: this.show,
                    },
                    on: {
                        'update:pressed': this.handleShow,
                    },
                    class: {
                        'btn-add-border': !this.show && !this.transitioning,
                    },
                },
                [this.text]
            );
            return h(
                'div',
                { staticClass: 'expand-btn-wrapper', },
                [toggleExpandBtn, ...children]
            );
        },
        createExpandContent(h, children) {
            const buttonGroup = h(
                AimButtonGroup,
                {
                    props: {
                        subgroup: true,
                    },
                },
                children
            );
            const wrapperDirectives = [
                { name: 'show', value: this.show },
            ];
            const collapseWrapper = h(
                'div',
                {
                    staticClass: 'collapse-wrapper',
                    class: this.classObject,
                    directives: wrapperDirectives,
                },
                [buttonGroup]
            );
            return h(
                AimHCollapse,
                {
                    props: { appear: this.startOpen },
                    on: {
                        enter: this.onEnter,
                        afterEnter: this.onAfterEnter,
                        leave: this.onLeave,
                        afterLeave: this.onAfterLeave
                    },
                },
                [collapseWrapper]
            );
        },
    },
    render(h) {
        const defaultSlots = this.$slots.default;
        return this.createWrapper(h, [this.createExpandContent(h, defaultSlots)]);
    },
};
