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
    <transition-group class="list-group" name="items" tag="ul">
      <li
        class="list-group-item list-group-item-action"
        v-for="task in tasks"
        :key="task.id"
        :class="{ important: task.important, completed: task.completed }"
      >
        {{ task.title }}
        <div class="list__actions">
          <button
            type="button"
            class="btn btn-primary"
            @click="toggleProperty(task, 'important')"
          >
            <i class="fa fa-star" aria-hidden="true"></i>
          </button>
          <button
            type="button"
            class="btn btn-success"
            @click="toggleProperty(task, 'completed')"
          >
            <i class="fa fa-check" aria-hidden="true"></i>
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="deleteTask(task.id)"
          >
            <i class="fa fa-trash" aria-hidden="true"></i>
          </button>
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      newTask: null
    }
  },
  computed: mapState(['tasks']),
  methods: {
    ...mapActions(['fetchTasks', 'addTask', 'deleteTask', 'updateTask']),
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
    },
    toggleProperty(task, property) {
      const updatedTask = { ...task }
      updatedTask[property] = !updatedTask[property]
      this.updateTask(updatedTask)
    }
  },
  mounted() {
    this.fetchTasks()
  }
}
</script>

<style lang="scss" scoped>
.list-group-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}
.list-group-item:hover .list__actions {
  opacity: 1;
}
.list__actions {
  opacity: 0;
  transition: opacity 0.2s;
}
.list__actions button {
  margin-left: 10px;
}
.items-enter-active {
  transition: all 0.3s ease-in;
}
.items-leave-active {
  transition: all 0.3s ease-out;
}
.items-enter {
  transform: translateX(50px);
  opacity: 0;
}
.items-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}
.important {
  font-weight: bold;
  border-color: #0069d9;
}
.completed {
  border-color: #28a745;
}
</style>
