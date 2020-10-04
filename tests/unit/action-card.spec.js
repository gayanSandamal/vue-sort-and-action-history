// import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import CommitedActionCard from '@/components/CommitedActionCard.vue'
// import Button from '@/components/common/Button.vue'

describe('CommitedActionCard.vue', () => {
  it('renders props.action, props.index and props.undoMode when passed and click time travel', () => {
    const actions =  [
      {
        "id": 3,
        "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        "oldIndex": 2,
        "newIndex": 3,
        "actionHistoryOrder": 2
      },
      {
        "id": 2,
        "title": "qui est esse",
        "oldIndex": 0,
        "newIndex": 1,
        "actionHistoryOrder": 1
      },
      {
        "id": 2,
        "title": "qui est esse",
        "oldIndex": 1,
        "newIndex": 0,
        "actionHistoryOrder": 0
      }
    ]
    const index = 0
    const undoMode = true
    actions.map(action => {
      const wrapper = shallowMount(CommitedActionCard, {
        propsData: { action, index, undoMode }
      })
      setTimeout(() => {
        wrapper.find('.time-travel').trigger('click')
      }, 0)
    })
  })
})
