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
    <TasksItem />
    <Spinner isLarge />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import TasksItem from '@/components/TasksItem'
import Spinner from '@/components/Spinner'

export default {
  components: {
    TasksItem,
    Spinner
  },
  data() {
    return {
      newTask: null
    }
  },
  computed: mapState(['tasks']),
  methods: {
    ...mapActions(['addTask']),
    onSubmit() {
      if (!this.newTask) return
      const newTask = this.setupTask(this.newTask)
      this.addTask(newTask)
      this.newTask = null
    },
    setupTask(title) {
      return {
        title,
        time: Date.now(),
        completed: false,
        important: false
      }
    }
  }
}
</script>
