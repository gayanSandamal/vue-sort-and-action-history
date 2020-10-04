<template>
  <div class="flex flex-wrap justify-between items-center w-full post-card">
    <label class="w-11/12" v-text="post.title"></label>
    <div class="w-1/12">
      <div class="flex justify-center items-center icon up cursor-pointer" v-if="!isFirst" @click="$emit('move-up', post, index)" tooltip="move up">
        <svg class="icon-svg hover:bg-gray-200" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8l-6 6 1.41 1.41L12 10.83l4.59 4.58L18 14z"/></svg>
      </div>
      <div class="flex justify-center items-center icon down cursor-pointer" v-if="!isLast" @click="$emit('move-down', post, index)" tooltip="move down">
        <svg class="icon-svg hover:bg-gray-200" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'post-card',
  props: {
    posts: {
      type: Array
    },
    post: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  computed: {
    isFirst() {
      return this.index === 0
    },
    isLast() {
      return this.posts.length === this.index + 1
    }
  }
}
</script>

<style lang="scss" scoped>
.icon-svg {
  border-radius: 50%;
}
.post-card {
  min-height: 48px;
}
</style>