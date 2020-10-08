import React from 'react';
import style from '../todo.module.sass';
import {inject, observer} from "mobx-react";

class TodoFilter extends React.Component {
    render() {
        const {store} = this.props;

        return <div className={style.filter}>
            <div>Sort by:</div>
            <select defaultValue={store.currentFilter} onChange={(e) => {store.sortBy(e.target.value)}}>
                <option value="">Without sorting</option>
                <option value="done">Status done</option>
                <option value="work">Status in work</option>
            </select>
        </div>
    }
}

const injection = ({store}) => ({
    store
});

export default inject(injection)(observer(TodoFilter));