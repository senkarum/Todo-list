import React from 'react';
import style from './prelodaer.module.sass'


class Preloader extends React.Component {
    render() {
        return <div className={style.preloader}>
                <div className={style.caption}>
                    <div className={style['cube-loader']}>
                        <div className={`${style.cube} ${style['loader-1']}`} />
                        <div className={`${style.cube} ${style['loader-2']}`} />
                        <div className={`${style.cube} ${style['loader-4']}`} />
                        <div className={`${style.cube} ${style['loader-3']}`} />
                    </div>
                </div>
        </div>
    }
}

export default Preloader