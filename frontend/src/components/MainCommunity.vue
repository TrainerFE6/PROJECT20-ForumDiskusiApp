<template>
  <NavBar />
  <div class="community">
    <div class="content">
      <h2>Community Discussions</h2>
      <div class="create-topic">
        <h3>Create a New Topic</h3>
        <!-- <input v-model="newTopic.sender_name" placeholder="Your Name" /> -->
        <textarea v-model="newTopic.description" placeholder="Deskripsi"></textarea>
        <button @click="createTopic">Tambah</button>
      </div>
      <div class="topics-list">
        <h3>Topik</h3>
        <div v-for="(topic, index) in topics" :key="index" class="topic-card">
          <h4>{{ topic.sender_name }}</h4>
          <p>{{ topic.description }}</p>
          <p><strong>Komentar:</strong> {{ topic.comment ? topic.comments.length : '' }}</p>
          <div class="comments">
            <div v-for="(comment, idx) in topic.comments" :key="idx" class="comment">
              <p><strong>{{ comment.user_name }}</strong>: {{ comment.comment_text }}</p>
            </div>
            <div class="comment-box">
                <textarea rows="1" class="card-text" v-model="newComment[topic.topic_id]" placeholder="Tulis Komentar"></textarea>
                <button class="send-button" @click="addComment(topic.topic_id)">Tulis Comment</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar.vue';
import api from '@/services/Api';
import { mapState } from 'vuex';

export default {
  name: 'MainCommunity',
  components: {
    NavBar
  },
  data() {
    return {
      communityId: null,
      newTopic: {
        description: ''
      },
      topics: [],
      newComment: {}
    };
  },
  computed: {
    ...mapState({
      userId: state => state.user.id,
      userName: state => state.user.name
    })
  },
  created() {
    this.communityId = this.$route.query.id;
    this.newTopic.sender_id = this.userId;
    this.newTopic.sender_name = this.userName;
    this.fetchTopics();
  },
  methods: {
    async fetchTopics() {
      try {
        const response = await api.get(`/community/${this.communityId}/topics`);
        const topics = response.data.topics;

        // Fetch comments for each topic
        for (let topic of topics) {
          const commentsResponse = await api.get(`/community/comment/${topic.topic_id}`);
          console.log(commentsResponse.data);
          topic.comments = commentsResponse.data.comments;
        }

        this.topics = topics;
      } catch (error) {
        console.error('Error fetching topics:', error);
        alert('Failed to fetch topics. Please try again later.');
      }
    },
    async createTopic() {
      if (this.newTopic.description) {
        try {
          const response = await api.post(`/community/${this.communityId}/topics`, {
            sender_id: this.newTopic.sender_id,
            sender_name: this.newTopic.sender_name,
            description: this.newTopic.description
          });
          const newTopic = response.data.topic;
          newTopic.comments = [];
          this.topics.push(newTopic);
          this.newTopic.description = '';
        } catch (error) {
          console.error('Error creating topic:', error);
          alert('Failed to create topic. Please try again later.');
        }
      } else {
        alert('Please fill in both the name and description');
      }
    },
    async addComment(topicId) {
        const commentText = this.newComment[topicId];

        if (commentText) {
            try {
                const response = await api.post('/community/comment/add', {
                    topic_id: topicId,
                    user_id: this.userId,
                    user_name: this.userName,
                    comment_text: commentText
                });

                if (response.data && response.data.comment) {
                  const newComment = response.data.comment;
                  const topic = this.topics.find(t => t.id === topicId);
                  if (topic) {
                      topic.comments.push(newComment);
                  } else {
                      console.error('Topic not found:', topicId);
                  }
                  this.newComment[topicId] = '';
                } else {
                    console.error('Invalid response data:', response.data);
                }
            } catch (error) {
                console.error('Error adding comment:', error);
                alert('Failed to add comment. Please try again later.');
            }
        } else {
            alert('Please enter a comment');
        }
    }
  }
};
</script>
  
  <style>
  .community {
    margin: 0 auto;
  }
  .content {
    margin: 0 auto;
    padding: 20px;
    max-width: 800px;
    background: #fff;
    border-radius: 10px;
    padding: 20px;
  }
  .create-topic {
    margin-bottom: 30px;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
  }
  .create-topic input,
  .create-topic textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .create-topic button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }
  .create-topic button:hover {
    background-color: #0056b3;
  }
  .topics-list {
    margin-top: 20px;
  }
  .topic-card {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 20px;
    background-color: #fff;
  }
  .topic-card h4 {
    margin: 0 0 10px 0;
  }
  .topic-card p {
    margin: 0;
  }
  .comment-box {
    display: flex;
    align-items: center;
    padding: 10px;
    width: 100%;
  }
  </style>
  