import React from 'react';
import {inject, observer} from 'mobx-react';
import style from '../todo.module.sass'
import Preloader from '../../common/preloader';


class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addingIsFetching: false
        }
    }

    toggleFetching() {
        this.setState({addingIsFetching: !this.state.addingIsFetching})
    }

    async sendItem(e) {
        const {store} = this.props;
        this.toggleFetching();
        await store.addTodoItem(e);
        this.toggleFetching();
        const data = await store.getTodoList();
        store.sortBy("");
        store.setTodoList(data);
        store.clearFields();
    }

    render() {
        const {store} = this.props;

        return <div className={style['form-container']}>

            {this.state.addingIsFetching ? <Preloader/> : null}

            <form onSubmit={(e) => {
                this.sendItem(e)
            }} className={style.add}>
                <input onChange={(e) => store.label = e.target.value}
                       type="text" name="label" value={store.label} placeholder="Todo name"/>
                <textarea onChange={(e) => store.text = e.target.value} name="text" value={store.text}
                          placeholder="Todo text"/>
                <button>SEND</button>
                {store.isInvalidForm ?
                    <div className={style.error}>THE FORM HAS BEEN FILLED OUT INCORRECTLY</div> : null}
            </form>
        </div>
    }
}

const injection = ({store}) => ({
    store
});

export default inject(injection)(observer(AddTodo));