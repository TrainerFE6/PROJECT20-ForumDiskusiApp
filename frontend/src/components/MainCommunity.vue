<template>
    <NavBar /> 
    <div class="community">
      <div class="content">
        <h2>Community Discussions</h2>
        <div class="create-topic">
          <h3>Create a New Topic</h3>
          <input v-model="newTopic.title" placeholder="Title" />
          <textarea v-model="newTopic.description" placeholder="Description"></textarea>
          <button @click="createTopic">Create</button>
        </div>
        <div class="topics-list">
          <h3>Topics</h3>
          <div v-for="(topic, index) in topics" :key="index" class="topic-card">
            <h4>{{ topic.title }}</h4>
            <p>{{ topic.description }}</p>
            <p><strong>Comments:</strong> {{ topic.comments.length }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import NavBar from './NavBar.vue';
  
  export default {
    name: 'MainCommunity',
    components: {
      NavBar,
    },
    data() {
      return {
        newTopic: {
          title: '',
          description: ''
        },
        topics: [
          { title: 'First Topic', description: 'This is the first discussion topic.', comments: [] },
          { title: 'Second Topic', description: 'This is the second discussion topic.', comments: [] }
        ]
      };
    },
    methods: {
      createTopic() {
        if (this.newTopic.title && this.newTopic.description) {
          this.topics.push({
            title: this.newTopic.title,
            description: this.newTopic.description,
            comments: []
          });
          this.newTopic.title = '';
          this.newTopic.description = '';
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
  