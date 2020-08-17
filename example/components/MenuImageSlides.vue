<template>
    <aim-container pad="2">
        <aim-list>
            <aim-list-item
                v-for="image in slideImages"
                :key="image.id"
            >
                <img :src="getImageThumbnail(image.id, 64)" />
                <div class="spacing"></div>
                <div class="content">
                    <div class="header">{{ image.name }}</div>
                    <div class="description">
                        Acquired on {{ image.acquisition_date }}
                    </div>
                    <div class="footer">
                        Uploaded by {{ image.author }}
                    </div>
                </div>
            </aim-list-item>
        </aim-list>
    </aim-container>
</template>

<script>
const mockSlideImages = [
    {
        id: 1,
        name: "VOA-240A.tiff",
        acquisition_date: "03/28/2020, 00:38:31",
        author: "AIM TEST",
    },{
        id: 2,
        name: "VOA-240B.tiff",
        acquisition_date: "03/28/2020, 00:38:31",
        author: "AIM TEST",

    },{
        id: 3,
        name: "VOA-240C.tiff",
        acquisition_date: "03/28/2020, 00:38:31",
        author: "AIM TEST",

    },{
        id: 4,
        name: "VOA-240D.tiff",
        acquisition_date: "03/28/2020, 00:38:31",
        author: "AIM TEST",

    },{
        id: 5,
        name: "VOA-240-D.tiff",
        acquisition_date: "03/28/2020, 00:38:31",
        author: "AIM TEST",

    },{
        id: 6,
        name: "VOA-1000-A.tiff",
        acquisition_date: "03/28/2020, 00:38:31",
        author: "AIM TEST",

    },{
        id: 7,
        name: "VOA-1000-B.tiff",
        acquisition_date: "03/28/2020, 00:38:31",
        author: "AIM TEST",

    },{
        id: 8,
        name: "VOA-1000-C.tiff",
        acquisition_date: "03/28/2020, 00:38:31",
        author: "AIM TEST",

    },{
        id: 9,
        name: "VOA-1000-D.tiff",
        acquisition_date: "03/28/2020, 00:38:31",
        author: "AIM TEST",

    }
];

const mockThumbnails = [
    "/mock/thumbnail_531.jpg",
    "/mock/thumbnail_532.jpg",
    "/mock/thumbnail_533.jpg",
];

export default {
    name: 'MenuImageSlides',
    data() {
        return {
            slideImages: mockSlideImages,
        };
    },
    methods: {
        getImageThumbnail(imageID, size) {
            return mockThumbnails[Math.floor(Math.random() * 3)];
        },
    },
}
</script>