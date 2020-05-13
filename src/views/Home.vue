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
      this.tasks.push(newTask)
      this.newTask = null
    },
    setupTask(title) {
      return {
        id: Date.now()
          .toString()
          .substr(8, 5),
        title,
        time: Date.now(),
        completed: false,
        important: false
      }
    }
  }
}
</script>

<style lang="scss"></style>
