<template>
    <aim-container pad="2">
        <aim-section>
            <aim-section-item>
                Group {{ omeroGroupName }}
            </aim-section-item>
            <aim-section-divider />
            <aim-section-item>
                {{ omeroGroupSize }} members
            </aim-section-item>
        </aim-section>
        <aim-section>
            <aim-section-item>
                <table class="pad-2" width="100%">
                    <tbody v-for="member in omeroGroupMembers" :key="member.id">
                        <tr>
                            <td>
                                <div class="multicontent image align-items-center">
                                    <img class="avatar" :src="getAvatarURL(member.id)">
                                    <div class="spacing"></div>
                                    <div class="content">
                                        {{ member.username }}
                                    </div>
                                </div>
                            </td>
                            <td>
                                {{ member.fullname }}
                            </td>
                            <td>
                                {{ isCurrentUser(member) ? 'Showing' : 'Show' }}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </aim-section-item>
        </aim-section>
    </aim-container>
</template>

<script>
const mockOmeroGroupMembers = [
    {
        id: 1,
        username: "jabercrombie",
        fullname: "John Abercrombie",
    },{
        id: 2,
        username: "mabbott",
        fullname: "Maude Abbott",
    },{
        id: 3,
        username: "eachard",
        fullname: "Emile Achard",
    },{
        id: 4,
        username: "aackerman",
        fullname: "A. Bernard Ackerman",
    },{
        id: 5,
        username: "lackerman",
        fullname: "Lauren Ackerman",
    },{
        id: 6,
        username: "hbamberger",
        fullname: "Heinrich von Bamberger",
    },{
        id: 7,
        username: "hbamberger",
        fullname: "Heinrich von Bamberger",
    },{
        id: 8,
        username: "pbaumgarten",
        fullname: "Paul Clemens von Baumgarten",
    },{
        id: 9,
        username: "pbaumgarten",
        fullname: "Paul Clemens von Baumgarten",
    },{
        id: 10,
        username: "jbeckwith",
        fullname: "John Bruce Beckwith",
    },{
        id: 11,
        username: "xbichat",
        fullname: "Xavier Bichat",
    },{
        id: 12,
        username: "mbielschowsky",
        fullname: "Max Bielschowsky",
    },{
        id: 13,
        username: "ebiernacki",
        fullname: "Edmund Biernacki",
    },{
        id: 14,
        username: "mcanavan",
        fullname: "Myrtelle Canavan",
    },{
        id: 15,
        username: "bcastleman",
        fullname: "Benjamin Castleman",
    },{
        id: 16,
        username: "jbeckwith",
        fullname: "John Bruce Beckwith",
    },{
        id: 17,
        username: "jbeckwith",
        fullname: "John Bruce Beckwith",
    },{
        id: 18,
        username: "jbeckwith",
        fullname: "John Bruce Beckwith",
    },
];
 
const currentUser = mockOmeroGroupMembers[1];

export default {
    name: 'MenuUsers',
    data() {
        return {
            omeroGroupName: 'Pathologist Circle',
            omeroGroupMembers: mockOmeroGroupMembers,
            omeroGroupSize: mockOmeroGroupMembers.length,
        };
    },
    methods: {
        getAvatarURL(userID) {
            return '/mock/profile.png';
        },
        isCurrentUser(member) {
            return member.id === currentUser.id;
        },
    },
};
</script>