
import {  makeAutoObservable } from 'mobx'
class TaskStore {
  list = [
    {
      id:1,
      name: '学习react',
      isDone: false
    },
    {
      id:2,
      name: '搞定mobx',
      isDone: true
    }
  ]
  constructor() {
    makeAutoObservable(this)
  }

  singleCheck (id, isDone) {
    const item = this.list.find(item => item.id === id)
    item.isDone = isDone
  }
}
export default TaskStore
