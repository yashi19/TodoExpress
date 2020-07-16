/**
 * @author:Yashika Tanwar
 */
const express=require('express');
const path=require('path');
const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/',express.static(path.join(__dirname,'public')));

const routes={
    todo:require('./routes/todos_routes')
};

app.use('/todos',routes.todo);

app.listen(4545);