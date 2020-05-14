import Vue from 'vue'
import Vuex from 'vuex'
import FirebaseService from '../services/FirebaseService'

Vue.use(Vuex)

const Firebase = new FirebaseService()

export default new Vuex.Store({
  state: {
    tasks: []
  },
  mutations: {
    SETUP_TASKS(state, payload) {
      state.tasks = payload
    },
    ADD_TASK(state, payload) {
      state.tasks.push(payload)
    },
    DELETE_TASK(state, payload) {
      const index = state.tasks.findIndex(item => item.id === payload)
      state.tasks = [
        ...state.tasks.slice(0, index),
        ...state.tasks.slice(index + 1)
      ]
    }
  },
  actions: {
    fetchTasks({ commit }) {
      Firebase.fetchData()
        .then(res => {
          commit('SETUP_TASKS', res)
        })
        .catch(e => console.log(e))
    },
    addTask({ commit }, newTask) {
      Firebase.addTask()
        .then(id => {
          commit('ADD_TASK', {
            ...newTask,
            id
          })
        })
        .catch(e => console.log(e))
    },
    deleteTask({ commit }, id) {
      Firebase.deleteTask(id)
        .then(() => {
          commit('DELETE_TASK', id)
        })
        .catch(e => console.log(e))
    }
  }
})
