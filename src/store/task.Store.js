
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
    makeAutoObservable(this) // 响应式处理
  }

  // 计算属性 只有都选中才是全选中状态
  get isAll () {
    return this.list.every(item => item.isDone)
  }
  // 已完成
  get isFinished () {
    return this.list.filter(item => item.isDone).length
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
  // 删除
  deleteTask = (id) => {
    this.list = this.list.filter(item => item.id !== id)
  }
  // 新增
  addTask = (task) => {
    this.list.push(task)
  }
}
export default TaskStore
