import './index.css'
import { observer } from 'mobx-react-lite'
import { useStore } from '../store'
import { useState } from 'react'
import uuid from 'react-uuid'

function Task() {
  const store = useStore()

  // 单选受控
  // 用mobx store去维护选择状态
  function onChange (e, id) {
    // console.log(e.target.checked, id)
    store.taskStore.singleCheck(id, e.target.checked)
  }
  // 全选
  function allChange (e) {
    // console.log(e)
    store.taskStore.allCheck(e.target.checked)
  }
  // 删除
  function deleteTask (id) {
    // console.log(e, id)
    store.taskStore.deleteTask(id)
  }
  // 新增   受控
  const [taskValue, setTaskValue] = useState('')
  function addTask (e) {
    // console.log(e.keyCode)
    if (e.keyCode === 13 && taskValue !== '') {
      store.taskStore.addTask({
        id: uuid(),
        name: taskValue,
        isDone: false
      })
      setTaskValue('')
    }
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todoList</h1>
        <input
          className="new-todo"
          autoFocus
          autoComplete="off"
          placeholder="What needs to be done?"
          value={taskValue}
          onChange={(e) => setTaskValue(e.target.value)}
          onKeyUp={addTask}
        />
      </header>

      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={store.taskStore.isAll}
          onChange={allChange}
        />
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list">
          {
            store.taskStore.list.map(item => (
              <li
                key={item.id}
                className={item.isDone ? 'todo completed' : 'todo'}
              >
                <div className="view">
                  <input 
                    className="toggle" 
                    type="checkbox" 
                    checked={item.isDone}
                    onChange={e => onChange(e, item.id)}
                  />
                  <label >{item.name}</label>
                  <button className="destroy" onClick={() => deleteTask(item.id)}></button>
                </div>
              </li>
            ))
          }
        </ul>
      </section>
      <footer className='footer'>
        <span className='todo-count'>
          任务总数： {store.taskStore.list.length} 已完成：{store.taskStore.isFinished}
        </span>
      </footer>
    </section>
  )
}

export default observer(Task)

// mobx和react职责划分

// mobx
// 1.业务状态数据
// 2.业务状态的修改逻辑

// react
// 1.渲染业务数据
// 2.ui临时状态保护
// 3.事件触发，调用mobx