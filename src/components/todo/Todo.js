import React from 'react';
import {observer} from 'mobx-react';

import style from './todo.module.sass'
import TodoList from './todoList';
import AddTodo from './addTodo';
import TodoFilter from "./todoFilter";



@observer class Todo extends React.Component {

    render() {
        return <div className={style.todo}>
            <AddTodo />
            <TodoFilter />
            <TodoList />
        </div>
    }
}

export default Todo