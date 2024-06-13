import { createStore } from 'vuex';

export default createStore({
    state: {
        user: {
        id: null,
        name: ''
        }
    },
    mutations: {
        setUser(state, user) {
        state.user.id = user.id;
        state.user.name = user.name;
        }
    },
    actions: {
        setUser({ commit }, user) {
        commit('setUser', user);
        }
    },
    getters: {
        userId: state => state.user.id,
        userName: state => state.user.name
    }
});
