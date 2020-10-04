<template>
  <Card class="new-card" :class="{'remove-card': removed}">
    <label class="w-full lg:w-8/12 mb-3 lg:mb-0 text-sm" v-html="actionLabel(action)"></label>
    <Button class="w-full lg:w-4/12 time-travel" :label="'Time travel'" :disabled="index > 0 && undoMode" @btn-click="timeTravel"/>
  </Card>
</template>

<script>
export default {
  name: 'commited-action-card',
  components: {
    Button: () => import('@/components/common/Button.vue'),
    Card: () => import('@/components/common/Card.vue')
  },
  data() {
    return {
      removed: false
    }
  },
  props: {
    action: {
      type: Object
    },
    index: {
      type: Number
    },
    undoMode: {
      type: Boolean
    }
  },
  methods: {
    actionLabel(action) {
      let maxCharLength = 7
      let title = action.title.length > maxCharLength ? action.title.slice(0, maxCharLength) + '...' : action.title
      return `Moved <span tooltip-left="${action.title}">"${title}"</span> from index ${action.oldIndex} to index ${action.newIndex}`
    },
    timeTravel() {
      this.removed = true
      setTimeout(() => {
        this.$emit('time-travel', this.action)
      }, 300);
    }
  }
}
</script>

<style lang="scss" scoped>
.new-card {
  animation: fade 5s;
}
@keyframes fade {
  0% {
    transform: scale(0);
    background-color: #faf089;
  }
  5% {
    transform: scale(1.05);
    background-color: #faf089;
  }
  7% {
    transform: scale(0.95);
    background-color: #faf089;
  }
  8% {
    transform: scale(1.0125);
    background-color: #faf089;
  }
  9% {
    transform: scale(0.9875);
    background-color: #faf089;
  }
  10% {
    transform: scale(1);
    background-color: #faf089;
  }
  100% {
    background-color: #fff;
  }
}
.remove-card {
  animation: removeCard 0.3s;
}
@keyframes removeCard {
  0% {
    transform: scale(1);
    background-color: #faf089;
    opacity: 1;
  }
  20% {
    transform: scale(1.05);
    background-color: #faf089;
  }
  100% {
    transform: scale(0);
    background-color: #faf089;
    opacity: 0;
  }
}
</style>