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
                <form @submit.prevent="addPost">
                    <div class="create-post">
                        <div class="create-post-input">
                            <img src="./img/user-1.png"/>
                            <textarea rows="2" placeholder="..." v-model="newPostText"></textarea>
                        </div>
                        <div class="create-post-links">
                            <button type="submit">
                                <font-awesome-icon :icon="['fas', 'images']" />
                                <span class="button-text">Image</span>
                            </button>
                            <button type="submit">
                                <font-awesome-icon :icon="['fas', 'video']" />
                                <span class="button-text">Video</span>
                            </button>
                            <button></button>
                            <button type="submit" >
                                <font-awesome-icon :icon="['fas', 'paper-plane']" />
                                <span class="button-text">Submit</span>
                            </button>
                        </div>
                    </div>
                </form>
                <div v-for="post in posts" :key="post.id">
                    <Card :content="post" :profile="profile"/>
                </div>
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
            newPostText: '', // To store the text of the new post
            profile: {
                name: '',
                userId: '',
                role: 'Web developer',
                profileViews: 52
            },
            trendingTopics: ['#taqqqqqq', '#taqqqqqq', '#taqqqqqq', '#taqqqqqq', '#taqqqqqq'],
            loading: false
        };
    },
    methods: {
        async addPost() {
            if (!this.newPostText.trim()) {
                alert('Please enter some text for your post.');
                return;
            }

            this.loading = true; // Set loading state to true

            try {
                const response = await api.post('/content/add', {
                    sender_id: this.profile.userId,
                    sender_name: this.profile.name,
                    content_text: this.newPostText,
                    category: 'General' // Assuming a default category
                });

                console.log('Response received:', response.data); // Log the response from the backend

                this.newPostText = ''; // Clear the new post text field
                alert('Content added successfully!');
                window.location.reload(); // Refresh the page
            } catch (error) {
                console.error('Error during upload:', error.response ? error.response.data : error.message);
                alert('Failed to add content. Please try again.');
            } finally {
                this.loading = false; // Reset loading state
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
        },
        async fetchPosts() {
            try {
                const response = await api.get('/content/all_post');
                this.posts = response.data.map(post => ({
                    postId: post.content_id,
                    userId: post.sender_id,
                    username: post.sender_name,
                    content: post.content_text,
                    job: post.category
                }));
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        },
    },
    mounted() {
        const user = this.getUserFromToken();
        if (user) {
            this.profile.name = user.username;
            this.profile.userId = user.userId;
        }
        this.fetchPosts(); // Fetch posts when the component is mounted
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
