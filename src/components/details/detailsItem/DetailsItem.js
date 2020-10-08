import React from 'react';
import {inject, observer} from 'mobx-react';
import Preloader from '../../common/preloader';
import style from '../details.module.sass';

class DetailsItem extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            noteIsUpdated: false,
        }
    }

    async componentDidMount() {
        const {store} = this.props;
        const todoId = this.props.match.params.id;
        if (todoId) {
            const data = await store.todoItemGetCurrent(todoId);
            if (!data) {
                this.props.history.push(`/details`);
                return
            }
            store.setCurrentTodoItem(data);
            store.note = store.currentItem.note;
            this.setState({loading: false});
        } else {
            const data = await store.getTodoList();
            store.setTodoList(data);
            this.setState({loading: false});
        }
    }

    setValue(e) {
        const {store} = this.props;
        store.note = e.target.value;
        this.setState({noteIsUpdated: true});
    }

    async sendNote(e) {
        e.preventDefault();
        const {store} = this.props;
        this.setState({loading: true});
        await store.updateNote(e);
        this.setState({loading: false, noteIsUpdated: false});
    }

    render() {
        const {store} = this.props;

        if (this.state.loading) return <Preloader/>;

        return (
            <div className={style.details}>
                <div className={style.row}>
                    <div className={style.name}>Label:</div>
                    <div className={style.label}>{store.currentItem.label}</div>
                </div>
                <div className={style.row}>
                    <div className={style.name}>Status:</div>
                    <div className={style.text}>{store.currentItem.status}</div>
                </div>
                <div className={style.row}>
                    <div className={style.name}>Description:</div>
                    <div className={style.text}>{store.currentItem.text}</div>
                </div>
                <div className={style.row}>
                    <div className={style.name}>Note:</div>
                    <form onSubmit={(e) => this.sendNote(e)}>
                        <textarea name="note" onChange={(e) => this.setValue(e)} placeholder="Add your note" value={store.note} className={style.note}/>
                        { this.state.noteIsUpdated ? <button>add note</button> : null }
                    </form>
                </div>
            </div>
    )

    }
}

const injection = ({store}) => ({
    store
});

export default inject(injection)(observer(DetailsItem));