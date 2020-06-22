<template>
  <div :class="{ 'spinner-large': isLarge }">
    <div class="spinner-border text-success" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isLarge: Boolean
  }
}
</script>

<style lang="scss" scoped>
.spinner-large {
  margin: 60px auto;
  text-align: center;
}
</style>
