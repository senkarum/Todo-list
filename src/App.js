import React from 'react';
import {observer} from "mobx-react";
import Header from "./components/header";
import Todo from "./components/todo";
import DetailsItem from "./components/details/detailsItem/DetailsItem";
import DetailsList from "./components/details/detailsList/DetailsList";
import {Route, Switch} from 'react-router-dom';




@observer
class App extends React.Component {

    render() {
        return (
            <>
                <Header/>
                <Switch>
                    <Route exact path='/' render={() => <Todo/>}/>
                    <Route exact path='/details' render={(props) => <DetailsList {...props}/>}/>
                    <Route exact path='/details/:id?' render={(props) => <DetailsItem {...props}/>}/>
                </Switch>
            </>
        );
    }
}

export default App;
