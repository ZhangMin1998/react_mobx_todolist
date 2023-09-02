
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

  // 单选
  singleCheck (id, isDone) {
    const item = this.list.find(item => item.id === id)
    item.isDone = isDone
  }
  // 全选
  allCheck (checked) {
    this.list.forEach(item => {
      item.isDone = checked
    })
  }
  // 计算属性 只有都选中才是全选中状态
  get isAll () {
    return this.list.every(item => item.isDone)
  }
}
export default TaskStore
