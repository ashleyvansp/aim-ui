<template>
    <aim-toolbar>
        <template slot="logo">
            <img src="/img/AIM_logo.jpg" />
        </template>
        <aim-button-group toolbar>
            <aim-button>
                <i class="fas fa-search-plus fa-lg" aria-hidden="true"></i>
            </aim-button>
            <aim-button>
                <i class="fas fa-search-minus fa-lg" aria-hidden="true"></i>
            </aim-button>
            <aim-button>
                <i class="fas fa-expand-arrows-alt fa-lg" aria-hidden="true"></i>
            </aim-button>
        </aim-button-group>
        <aim-button-group toolbar>
            <aim-button>Navigate</aim-button>
            <aim-button>Annotate</aim-button>
            <aim-button>SelDrag</aim-button>
        </aim-button-group>
        <aim-button-group toolbar>
            <aim-button>
                <i class="far fa-save fa-lg"></i>
            </aim-button>
            <aim-expand-button text="Adv.">
                <aim-button>Clear</aim-button>
                <aim-button>TEST TEST</aim-button>
                <aim-button>TEST TEST</aim-button>
                <aim-button>TEST TEST</aim-button>
                <aim-button @click="toggleTheme()">Toggle Theme</aim-button>
            </aim-expand-button>
        </aim-button-group>
        <aim-button-group toolbar>
            <aim-button @click="toggleWindowOpen(0)">TEST 1</aim-button>
            <aim-button @click="toggleWindowOpen(1)">TEST 2</aim-button>
            <aim-button @click="toggleWindowOpen(2)">TEST 3</aim-button>
        </aim-button-group>
    </aim-toolbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'OlToolbar',
    data() {
        return { };
    },
    methods: {
        ...mapActions([
            'toggleWindowOpen',
            'toggleTheme',
        ]),
    },
}
</script>