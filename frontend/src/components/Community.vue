<template>
  <div>
    <NavBar />
    <div class="community">
      <div class="topics-list">
        <h3>Komunitas</h3>
        <div v-for="(community, index) in communities" :key="index" class="create-post-input">
          <img src="./img/pengembangan.png" alt="Pengembangan Diri" class="avatar" />
          <div class="user-info">
            <p class="cname">{{ community.community_name }}</p>
            <p class="desc">{{ community.description }}</p>
          </div>
          <button
            class="follow-btn"
            :class="{ followed: community.isFollowed }"
            @click="toggleFollowCommunity(community)"
          >
            {{ community.isFollowed ? 'Buka' : 'Ikuti' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar.vue';
import api from '@/services/Api';

export default {
  name: 'CommunityList',
  components: {
    NavBar
  },
  data() {
    return {
      communities: []
    };
  },
  mounted() {
    this.fetchCommunities();
  },
  methods: {
    async fetchCommunities() {
      try {
        const response = await api.get('/community/all');
        this.communities = response.data;
        console.log(response.data);
        await this.checkFollowStatus();
      } catch (error) {
        console.error('Error fetching communities:', error);
        alert('Failed to fetch communities. Please try again later.');
      }
    },
    async checkFollowStatus() {
      for (let community of this.communities) {
        try {
          const response = await api.get(`/community/check_follow/${community.community_id}`);
          community.isFollowed = response.data.isFollowed;
        } catch (error) {
          console.error(`Error checking follow status for community ${community.community_id}:`, error);
        }
      }
    },
    async toggleFollowCommunity(community) {
      if (community.isFollowed) {
        // Redirect to main community page
        this.$router.push({ path: '/main-community', query: { id: community.community_id } });
      } else {
        // Follow the community
        try {
          await api.post('/community/join', { community_id: community.community_id });
          community.isFollowed = true;
        } catch (error) {
          console.error('Error joining community:', error);
          alert('Failed to join community. Please try again later.');
        }
      }
    }
  }
};
</script>

  
  <style>
  /* Gaya yang diperbarui */
  .community {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .create-post-input {
    display: flex;
    align-items: center;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    margin-bottom: 20px;
  }
  
  .avatar {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    margin-right: 15px;
  }
  
  .user-info {
    flex-grow: 1;
  }
  
  .cname {
    font-weight: bold;
    margin-bottom: 5px;
  }
  
  .desc {
    margin-bottom: 0;
  }
  
  .follow-btn {
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.follow-btn.followed {
  background-color: green;
}
  
  .follow-btn:hover {
    background-color: #0056b3;
  }
  
  .create-topic {
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    margin-bottom: 30px;
  }
  
  .topic-input,
  .topic-textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .create-btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }
  
  .create-btn:hover {
    background-color: #0056b3;
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
  