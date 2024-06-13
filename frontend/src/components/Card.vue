<template>
    <div class="card">
        <div class="create-post-input">
            <img src="./img/user-1.png" />
            <div class="user-info">
                <p class="username">{{ content.username }}</p>
                <p class="role">{{ content.job }}</p>
            </div>
        </div>
        <div class="main-card">
            <!-- <h8 class="title">{{ profile.title }}</h8> -->
            <p class="content">{{ content.content }}</p>
        </div>
        <!-- <div class="bottom-card">
            <font-awesome-icon :icon="['fas', 'comments']" class="icon" />
            <textarea rows="1" class="card-text" placeholder="Comments"></textarea>
            <button class="send-button">Send</button>
        </div> -->
        <div class="bottom-card">
            <div class="comments-section">
                <div v-for="(comment, index) in comments" :key="index" class="comment-item">
                    <Comment :senderName="comment.senderName" :commentText="comment.text" />
                </div>
            </div>
            <div class="comment-box">
                <textarea rows="1" class="card-text" v-model="newCommentText" placeholder="Add a comment"></textarea>
                <button class="send-button" @click="addComment">Add Comment</button>
            </div>
        </div>
    </div>
</template>

<script>
import Comment from './Comment.vue';
import api from '@/services/Api';

export default {
    name: 'Card',
    components: {
        Comment
    },
    props: {
        content: {
            type: Object,
            required: true
        },
        profile: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            comments: [], // Array untuk menyimpan komentar
            newCommentText: '' // Untuk menyimpan teks komentar baru
        };
    },
    methods: {
        async fetchComments() {
            try {
                const response = await api.get(`/content/comments/${this.content.postId}`);
                console.log('Comments fetched:', response.data);
                this.comments = response.data.map(comment => ({
                    senderName: comment.sender_name,
                    text: comment.comment_text
                }));
            } catch (error) {
                console.error('Error fetching comments:', error.response ? error.response.data : error.message);
            }
        },
        async addComment() {
            if (!this.newCommentText.trim()) {
                alert('Please enter a comment.');
                return;
            }

            const commentData = {
                post_id: this.content.postId,
                sender_id: this.profile.userId,
                sender_name: this.profile.name,
                comment_text: this.newCommentText
            };

            
            try {
                console.log('Sending comment data:', commentData);
                const response = await api.post('content/comments/add', commentData);
                console.log('Comment added:', response.data);
                this.comments.push(response.data);
                this.newCommentText = '';
            } catch (error) {
                console.error('Error adding comment:', error.response ? error.response.data : error.message);
            }
        }
    },
    mounted() {
        this.fetchComments();
    }
};
</script>


<style>
.card {
    margin-top: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    background-color: #fff;
}

.create-post-input {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #f9f9f9;
    border-bottom: 1px solid #eee;
    margin-bottom: 0;
}

.create-post-input img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
}

.user-info {
    display: flex;
    flex-direction: column;
}

.username {
    margin-bottom: 0;
    font-weight: bold;
    font-size: 14px;
}

.role {
    margin-bottom: 0;
    font-size: 10px;
    color: #888;
}

.main-card {
    /* padding: 5px; */
    border-bottom: 1px solid #eee;
}

.title {
    font-weight: bolder;
    margin-bottom: 10px;
    font-size: 16px;
}

.content {
    font-size: 13px;
    margin-bottom: 0;
}

.bottom-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
}

.comments-section {
    display: flex;
    flex-direction: column; /* Arrange comments vertically */
    margin-bottom: 10px;
    width: 100%;
}

.comment-box {
    display: flex;
    align-items: center;
    padding: 10px;
    width: 100%;
}

.icon {
    margin-left: 5px;
    color: #555;
}

.card-text {
    flex: 1;
    margin-left: 10px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    resize: vertical;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    transition: border-color 0.2s;
}

.card-text:focus {
    border-color: #007BFF;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    outline: none;
}

.send-button {
    margin-left: 10px;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    background-color: #007BFF;
    color: white;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s;
}

.send-button:hover {
    background-color: #0056b3;
}

.send-button:focus {
    outline: none;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
}
</style>
