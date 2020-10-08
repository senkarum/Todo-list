import React from 'react';
import {inject, observer} from 'mobx-react';
import style from '../todo.module.sass'
import TodoItem from './todoItem';
import Preloader from '../../common/preloader';


class TodoList extends React.Component {
    async componentDidMount() {
        const {store} = this.props;
        const data = await store.getTodoList();
        store.setTodoList(data);
    }

    render() {
        const {store} = this.props;
        return <div className={style.list}>
            {store.getItemsIsFetching ? <Preloader/> : null}
            {
                !store.currentFilter
                    ? store.todoList.map(item => {
                        return <TodoItem key={item._id} item={item}/>
                    })
                    : store.sortingTodoList.map(item => {
                        return <TodoItem key={item._id} item={item}/>
                    })
            }
        </div>
    }
}

const injection = ({store}) => ({
    store
});

export default inject(injection)(observer(TodoList));