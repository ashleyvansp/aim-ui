const path = require('path');

const sections = [
    {
        name: "Instroduction and Setup",
        content: 'README.md'
    },{
        name: "Components",
        sectionDepth: 1,
        sections: [
            {
                name: "Gadgets and gizmos",
                components: () => [
                    'src/components/button/*.js',
                    'src/components/button-group/*.js',
                    'src/components/expand-button/*.js',
                    'src/components/grid/*.js',
                    'src/components/headerbar/*.js',
                    'src/components/link/*.js',
                    'src/components/nav/*.js',
                    'src/components/tabs/*.js',
                    'src/components/toolbar/*.js',
                ],
            },{
                name: "Collapse",
                content: 'src/components/collapse/Collapse.md',
                components: () => [
                    'src/components/collapse/*.js',
                ],
            },{
                name: "Pane",
                content: 'src/components/pane/Pane.md',
                components: () => [
                    'src/components/pane/*.js',
                    'src/components/pane/*.vue',
                ],
            },
        ]
    },{
        name: "Window",
        sectionDepth: 1,
        sections: [
            {
                name: "Part 1: Overview",
                components: () => [
                    'src/components/window/*.vue',
                ],
            },{
                name: "Part 2: Some examples",
                content: 'src/components/window/UsagesPart2.md'
            },{
                name: "Part 3: More usages",
                content: 'src/components/window/UsagesPart3.md'
            },
        ]
    },{
        name: "Layout",
        sectionDepth: 1,
        sections: [
            {
                name: "Part 1: Overview",
                content: 'src/components/layout/Layout.md',
                components: () => [
                    'src/components/layout/*.js',
                ],
            },{
                name: "Part 2: List",
                components: () => [
                    'src/components/list/*.js',
                ],
            },{
                name: "Part 3: Sections",
                components: () => [
                    'src/components/section/*.js',
                ],
            },
        ]
    }
];

const styles = {
    Playground: {
        preview: {
            background: '#121212'
        },
    },
};

module.exports = {
    pagePerSection: true,
    tocMode: 'collapse',
    require: [
        path.join(__dirname, 'styleguide/demo.css'),
        path.join(__dirname, 'src/scss/aim.scss'),
        path.join(__dirname, 'example/assets/fontawesome-free-5.13.1-web/css/all.min.css'),
        path.join(__dirname, 'styleguide/global.requires.js'),
    ],
    sections,
    styles,
    assetsDir: 'public',
    styleguideDir: 'styleguide/dist',
};
