import './index.css'
import { observer } from 'mobx-react-lite'
import { useStore } from '../store'
// import { useState } from 'react'

function Task() {
  const store = useStore()

  // 单选受控
  // 用mobx store去维护选择状态

  function onChange (e, id) {
    // console.log(e.target.checked, id)
    store.taskStore.singleCheck(id, e.target.checked)
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
        />
      </header>

      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
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
                  <button className="destroy"></button>
                </div>
              </li>
            ))
          }
        </ul>
      </section>
    </section>
  )
}

export default observer(Task)