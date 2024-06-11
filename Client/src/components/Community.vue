<template>
    <div>
      <NavBar />
      <div class="community">
        <div class="topics-list">
          <h3>Komunitas</h3>
          <div class="create-post-input">
            <img src="./img/pengembangan.png" alt="Pengembangan Diri" class="avatar" />
            <div class="user-info">
              <router-link to="/main-community" style="color: black;">
                <p class="cname">{{Community.title}}</p>
              </router-link>
              <p class="desc">{{Community.description}}</p>
            </div>
            <button class="follow-btn">Ikuti</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import NavBar from './NavBar.vue';
  
  export default {
    name: 'Community',
    components: {
      NavBar
    },
    data() {
      return {
        Community: {
          title: 'Pengembangan Diri',
          description: 'Pengembangan diri menjadi lebih baik setiap harinya'
        }
      };
    },
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
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
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
  