<template>
    <div>
        <NavBar />
        <div class="container">
            <div class="left-sidebar">
                <div class="sidebar-activity">
                    <h3>Recent</h3>
                    <a href="">
                        <img src="./img/recent.png" />
                        Web Developer
                    </a>
                    <a href=""><img src="./img/recent.png" />User Interface</a>
                    <a href=""><img src="./img/recent.png" />Online</a>
                    <a href=""><img src="./img/recent.png" />Learn online</a>
                    <a href=""><img src="./img/recent.png" />code</a>
                    <a href=""><img src="./img/recent.png" />Web Developer</a>
                    <h3>Groups</h3>
                    <a href=""><img src="./img/group.png" />Groups Chat</a>
                </div>
            </div>
            <div class="main-content">
                <div class="create-post">
                    <div class="create-post-input">
                        <img src="./img/user-1.png"/>
                        <textarea rows="2" placeholder="..."></textarea>
                    </div>
                    <div class="create-post-links">
                        <button type="submit" @click="logout">
                            <font-awesome-icon :icon="['fas', 'images']" />
                            <span class="button-text">Image</span>
                        </button>
                        <button type="submit">
                            <font-awesome-icon :icon="['fas', 'video']" />
                            <span class="button-text">Video</span>
                        </button>
                        <button></button>
                        <button>
                            <font-awesome-icon :icon="['fas', 'paper-plane']" />
                            <span class="button-text">Submit</span>
                        </button>
                    </div>
                </div>
            <Card/>
            </div>
        </div>
    </div>
</template>

<script>
import VueJwtDecode from 'vue-jwt-decode';
import api from '@/services/Api';
import Card from '../components/Card.vue';
import NavBar from '../components/NavBar.vue';

export default {
    name: 'HomePage',
    components: {
        Card,
        NavBar
    },
    data() {
        return {
            posts: [],
            newPostText: '',
            profile: {
                name: '',
                userId: '',
                role: 'Web developer',
                profileViews: 52
            },
            trendingTopics: ['#taqqqqqq', '#taqqqqqq', '#taqqqqqq', '#taqqqqqq', '#taqqqqqq']
        };
    },
    methods: {
        addPost() {
            if (this.newPostText.trim() !== '') {
                this.posts.unshift({
                    text: this.newPostText,
                    author: this.profile.name,
                    timestamp: new Date().toLocaleString()
                });
                this.newPostText = '';
            }
        },
        async logout() {
            try {
                await api.post('login/logout'); 
                localStorage.removeItem('token');
                this.$router.push('/login');
            } catch (error) {
                console.error('Error during logout:', error);
            }
        },
        getUserFromToken() {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decoded = VueJwtDecode.decode(token);
                    return {
                        username: decoded.username,
                        userId: decoded.userId
                    };
                } catch (error) {
                    console.error('Error decoding token:', error);
                    return null;
                }
            }
            return null;
        }
    },
    mounted() {
        const user = this.getUserFromToken();
        if (user) {
            this.profile.name = user.username;
            this.profile.userId = user.userId;
        }
    }
};
</script>


<style>
    .container {
        padding: 10px 6%;
        display: flex;
        flex-wrap: wrap;
    }

    .left-sidebar {
        flex-basis: 25%;
        align-self: flex-start;
    }


    .main-content {
        flex-basis: 50%;
    }

    .sidebar-profile-box {
        background: #fff;
    }
    .sidebar-profile-info {
        padding: 0 25px;
    }
    .sidebar-profile-info img {
        width: 90px;
        border-radius: 50%;
        background: #fff;
        padding: 4px;
        margin-top: -45px;
    }

    .sidebar-profile-info h1 {
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 20px;
        font-weight: 600;
        color: #222;
    }

    .sidebar-profile-info h3 {
        font-size: 14px;
        font-weight: 500;
        color: #777;
    }

    .sidebar-profile-info ul {
        list-style: none;
        margin: 20px 0;
    }

    .sidebar-profile-info li {
        width: 100%;
        margin: 5px 0;
        font-size: 13px;
    }
    .sidebar-profile-info ul li span {
        float: right;
        color:  #045be6;
    }

    .sidebar-pofile-link {
        display: flex;
        align-items: center;
        border-top: 1px solid #ccc;
    }
    .sidebar-pofile-link a {
        flex-basis: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 15px 0;
        font-size: 13px;
        border-left: 1px solid #ccc;
    }

    .sidebar-pofile-link a:first-child{
        border-left: 0;
    }
    .sidebar-pofile-link a img {
        width: 20px;
        margin-right: 10px;
    }

    .sidebar-activity {
        background: #fff;
        padding: 5px 25px;
        margin: 12px 0;
        
    }
    .sidebar-activity h3 {
        color: #000000;
        font-size: 14px;
        font-weight: 500;
        margin: 20px 0 10px;
    }

    .sidebar-activity a {
        display: flex;
        font-size: 12px;
        align-items: center;
        color: #000000;
        font-weight: 500;
        font-style: italic;
        margin: 3px 0;
    }

    .slidebar-news {
        background: #fff;
        padding: 10px 25px;
    }

    .info-icon {
        width: 11px;
        float: right;
        margin-top: 15px;
    }
    .slidebar-news h3 {
        font-size: 14px;
        font-weight: 600;
        color: #333;
        margin: 10px 0 30px;
    }

    .slidebar-news a {
        display: block;
        font-size: 12px;
        font-weight: 600;
        margin-top: 10px;
        margin-bottom: -5px;
        color: #045be6;
    }

    .slidebar-news span {
        font-size: 12px;

    }

    .create-post {
        background: #e9ecef;
        border-radius: 10px
    }

    .create-post-input {
        display: flex;
        align-items: center;
        padding: 20px 25px 10px;
        border-bottom: 1px solid #ccc;
    }

    .create-post-input img {
        width: 35px;
        border-radius: 50%;
        background: #fff;
        margin-right: 10px;
    }

    .create-post-input textarea {
        width: 100%;
        height: 100%;
        padding: 10px;
        border: 0;
        outline: none;
        resize: none;
        margin-top: 8px;
    }

    ::placeholder {
        font-weight: 500;
    }

    .create-post-links {
        display: flex;
        align-items: flex-start;
    }

    .create-post-links button {
        border-top: 1px solid #ccc;
        border-radius: 5px;
        flex-basis: 25%;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .button-text{
        margin-left: 5px
    }
</style>
