<template>
    <nav class="navbar">
        <div class="navbar-left">
            <div class="search-box">
                <img src="./img/search.png"/>
                <input type="text" placeholder="search">
            </div>
        </div>
        <div class="navbar-center">
            <ul>
                <li>
                    <a href="" class="active-link"><img src="./img/home.png" alt="home"></a>
                </li> 
                <li>
                    <a href="" ><img src="./img/network.png" alt="home"></a>
                </li> 
                <li>
                    <a href=""><img src="./img/jobs.png" alt="home"></a>
                </li> 
                <li>
                    <a href=""><img src="./img/message.png" alt="home"></a>
                </li> 
                <li>
                    <a href=""><img src="./img/notification.png" alt="home"></a>
                </li> 
            </ul>
        </div>
        <div class="navbar-right">
            <div class="online">
                <img src="./img/user-1.png" class="nav-profile-img"/>
            </div>
        </div>
    </nav>
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
    </template>

<script>
import VueJwtDecode from 'vue-jwt-decode';
import api from '@/services/Api';
import Card from '../components/Card.vue'

export default {
    name: 'HomePage',
    components:{
        Card
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
                        username: decoded.username, // Pastikan 'username' ada di decoded
                        userId: decoded.userId // Pastikan 'userId' ada di decoded
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
    * {
        margin: 0;
        padding: 0;
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        box-sizing: border-box;
    }

    a {
        text-decoration: none;
        color: rgb(255, 255, 255);
    }

    .navbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 6px 6px;
        background: #fff;
        z-index: 100;
        top: 0;
        box-shadow: 0 5px 10px rgba(9, 0, 0, 0.1);
    }

    .logo img {
        width: 30px;
        margin-right: 15px;
        display: block;
    }

    .navbar-center ul li {
        display: inline-block;
        list-style: none;
    }
    .navbar-center ul li a {
        display: flex;
        align-items: center;
        font-size: 14px;
        margin: 5px 8px;
        padding-right: 5px;
        position: relative;
    }

    .navbar-center ul li a img {
        width: 30px;
    }

    .navbar-center ul li a ::after {
        content: '';
        width: 0;
        height: 2px;
        background: 3px solid #045be6;
        position: absolute;
        bottom: -15px;
        transition: width 0.3s;
    }
    .navbar-center ul li a :hover::after 
    .navbar-center ul li a.active-link {
        width: 100%;
    }
    .nav-profile-img {
        width: 40px;
        border-radius: 50%;
        display: block;
        cursor: pointer;
        position: relative;
    }
    .online {
        position: relative;
    }

    .online::after {
        content: '';
        position: absolute;
        width: 7px;
        height: 7px;
        border: 2px solid white;
        border-radius: 50%;
        right: 0px;
        top: 0px;
        background: green;
    }

    .search-box {
        background: #fff;
        width: 250px;
        border-radius: 20px;
        display: flex;
        padding: 0 15px;
        align-items: center;
    }

    .navbar-left {
        display: flex;
        align-items: center;
    }

    .search-box input {
        width: 100%;
        background: transparent;
        padding: 8px;
        outline: none;
        border: 0;
    }
    /* Navbar End */
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
