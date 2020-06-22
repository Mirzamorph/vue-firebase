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
      state.tasks = state.tasks.filter(item => item.id !== payload)
    },
    UPDATE_TASK(state, payload) {
      state.tasks = state.tasks.map(item => {
        if (item.id === payload.id) {
          return payload
        }
        return item
      })
    }
  },
  actions: {
    fetchTasks({ commit }) {
      return Firebase.fetchData()
        .then(res => {
          if (res) commit('SETUP_TASKS', res)
        })
        .catch(e => console.log(e))
    },
    addTask({ commit }, newTask) {
      Firebase.addTask(newTask)
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
    },
    updateTask({ commit }, task) {
      Firebase.updateTask(task)
        .then(res => {
          if (res) commit('UPDATE_TASK', task)
        })
        .catch(e => console.log(e))
    }
  }
})
