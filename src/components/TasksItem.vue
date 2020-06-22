<template>
  <div>
    <transition-group class="list-group" name="items" tag="ul" v-if="onload">
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
    <Spinner is-large v-else />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Spinner from '@/components/Spinner'

export default {
  components: {
    Spinner
  },
  data() {
    return {
      onload: false
    }
  },
  computed: mapState(['tasks']),
  methods: {
    ...mapActions(['fetchTasks', 'deleteTask', 'updateTask']),
    toggleProperty(task, property) {
      const updatedTask = { ...task }
      updatedTask[property] = !updatedTask[property]
      this.updateTask(updatedTask)
    }
  },
  mounted() {
    this.fetchTasks().then(() => (this.onload = true))
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
  border-color: #218838;
}
</style>
