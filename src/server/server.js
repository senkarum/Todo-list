require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const Schema = mongoose.Schema;

app.use(cors());
app.use(bodyParser.json());

const url = process.env.DB_URL;

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
    console.log('db connected');

    const todoItemSchema = new Schema({
        status: String,
        label: String,
        text: String,
        note: String
    });

    const TodoItem = mongoose.model('TodoItem', todoItemSchema);

    app.post('/addItem', (req, res) => {
        const newItem = new TodoItem(req.body);
        console.log(JSON.stringify(req.body));
        newItem.save().then(() => {
            res.sendStatus(200)
        })
    });

    app.get('/getItems', (req, res) => {
        TodoItem.find({}, (err, items) => {
            res.send(items);
        })
    });

    app.get('/getCurrent/:id', (req, res) => {
        TodoItem.findById({_id: req.params.id}, (err, item) => {
            if (!err) {
                res.send(item);
            } else {
                res.send(false);
            }
        });
    });

    app.post('/changeStatus', (req, res) => {
        TodoItem.findOne({_id: req.body._id}, (err, item) => {
            item.status = req.body.status;
            if (!err) {
                console.log('status updated');
            }
            item.save().then(() => {
                res.sendStatus(200)
            });
        });
    });

    app.post('/updateNote', (req, res) => {
        TodoItem.findOne({_id: req.body._id}, (err, item) => {
            item.note = req.body.note;
            if (!err) {
                console.log('note updated');
            }
            item.save().then(() => {
                res.sendStatus(200)
            });
        });
    });

    app.delete('/deleteItem', (req, res) => {
        TodoItem.deleteOne({_id: req.body._id}, (err) => {
            if (!err) {
                console.log('deleted');
            }
        }).then(() => {
            res.sendStatus(200)
        });
    });

    app.listen(process.env.PORT, () => {
        console.log('server listening');
    })
});

