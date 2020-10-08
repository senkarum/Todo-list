import {observable, action} from "mobx";

class AppStore {
    @observable label = '';

    @observable text = '';

    @observable note = '';

    @observable todoList = [];

    @observable sortingTodoList = [];

    @observable currentItem = null;

    @observable isInvalidForm = false;

    @observable getItemsIsFetching = false;

    @observable currentFilter = "";

    @action validate() {
        if (!this.label) {
            this.isInvalidForm = true;
        } else if (!this.text) {
            this.text = this.label;
            this.isInvalidForm = false;
        } else {
            this.isInvalidForm = false;
        }
    }

    @action clearFields() {
        this.label = '';
        this.text = '';
    }


    @action
    async getTodoList() {
        this.getItemsIsFetching = true;

        let res = await fetch('http://localhost:3200/getItems', {
            method: 'get'
        });

        this.getItemsIsFetching = false;

        if (res) {
            return res.json()
        }
    }

    @action setTodoList(data) {
        this.todoList = [...data];
    }

    @action
    async todoItemGetCurrent(currentId) {
        const res = await fetch(`http://localhost:3200/getCurrent/${currentId}`);
        if (res) {
            return res.json();
        }
    }

    @action setCurrentTodoItem(item) {
        this.currentItem = item;
    }

    @action
    async addTodoItem(e) {
        e.preventDefault();
        this.validate();

        if (this.isInvalidForm) {
            return false;
        }

        await fetch('http://localhost:3200/addItem', {
            method: 'post', body: JSON.stringify({
                isComplete: false,
                status: 'work',
                label: this.label,
                text: this.text,
            }),
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        });

    }

    @action
    async updateNote(e) {
        e.preventDefault();
        await fetch('http://localhost:3200/updateNote', {
            method: 'post', body: JSON.stringify({
                _id: this.currentItem._id,
                note: this.note,
            }),
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        });
    }

    @action
    async todoItemChangeStatus(currentId, status) {
        await fetch('http://localhost:3200/changeStatus', {
            method: 'post',
            body: JSON.stringify({
                _id: currentId,
                status: status
            }),
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        });
    }

    @action
    async deleteTodoItem(currentId) {
        await fetch('http://localhost:3200/deleteItem', {
            method: 'delete',
            body: JSON.stringify({
                _id: currentId,
            }),
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        });
    }

    @action sortBy(filter) {
        this.currentFilter = filter;
        this.sortingTodoList = this.todoList.filter(item => {
            return item.status === filter
        });
    }
}

export default AppStore