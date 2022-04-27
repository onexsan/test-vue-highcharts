import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    fullData: [],
    loading: false,
  },
  mutations: {
    updateFullData(state, payload) {
      for (let item of payload) {
        item.data = item.data.map((el) => Object.values(el));
      }
      state.fullData = payload;
    },
    changeLoadingState(state, payload) {
      state.loading = payload;
    },
  },
  actions: {
    async fetchFullData({ commit }) {
      try {
        commit('changeLoadingState', true);

        let url = 'https://test-task-for-frontend.herokuapp.com/data';
        let response = await fetch(url);

        if (response.ok) {
          let data = await response.json();

          if (data.items) {
            commit('updateFullData', data.items);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        commit('changeLoadingState', false);
      }
    },
  },
  getters: {
    allEntities(state) {
      let isFullDataAvailable = state.fullData.length;

      if (isFullDataAvailable) {
        return state.fullData;
      }

      return null;
    },
    isLoading(state) {
      return state.loading;
    },
  },
  modules: {},
});
