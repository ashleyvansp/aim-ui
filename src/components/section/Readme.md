Sections are placed inside a `aim-container` in panes and windows.

```
<template>
    <div>
        <aim-button @click="isOpen = !isOpen">Toggle Window List</aim-button>
        <aim-window-menu
            title="Window List"
            overflow="scroll"
            :initWidth="450"
            :initHeight="300"
            positionHint="center"
            v-model="isOpen"
        >
            <aim-container pad="3">
                <aim-section>
                    <aim-section-item><h2>Wikipedia</h2></aim-section-item>
                </aim-section>
                <aim-section>
                    <aim-section-item>From today's featured article
                    </aim-section-item>
                    <aim-section-divider />
                    <aim-section-item>Almost There is the first studio album by the American Christian rock band MercyMe (singer and drummer pictured), released on August 14, 2001, by INO Records. Characterizing it as contemporary worship and pop rock, music critics praised the album's songwriting, especially on "I Can Only Imagine", but gave its sound mixed reviews, ranging from "fresh" and "innovative" to derivative. CCM Magazine cited it in the 25th anniversary edition of their 100 Albums You Need to Own list. "Bless Me Indeed (Jabez's Song)" was released as the album's lead single, but it underperformed on the charts. The second single, "I Can Only Imagine", boosted sales for the album, and crossed over to mainstream radio in 2003. The album peaked at number 39 on the Billboard 200 and number one on the Billboard Christian Albums chart. Billboard ranked it as the fourth best-selling Christian album of 2000–2009 in the United States. Both the album and the single "I Can Only Imagine" have sold more than 3 million copies.
                    </aim-section-item>
                </aim-section>
                <aim-section>
                    <aim-section-item>Did you know ...
                    </aim-section-item>
                    <aim-section-divider />
                    <aim-section-item>... that Dona Joaninha (pictured), which had hauled sugar cane across Brazil since 1940, was sold to a scrap dealer and then became a monument?
                    </aim-section-item>
                    <aim-section-divider />
                    <aim-section-item>... that today, JoAnne S. Bass becomes not only the first female senior enlisted member of any U.S. military branch, but also the first person of Asian descent to hold that position in the Air Force?
                    </aim-section-item>
                    <aim-section-divider />
                    <aim-section-item>... that in 1264, the Genoese captured an entire Venetian trade convoy after tricking the Venetian fleet into thinking that they had sailed for the Levant?
                    </aim-section-item>
                    <aim-section-divider />
                    <aim-section-item>... that William Bishop and Noël Poynter's biography of John Symcotts, sometime physician to Oliver Cromwell, provides a record of the life of a medical practitioner, whose work usually goes unrecognised?
                    </aim-section-item>
                    <aim-section-divider />
                    <aim-section-item>... that students in the Baranovich Yeshiva, a premier Torah institute in pre-war Europe, spent years learning to understand the simple meaning of the Talmud?
                    </aim-section-item>
                </aim-section>
            </aim-container>
        </aim-window-menu>
    </div>
</template>

<script>
export default {
    data() {
        return { isOpen: false };
    },
}
</script>
```

```
<aim-container flex :style="{height: '300px', width: '100%'}">
    <aim-pane-container :flexPaneIndex="1"
        :initWidth="400" :minWidth="400" :maxWidth="400"
    >
        <aim-pane-menu
            title="Pane Sections"
            overflow="scroll"
        >
            <aim-container pad="3">
                <aim-section>
                    <aim-section-item><h2>Wikipedia</h2></aim-section-item>1
                </aim-section>
                <aim-section>
                    <aim-section-item>From today's featured article
                    </aim-section-item>
                    <aim-section-divider />
                    <aim-section-item>Almost There is the first studio album by the American Christian rock band MercyMe (singer and drummer pictured), released on August 14, 2001, by INO Records. Characterizing it as contemporary worship and pop rock, music critics praised the album's songwriting, especially on "I Can Only Imagine", but gave its sound mixed reviews, ranging from "fresh" and "innovative" to derivative. CCM Magazine cited it in the 25th anniversary edition of their 100 Albums You Need to Own list. "Bless Me Indeed (Jabez's Song)" was released as the album's lead single, but it underperformed on the charts. The second single, "I Can Only Imagine", boosted sales for the album, and crossed over to mainstream radio in 2003. The album peaked at number 39 on the Billboard 200 and number one on the Billboard Christian Albums chart. Billboard ranked it as the fourth best-selling Christian album of 2000–2009 in the United States. Both the album and the single "I Can Only Imagine" have sold more than 3 million copies.
                    </aim-section-item>
                </aim-section>
                <aim-section>
                    <aim-section-item>Did you know ...
                    </aim-section-item>
                    <aim-section-divider />
                    <aim-section-item>... that Dona Joaninha (pictured), which had hauled sugar cane across Brazil since 1940, was sold to a scrap dealer and then became a monument?
                    </aim-section-item>
                    <aim-section-divider />
                    <aim-section-item>... that today, JoAnne S. Bass becomes not only the first female senior enlisted member of any U.S. military branch, but also the first person of Asian descent to hold that position in the Air Force?
                    </aim-section-item>
                    <aim-section-divider />
                    <aim-section-item>... that in 1264, the Genoese captured an entire Venetian trade convoy after tricking the Venetian fleet into thinking that they had sailed for the Levant?
                    </aim-section-item>
                    <aim-section-divider />
                    <aim-section-item>... that William Bishop and Noël Poynter's biography of John Symcotts, sometime physician to Oliver Cromwell, provides a record of the life of a medical practitioner, whose work usually goes unrecognised?
                    </aim-section-item>
                    <aim-section-divider />
                    <aim-section-item>... that students in the Baranovich Yeshiva, a premier Torah institute in pre-war Europe, spent years learning to understand the simple meaning of the Talmud?
                    </aim-section-item>
                </aim-section>
            </aim-container>
        </aim-pane-menu>
    </aim-pane-container>
</aim-container>
```

The padding and margins used in sections can be adjusted by setting the `pad` prop in the `aim-container` that the list is immediately contained in. As of this writing, the padding options are 0, 1, 2, 3.

```
<aim-container flex :style="{height: '300px', width: '100%'}">
    <aim-pane-container :flexPaneIndex="2"
        :initWidth="320" :minWidth="320" :maxWidth="320"
    >
        <aim-pane-menu
            title="Paddig 1"
            overflow="scroll"
        >
            <aim-container pad="1">
                <aim-section>
                    <aim-section-item><h2>Wikipedia</h2></aim-section-item>
                </aim-section>
                <aim-section>
                    <aim-section-item>From today's featured article
                    </aim-section-item>
                    <aim-section-divider />
                    <aim-section-item>Almost There is the first studio album by the American Christian rock band MercyMe (singer and drummer pictured), released on August 14, 2001, by INO Records. Characterizing it as contemporary worship and pop rock, music critics praised the album's songwriting, especially on "I Can Only Imagine", but gave its sound mixed reviews, ranging from "fresh" and "innovative" to derivative. CCM Magazine cited it in the 25th anniversary edition of their 100 Albums You Need to Own list. "Bless Me Indeed (Jabez's Song)" was released as the album's lead single, but it underperformed on the charts. The second single, "I Can Only Imagine", boosted sales for the album, and crossed over to mainstream radio in 2003. The album peaked at number 39 on the Billboard 200 and number one on the Billboard Christian Albums chart. Billboard ranked it as the fourth best-selling Christian album of 2000–2009 in the United States. Both the album and the single "I Can Only Imagine" have sold more than 3 million copies.
                    </aim-section-item>
                </aim-section>
                <aim-section>
                    <aim-section-item>Did you know ...
                    </aim-section-item>
                    <aim-section-divider />
                    <aim-section-item>... that Dona Joaninha (pictured), which had hauled sugar cane across Brazil since 1940, was sold to a scrap dealer and then became a monument?
                    </aim-section-item>
                    <aim-section-divider />
                    <aim-section-item>... that today, JoAnne S. Bass becomes not only the first female senior enlisted member of any U.S. military branch, but also the first person of Asian descent to hold that position in the Air Force?
                    </aim-section-item>
                    <aim-section-divider />
                    <aim-section-item>... that in 1264, the Genoese captured an entire Venetian trade convoy after tricking the Venetian fleet into thinking that they had sailed for the Levant?
                    </aim-section-item>
                </aim-section>
            </aim-container>
        </aim-pane-menu>
        <aim-pane-menu
            title="Padding 2"
            overflow="scroll"
        >
            <aim-container pad="2">
                <aim-section>
                    <aim-section-item><h2>Wikipedia</h2></aim-section-item>
                </aim-section>
                <aim-section>
                    <aim-section-item>From today's featured article
                    </aim-section-item>
                    <aim-section-divider />
                    <aim-section-item>Almost There is the first studio album by the American Christian rock band MercyMe (singer and drummer pictured), released on August 14, 2001, by INO Records. Characterizing it as contemporary worship and pop rock, music critics praised the album's songwriting, especially on "I Can Only Imagine", but gave its sound mixed reviews, ranging from "fresh" and "innovative" to derivative. CCM Magazine cited it in the 25th anniversary edition of their 100 Albums You Need to Own list. "Bless Me Indeed (Jabez's Song)" was released as the album's lead single, but it underperformed on the charts. The second single, "I Can Only Imagine", boosted sales for the album, and crossed over to mainstream radio in 2003. The album peaked at number 39 on the Billboard 200 and number one on the Billboard Christian Albums chart. Billboard ranked it as the fourth best-selling Christian album of 2000–2009 in the United States. Both the album and the single "I Can Only Imagine" have sold more than 3 million copies.
                    </aim-section-item>
                </aim-section>
                <aim-section>
                    <aim-section-item>Did you know ...
                    </aim-section-item>
                    <aim-section-divider />
                    <aim-section-item>... that Dona Joaninha (pictured), which had hauled sugar cane across Brazil since 1940, was sold to a scrap dealer and then became a monument?
                    </aim-section-item>
                    <aim-section-divider />
                    <aim-section-item>... that today, JoAnne S. Bass becomes not only the first female senior enlisted member of any U.S. military branch, but also the first person of Asian descent to hold that position in the Air Force?
                    </aim-section-item>
                    <aim-section-divider />
                    <aim-section-item>... that in 1264, the Genoese captured an entire Venetian trade convoy after tricking the Venetian fleet into thinking that they had sailed for the Levant?
                    </aim-section-item>
                </aim-section>
            </aim-container>
        </aim-pane-menu>
        <div>
        </div>
    </aim-pane-container>
</aim-container>
```
