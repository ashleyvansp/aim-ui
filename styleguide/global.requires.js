import Vue from 'vue';

const mockSlideImages = [
    {
        id: 1,
        name: "VOA-240A.tiff",
        acquisition_date: "03/28/2020, 00:38:31",
        author: "AIM TEST",
        thumbnail: "/mock/thumbnail_531.jpg",
    },{
        id: 2,
        name: "VOA-240B.tiff",
        acquisition_date: "03/28/2020, 00:38:31",
        author: "AIM TEST",
        thumbnail: "/mock/thumbnail_532.jpg",
    },{
        id: 3,
        name: "VOA-240C.tiff",
        acquisition_date: "03/28/2020, 00:38:31",
        author: "AIM TEST",
        thumbnail: "/mock/thumbnail_533.jpg",

    },{
        id: 4,
        name: "VOA-240D.tiff",
        acquisition_date: "03/28/2020, 00:38:31",
        author: "AIM TEST",
        thumbnail: "/mock/thumbnail_531.jpg",

    },{
        id: 5,
        name: "VOA-240-D.tiff",
        acquisition_date: "03/28/2020, 00:38:31",
        author: "AIM TEST",
        thumbnail: "/mock/thumbnail_532.jpg",

    },{
        id: 6,
        name: "VOA-1000-A.tiff",
        acquisition_date: "03/28/2020, 00:38:31",
        author: "AIM TEST",
        thumbnail: "/mock/thumbnail_533.jpg",

    },{
        id: 7,
        name: "VOA-1000-B.tiff",
        acquisition_date: "03/28/2020, 00:38:31",
        author: "AIM TEST",
        thumbnail: "/mock/thumbnail_531.jpg",

    },{
        id: 8,
        name: "VOA-1000-C.tiff",
        acquisition_date: "03/28/2020, 00:38:31",
        author: "AIM TEST",
        thumbnail: "/mock/thumbnail_532.jpg",

    },{
        id: 9,
        name: "VOA-1000-D.tiff",
        acquisition_date: "03/28/2020, 00:38:31",
        author: "AIM TEST",
        thumbnail: "/mock/thumbnail_533.jpg",
    }
];

Vue.mixin({
    data() {
        return {
            mockSlideImages
        };
    }
});
