<template>
  <div class="mt-4">
    <form class="input-group mb-3" @submit.prevent="onSubmit">
      <input
        type="text"
        class="form-control"
        placeholder="New task"
        v-model.trim="currentTask"
      />
      <div class="input-group-append">
        <button class="btn btn-outline-success" type="submit">
          Add task
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTask: null,
      tasks: []
    }
  },
  methods: {
    onSubmit() {
      console.log(this.currentTask)
    }
  }
}
</script>

<style lang="scss"></style>
