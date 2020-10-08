import React from 'react';
import {observer} from 'mobx-react';
import {NavLink} from 'react-router-dom';
import style from "./header.module.sass"


@observer class Header extends React.Component {
    render() {
        return <header className={style.menu}>
            <div className={style.list}>
                <div className={style.item}><NavLink exact to="/" className={style.link}>HOME</NavLink></div>
                <div className={style.item}><NavLink exact to="/details" className={style.link}>DETAILS</NavLink></div>
            </div>
        </header>
    }
}

export default Header
