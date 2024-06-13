<template>
  <NavBar />
  <div class="community">
    <div class="content">
      <h2>Community Discussions</h2>
      <div class="create-topic">
        <h3>Create a New Topic</h3>
        <input v-model="newTopic.sender_name" placeholder="Your Name" />
        <textarea v-model="newTopic.description" placeholder="Description"></textarea>
        <button @click="createTopic">Create</button>
      </div>
      <div class="topics-list">
        <h3>Topics</h3>
        <div v-for="(topic, index) in topics" :key="index" class="topic-card">
          <h4>{{ topic.sender_name }}</h4>
          <p>{{ topic.description }}</p>
          <p><strong>Comments:</strong> {{ topic.comments.length }}</p>
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
        sender_id: this.userId,
        sender_name: this.userName,
        description: ''
      },
      topics: []
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
    this.fetchTopics();
  },
  methods: {
    async fetchTopics() {
      try {
        const response = await api.get(`/community/${this.communityId}/topics`);
        this.topics = response.data.topics;
      } catch (error) {
        console.error('Error fetching topics:', error);
        alert('Failed to fetch topics. Please try again later.');
      }
    },
    async createTopic() {
      if (this.newTopic.sender_name && this.newTopic.description) {
        try {
          const response = await api.post(`/community/${this.communityId}/topics`, {
            sender_id: this.newTopic.sender_id,
            sender_name: this.newTopic.sender_name,
            description: this.newTopic.description
          });
          this.topics.push(response.data.topic);
          this.newTopic.description = '';
        } catch (error) {
          console.error('Error creating topic:', error);
          alert('Failed to create topic. Please try again later.');
        }
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
  </style>
  