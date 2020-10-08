import React from 'react';
import style from '../details.module.sass'
import {inject, observer} from 'mobx-react';
import Preloader from '../../common/preloader';

class DetailsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    selectTodo(e) {
        const todoId = e.target.value;
        this.props.history.push(`/details/${todoId}`);
    }

    async componentDidMount() {
        const {store} = this.props;
        if (!store.todoList.length) {
            const data = await store.getTodoList();
            store.setTodoList(data);
        }
        this.setState({loading: false})
    }

    render() {
        const {store} = this.props;
        if(this.state.loading) {
            return <Preloader />
        }
        return <div className={style.details}>
            <div className={style.choice}>Select a task</div>
            <select defaultValue={"check"} onChange={(e) => this.selectTodo(e)}>
                <option value="check" disabled>Check task</option>
                {store.todoList.map(item => {
                    return <option key={item._id} value={item._id}>{item.label}</option>
                })}

            </select>
        </div>
    }
}

const injection = ({store}) => ({
    store
});

export default inject(injection)(observer(DetailsList));