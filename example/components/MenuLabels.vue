<template>
    <aim-container pad="2">
        <aim-section>
            <aim-section-item>
                Dictionary {{ dictionaryName }}
            </aim-section-item>
            <aim-section-divider />
            <aim-section-item>
                <aim-button-group>
                    <aim-button>
                        Un/select all
                        <br />
                        regions
                    </aim-button>
                    <aim-button>
                        Download
                        <br />
                        annotations
                    </aim-button>
                </aim-button-group>
            </aim-section-item>
        </aim-section>
        <aim-section>
            <aim-section-item>
                <aim-grid pad="1"
                    :columns="columns"
                    :items="items"
                >
                    <template v-slot:col(0)="props">
                        <div
                            class="grid-btn begin icon"
                            :style="getCellStyle(props.slug)"
                        >
                            <i class="fa fa-eye" aria-hidden="true"></i>
                        </div>
                    </template>
                    <template v-slot:col(1)="props">
                        <div
                            class="grid-btn icon"
                            :style="getSettingsCellStyle(props.slug)"
                            @click="toggleSettings(props.slug)"
                        >
                            <i class="fa fa-cog" aria-hidden="true"></i>
                        </div>
                    </template>
                    <template v-slot:col(2)="props">
                        <div
                            class="grid-btn end"
                            :style="getCellStyle(props.slug)"
                        >
                            <div class="content">
                                {{ props.name }}
                            </div>
                            <div class="spacing"></div>
                            <div class="badge">0</div>
                        </div>
                    </template>
                    <template v-slot:col-span="props">
                        <aim-v-collapse :appear="false" >
                            <div v-if="isSettingsOpen[props.slug]">
                                <aim-container class="pad-1">
                                    <aim-section>
                                        <aim-section-item>
                                            <aim-button-group>
                                                <aim-button>
                                                    Un/select label
                                                    <br />
                                                    regions
                                                </aim-button>
                                                <aim-button>
                                                    Download label
                                                    <br />
                                                    annotations
                                                </aim-button>
                                            </aim-button-group>
                                        </aim-section-item>
                                        <aim-section-divider />
                                        <aim-section-item>
                                            Setting 1
                                        </aim-section-item>
                                        <aim-section-divider />
                                        <aim-section-item>
                                            Setting 2
                                        </aim-section-item>
                                    </aim-section>
                                </aim-container>
                            </div>
                        </aim-v-collapse>
                    </template>
                </aim-grid>
            </aim-section-item>
        </aim-section>
    </aim-container>
</template>

<script>
import { hsvToHex, randHex, hexAdjustContrast } from '../utils/color';

// http://tumor.informatics.jax.org/mtbwi/orthologySearch.do;jsessionid=FA2D936B1775CFFD62CA289997674B39?sortBy=HumanGS&compare=Equals&reference=94725&asList=true
const mockLabels = {
    ACOT11: { slug: "ACOT11", name: "acyl-CoA thioesterase 11", },
    ANP32E: { slug: "ANP32E", name: "acidic (leucine-rich) nuclear phosphoprotein 32 family, member E", },
    BCL11B: { slug: "BCL11B", name: "B-cell CLL/lymphoma 11B (zinc finger protein)", },
    C19orf12: { slug: "C19orf12", name: "chromosome 19 open reading frame 12", },
    CAPSL: { slug: "CAPSL", name: "calcyphosine-like", },
    CCND1: { slug: "CCND1", name: "cyclin D1", },
    CCND2: { slug: "CCND2", name: "cyclin D2", },
    CELF2: { slug: "CELF2", name: "CUGBP, Elav-like family member 2", },
    DOCK8: { slug: "DOCK8", name: "dedicator of cytokinesis 8", },
    DYM: { slug: "DYM", name: "dymeclin", },
    ERG: { slug: "ERG", name: "v-ets avian erythroblastosis virus E26 oncogene homolog", },
    ETS1: { slug: "ETS1", name: "v-ets avian erythroblastosis virus E26 oncogene homolog 1", },
    ETV6: { slug: "ETV6", name: "ets variant 6", },
    FAM49A: { slug: "FAM49A", name: "family with sequence similarity 49, member A", },
    FLT3: { slug: "FLT3", name: "fms-related tyrosine kinase 3", },
    FOXP1: { slug: "FOXP1", name: "forkhead box P1", },
    FUT8: { slug: "FUT8", name: "fucosyltransferase 8 (alpha (1,6) fucosyltransferase)", },
    FYB: { slug: "FYB", name: "FYN binding protein", },
    IKZF3: { slug: "IKZF3", name: "IKAROS family zinc finger 3 (Aiolos)", },
    ITPR2: { slug: "ITPR2", name: "inositol 1,4,5-triphosphate receptor, type 2", },
    JAZF1: { slug: "JAZF1", name: "JAZF zinc finger 1", },
    LGALS9: { slug: "LGALS9", name: "lectin, galactoside-binding, soluble, 9", },
    MBD2: { slug: "MBD2", name: "methyl-CpG binding domain protein 2", },
    MCL1: { slug: "MCL1", name: "myeloid cell leukemia 1", },
    MECOM: { slug: "MECOM", name: "MDS1 and EVI1 complex locus", },
    MYC: { slug: "MYC", name: "v-myc avian myelocytomatosis viral oncogene homolog", },
    MYCN: { slug: "MYCN", name: "v-myc avian myelocytomatosis viral oncogene neuroblastoma derived homolog", },
    NEDD4L: { slug: "NEDD4L", name: "neural precursor cell expressed, developmentally down-regulated 4-like, E3 ubiquitin protein ligase", },
    NOTCH1: { slug: "NOTCH1", name: "Notch homolog 1, translocation-associated (Drosophila)", },
    NTN1: { slug: "NTN1", name: "netrin 1", },
    PAG1: { slug: "PAG1", name: "phosphoprotein associated with glycosphingolipid microdomains 1", },
    PIK3CD: { slug: "PIK3CD", name: "phosphatidylinositol-4,5-bisphosphate 3-kinase, catalytic subunit delta", },
    PML: { slug: "PML", name: "promyelocytic leukemia", },
    PTP4A3: { slug: "PTP4A3", name: "protein tyrosine phosphatase type IVA, member 3", },
    RCBTB2: { slug: "RCBTB2", name: "regulator of chromosome condensation (RCC1) and BTB (POZ) domain containing protein 2", },
    RORC: { slug: "RORC", name: "RAR-related orphan receptor C", },
    SDK1: { slug: "SDK1", name: "sidekick cell adhesion molecule 1", },
    SLA: { slug: "SLA", name: "Src-like-adaptor", },
    SLC1A3: { slug: "SLC1A3", name: "solute carrier family 1 (glial high affinity glutamate transporter), member 3", },
    TBC1D1: { slug: "TBC1D1", name: "TBC1 (tre-2/USP6, BUB2, cdc16) domain family, member 1", },
    TP53INP1: { slug: "TP53INP1", name: "tumor protein p53 inducible nuclear protein 1", },
    TPD52: { slug: "TPD52", name: "tumor protein D52", },
    VPS13D: { slug: "VPS13D", name: "vacuolar protein sorting 13 homolog D (S. cerevisiae)", },
    WWOX: { slug: "WWOX", name: "WW domain containing oxidoreductase", },
    ZMIZ1: { slug: "ZMIZ1", name: "zinc finger, MIZ-type containing 1", },
    ZNF438: { slug: "ZNF438", name: "zinc finger protein 438", },
};
const mockLabelSlugs = Object.keys(mockLabels);

export default {
    name: 'MenuLabels',
    data() {
        const isSettingsOpen = mockLabelSlugs
                .reduce((m, labelSlug) => {
                    m[labelSlug] = false;
                    return m;
                }, { });
        return {
            dictionaryName: 'QuPath',
            labels: { },
            // labels: mockLabels,
            labelSlugs: mockLabelSlugs,
            columns: [30, 30, 'minmax(0, 1fr)'],
            labelColors: { },
            isSettingsOpen, 
        };
    },
    computed: {
        items() {
            return Object.values(this.labels)
                    .map(label => [[label, label, label], [{span: true, ...label}]])
                    .flat();
        },
    },
    methods: {
        assignColorCellColor(labelSlug) {
            let hex = this.labelColors[labelSlug];
            if(!hex) {
                hex = randHex(0.60, [0.8, 0.99]);
                this.labelColors[labelSlug] = hex;
            }
            return hex;
        },
        getCellStyle(labelSlug) {
            const hex = this.assignColorCellColor(labelSlug);
            return { 'background-color': hex };
        },
        getSettingsCellStyle(labelSlug) {
            let hex = this.assignColorCellColor(labelSlug);
            hex = this.isSettingsOpen[labelSlug] ? hexAdjustContrast(hex, -50) : hex;
            return { 'background-color': hex };
        },
        toggleSettings(labelSlug) {
            this.isSettingsOpen = {...this.isSettingsOpen};
            this.isSettingsOpen[labelSlug] = !this.isSettingsOpen[labelSlug];
        },
    },
    mounted() {
        // Test updating labels
        setTimeout(() => {
            this.labels = mockLabels;
        }, 3000);
    },
}
</script>