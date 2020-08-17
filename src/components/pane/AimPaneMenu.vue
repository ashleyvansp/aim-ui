<template>
    <aim-container flex wrappedBy="pane">
        <aim-headerbar headerFor="pane" :title="title">
            <template v-slot:actions>
                <aim-button @click="toggleCollapse">
                    <i class="fas fa-times" aria-hidden="true"></i>
                </aim-button>
            </template>
        </aim-headerbar>
        <aim-row flexItem="fill"
            :style="styleContent"
        >
            <slot />
        </aim-row>
    </aim-container>
</template>

<script>
import { OVERFLOW_OPTIONS } from '../../utils/constants';
import { arrayIncludes } from '../../utils/array';

import AimContainer from '../layout/container';
import AimRow from '../layout/row';
import AimButton from '../button/button';
import AimNavItem from '../nav/nav-item';
import AimNav from '../nav/nav';

/**
 * A pane in the pane container.
 * 
 * @example [none]
 */
export default {
    name: 'AimPaneMenu',
    components: {
        AimContainer,
        AimRow,
        AimButton,
    },
    inject: ['eventBus'],
    props: {
        /**
         * Text to place in pane header.
         */
        title: {
            type: String,
        },
        /**
         * Set what happens content overflows the bottom of the container.
         * @values 'visible', 'hidden', 'scroll', 'auto'
         * @see https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-y
         */
        overflow: {
            type: String,
            default: 'hidden',
            validator: str => arrayIncludes(OVERFLOW_OPTIONS, str)
        },
    },
    computed: {
        key() {
            return this.$vnode.key;
        },
        styleContent() {
            return {
                overflowY: this.overflow
            };
        },
    },
    methods: {
        toggleCollapse() {
            this.eventBus.$emit('toggleCollapse', this.key);
        },
    },
};
</script>
