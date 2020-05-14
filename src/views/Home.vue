<template>
  <div class="mt-4">
    <form class="input-group mb-3" @submit.prevent="onSubmit">
      <input
        type="text"
        class="form-control"
        placeholder="New task"
        v-model.trim="newTask"
      />
      <div class="input-group-append">
        <button class="btn btn-outline-success" type="submit">
          Add task
        </button>
      </div>
    </form>
    <ul class="list-group">
      <li class="list-group-item" v-for="task in tasks" :key="task.id">
        {{ task.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      newTask: null,
      tasks: []
    }
  },
  methods: {
    onSubmit() {
      if (!this.newTask) return
      const newTask = this.setupTask(this.newTask)
      this.addNote(newTask).then(id => {
        this.tasks.push({
          ...newTask,
          id
        })
      })
      this.newTask = null
    },
    async fetchData() {
      const res = await axios.get(`${process.env.VUE_APP_URL}/tasks.json`)
      return Object.keys(res.data).map(key => {
        return {
          ...res.data[key],
          id: key
        }
      })
    },
    async addNote(task) {
      const res = await axios.post(
        `${process.env.VUE_APP_URL}/tasks.json`,
        task
      )
      return res.data.name
    },
    setupTask(title) {
      return {
        title,
        time: Date.now(),
        completed: false,
        important: false
      }
    }
  },
  async mounted() {
    const tasks = await this.fetchData()
    console.log(tasks, typeof tasks)
    if (tasks) this.tasks = tasks
  }
}
</script>

<style lang="scss"></style>
