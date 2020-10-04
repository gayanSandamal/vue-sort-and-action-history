<template>
  <div class="home">
    <div class="container mx-auto py-10">
      <div class="home-wrapper mx-auto flex flex-wrap">
        <div class="w-full md:w-1/2 md:pr-10 px-5 md:px-0">
          <h5 class="text-white font-medium text-lg">Sortable Post List</h5>
          <div class="py-5">
            <ul class="post-list-group" v-if="posts.length">
              <li v-for="(post, index) in posts" :key="post.id" class="shadow-md">
                <Card class="rounded">
                  <post-card :posts="posts" :post="post" :index="index" @move-up="moveUp" @move-down="moveDown"/>
                </Card>
              </li>
            </ul>
            <ul class="post-list-group" v-else>
              <li v-for="item in 5" :key="item" class="bg-white p-3 shadow-md rounded">
                <content-placeholders :rounded="true">
                  <content-placeholders-heading />
                </content-placeholders>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-full md:w-1/2 md:pl-10 px-5 md:px-0">
          <div class="shadow-lg">
            <div class="px-6 py-4 bg-white rounded-t">
              <h3 class="font-medium text-lg">List of actions commited</h3>
            </div>
            <div class="p-5 grey">
              <div class="flex justify-start items-center">
                <label class="flex justify-start items-center text-gray-500 font-bold">
                  <input class="mr-2 leading-tight" type="checkbox" v-model="undoMode">
                  <span class="text-sm font-normal">Undo mode (Recommended)</span>
                </label>
                <div tooltip-left='By enabling this, the "Time travel" will work as a history undo to re-order the posts in-order'>
                  <svg class="ml-3 cursor-pointer" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path fill="#4a5568" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                </div>
              </div>
              <perfect-scrollbar>
                <ul class="commited-actions-list-group mt-4" v-if="actionHistory.length > 0">
                  <li v-for="(action, index) in actionHistory" :key="action.actionHistoryOrder" :class="{'only-one' : actionHistory.length === 1}">
                    <c-action-card :action="action" :index="index" :undoMode="undoMode" @time-travel="timeTravel"/>
                  </li>
                </ul>
              </perfect-scrollbar>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getPosts } from '@/api/posts'
export default {
  name: 'Home',
  data() {
    return {
      posts: [],
      actionHistory: [],
      actionHistoryOrder: 0,
      undoMode: true
    }
  },
  components: {
    // Import components on demand. This improves the speed of the initial loading by chunking the components.
    'c-action-card': () => import('@/components/CommitedActionCard.vue'),
    'post-card': () => import('@/components/PostCard.vue'),
    Card: () => import('@/components/common/Card.vue')
  },
  methods: {
    getPosts() {
      getPosts(response => {
        // Assign only the first 5 posts if the data is available
        this.posts = response.data.length ? response.data.slice(0, 5).map(o => o) : []
      }, error => {
        console.error(error)
      })
    },
    moveUp(post, index) {
      let newIndex = index - 1
      this.move(this.posts, index, newIndex)
      this.actionHistorySetter(post, index, newIndex)
    },
    moveDown(post, index) {
      let newIndex = index + 1
      this.move(this.posts, index, newIndex)
      this.actionHistorySetter(post, index, newIndex)
    },
    move(arr, old_index, new_index) {
      while (old_index < 0) {
        old_index += arr.length
      }
      while (new_index < 0) {
        new_index += arr.length
      }
      if (new_index >= arr.length) {
        var k = new_index - arr.length
        while ((k--) + 1) {
          arr.push(undefined)
        }
      }
      arr.splice(new_index, 0, arr.splice(old_index, 1)[0])
      return arr
    },
    actionHistorySetter(post, oldIndex, newIndex) {
      this.actionHistory.push({
        id: post.id,
        title: post.title,
        oldIndex: oldIndex,
        newIndex: newIndex,
        actionHistoryOrder: this.actionHistoryOrder
      })
      this.actionHistoryOrder++
      this.actionHistory.sort((a, b) => b.actionHistoryOrder - a.actionHistoryOrder )
    },
    timeTravel(action) {
      this.move(this.posts, action.oldIndex, action.newIndex)
      let index = this.actionHistory.indexOf(action)
      this.actionHistory.splice(index, 1)
    }
  },
  beforeMount() {
    // Send request after Vue initiation and before component reder 
    this.getPosts()
  }
}
</script>

<style lang="scss" scoped>
.ps {
  height: 400px;
}
</style>