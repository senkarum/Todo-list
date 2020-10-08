import React from 'react';
import {inject, observer} from "mobx-react";
import style from '../../todo.module.sass'
import Preloader from "../../../common/preloader";
import {NavLink} from "react-router-dom";


class TodoItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemIsFetching: false,
            textByStatus: {}
        }
    }

    toggleFetching() {
        this.setState({itemIsFetching: !this.state.itemIsFetching})
    }

    async changeStatus(id, status) {
        const {store} = this.props;
        this.toggleFetching();
        await store.todoItemChangeStatus(id, status);
        store.sortBy('');
        this.toggleFetching();
        const data = await store.getTodoList();
        store.setTodoList(data);

    }

    async deleteItem(id) {
        const {store} = this.props;
        this.toggleFetching();
        await store.deleteTodoItem(id);
        this.toggleFetching();
        const data = await store.getTodoList();
        store.setTodoList(data);
    }

    textForStatus = {
        futureStatus: '',
        statusText: '',
        btnText: ''
    };

    setTextForStatus(status) {
        switch (status) {
            case 'work':
                this.textForStatus.futureStatus = 'done';
                this.textForStatus.statusText = 'In work';
                this.textForStatus.btnText = 'Done';
                break;

            case 'done':
                this.textForStatus.futureStatus = 'work';
                this.textForStatus.statusText = 'Complete';
                this.textForStatus.btnText = 'Back to work';
                break;
        }
    }

    render() {
        const {item} = this.props;
        this.setTextForStatus(item.status);

        return <div className={style.item}>
            {
                this.state.itemIsFetching ? <Preloader/> : null
            }

            <div className={`${style[`${item.status}`]} ${style.status}`}>
                {this.textForStatus.statusText}
            </div>
            <div className={style.label}>{item.label}</div>
            <div className={style.text}>{item.text}</div>
            <div className={style['btn-container']}>
                <button onClick={() => {
                    this.changeStatus(item._id, this.textForStatus.futureStatus)
                }} className={`${style['todo-btn']} ${style[this.textForStatus.futureStatus]}`}>
                    {this.textForStatus.btnText}
                </button>
                <button onClick={() => {
                    this.deleteItem(item._id)
                }} className={`${style['todo-btn']} ${style['del']}`}>DELETE
                </button>
            </div>
            <div className={style.more}><NavLink to={`/details/${item._id}`}>Full information</NavLink></div>
        </div>
    }
}

const injection = ({store}) => ({
    store
});

export default inject(injection)(observer(TodoItem));

