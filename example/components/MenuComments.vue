<template>
    <aim-container pad="2">
        <aim-list>
            <aim-list-item
                v-for="comment in imageComments"
                :key="comment.id"
            >
                <img class="avatar" :src="getAvatarURL(comment.user_id)" />
                <div class="spacing"></div>
                <div class="content">
                    <div class="header">
                        {{ comment.username }}
                    </div>
                    <div class="description">
                        {{ comment.content }}
                    </div>
                    <div class="footer">
                        {{ comment.creation_date }}
                    </div>
                </div>
            </aim-list-item>
        </aim-list>
    </aim-container>
</template>

<script>
const mockImageComments = [
    {
        id: 1,
        user_id: 1,
        username: 'aim_test_1',
        content: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system.",
        creation_date: "05/28/2020, 02:16:34",
    },{
        id: 2,
        user_id: 2,
        username: 'aim_test_2',
        content: "expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.",
        creation_date: "05/28/2020, 02:16:34",
    },{
        id: 3,
        user_id: 2,
        username: 'aim_test_2',
        content: "No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.",
        creation_date: "05/28/2020, 02:16:34",
    },{
        id: 4,
        user_id: 1,
        username: 'aim_test_1',
        content: "Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure.",
        creation_date: "05/28/2020, 02:16:34",
    },{
        id: 5,
        user_id: 2,
        username: 'aim_test_2',
        content: "To take a trivial example",
        creation_date: "05/28/2020, 02:16:34",
    },{
        id: 6,
        user_id: 2,
        username: 'aim_test_2',
        content: "which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?",
        creation_date: "05/28/2020, 02:16:34",
    },{
        id: 7,
        user_id: 3,
        username: 'lbyron',
        content: "And thou art dead, as young and fair",
        creation_date: "05/28/2020, 02:16:34",
    },{
        id: 8,
        user_id: 3,
        username: 'lbyron',
        content: "As aught of mortal birth;",
        creation_date: "05/28/2020, 02:16:34",
    },{
        id: 9,
        user_id: 3,
        username: 'lbyron',
        content: "And form so soft, and charms so rare,",
        creation_date: "05/28/2020, 02:16:34",
    },{
        id: 10,
        user_id: 3,
        username: 'lbyron',
        content: "Too soon return'd to Earth!",
        creation_date: "05/28/2020, 02:16:34",
    },{
        id: 11,
        user_id: 3,
        username: 'lbyron',
        content: "Though Earth receiv'd them in her bed,",
        creation_date: "05/28/2020, 02:16:34",
    },{
        id: 12,
        user_id: 3,
        username: 'lbyron',
        content: "And o'er the spot the crowd may tread",
        creation_date: "05/28/2020, 02:16:34",
    },{
        id: 13,
        user_id: 3,
        username: 'lbyron',
        content: "In carelessness or mirth,",
        creation_date: "05/28/2020, 02:16:34",
    },{
        id: 14,
        user_id: 3,
        username: 'lbyron',
        content: "There is an eye which could not brook",
        creation_date: "05/28/2020, 02:16:34",
    },{
        id: 15,
        user_id: 3,
        username: 'lbyron',
        content: "A moment on that grave to look.",
        creation_date: "05/28/2020, 02:16:34",
    },
];

export default {
    name: 'MenuComments',
    components: {},
    data() {
        return {
            imageComments: mockImageComments,
        };
    },
    methods: {
        getAvatarURL(userID) {
            return '/mock/profile.png';
        },
    },
};
</script>