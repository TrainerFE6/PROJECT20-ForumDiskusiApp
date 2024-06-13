// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './Router';
import 'vuetify/styles';
import { createVuetify } from 'vuetify/lib/framework.mjs';
import { aliases, fa } from 'vuetify/lib/iconsets/fa-svg.mjs';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import jwtDecode from 'vue-jwt-decode';
import store from './store'; // Import store Vuex

// Add FontAwesome icons to the library
library.add(fas);
library.add(far);

// Create the Vuetify instance
const vuetify = createVuetify({
  icons: {
    defaultSet: 'fa',
    aliases,
    sets: {
      fa,
    },
  },
});

// Function to set user data from JWT
const initializeUserFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const payload = jwtDecode.decode(token);
      store.dispatch('setUser', {
        id: payload.userId,
        name: payload.username
      });
    } catch (error) {
      console.error('Error parsing token:', error);
      localStorage.removeItem('token'); // Remove invalid token
    }
  }
};

// Initialize user data from token
initializeUserFromToken();

// Create the Vue app instance
const app = createApp(App);

// Register FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon);

// Use Vuetify and Router in the app
app.use(vuetify);
app.use(router);

app.use(store); // Gunakan store Vuex

// Mount the app
app.mount('#app');
