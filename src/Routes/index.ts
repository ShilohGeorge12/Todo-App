import { Router } from 'express';
import Validate from '../Middlewares/Auth/index';
import { ErrorBoundary } from '../Middlewares/Error';
import TodoModel from '../Model/Todos/index';
import validateTodos from '../Validator';
const Routes = Router();

Routes.get(
	'/todos',
	Validate,
	ErrorBoundary(async (req, res) => {
<<<<<<< HEAD
		const todos = await TodoModel.find().select('_id todo completed');
=======
		const todos = await TodoModel.find().select('_id todo completed').sort({ todo: 1 });
>>>>>>> b5eaaf9 (fixed some git Issues)
		res.status(200).json(todos);
	})
);

Routes.post(
	'/todos',
	Validate,
	ErrorBoundary(async (req, res) => {
    const { error } = validateTodos(req.body);
    if( error ){
      const errArr: (string| null)[] = [];
      error.details.map(err => errArr.push(err.message));
      res.status(400).json({ error: errArr })
    }else{
      const newTodo = await TodoModel.create({ 
				todo: req.body.todo,
				completed: false, 
			});
      await newTodo.save();
      res.status(200).json(newTodo);
    }
	})
);

Routes.put(
	'/todos/:id',
	Validate,
	ErrorBoundary(async (req, res) => {
    const { error } = validateTodos(req.body);
<<<<<<< HEAD
    const updateTodo = await TodoModel.findOne({ _id: req.params.id }).select('_id todo completed');
=======
    const updateTodo = await TodoModel.findOne({ _id: req.params.id }).select('_id todo completed').sort({ todo: 1 });
>>>>>>> b5eaaf9 (fixed some git Issues)
    if( error ){
      const errArr: (string| null)[] = [];
      error.details.map(err => errArr.push(err.message));
      res.status(400).json({ error: errArr })
    } else if (updateTodo) {
			updateTodo.todo = await req.body.todo;
			updateTodo.completed = await req.body.completed;
			await updateTodo.save();
			const result = await updateTodo;
			console.log(result);
			res.status(200).json(result);
		} else {
			res.status(404).json({ error: 'Todo Not Found!' });
		}
	})
);

Routes.delete(
	'/todos/:id',
	Validate,
	ErrorBoundary(async (req, res) => {
		const isTodo = await TodoModel.exists({ _id:req.params.id  })
    if(isTodo){
      const deleteTodo = await TodoModel.findByIdAndRemove({ _id:req.params.id  })
      res.status(200).json({ message: 'Project deleted!' })
    }else{
      res.status(404).json({ error: 'Project Not Found'})
    }
	})
);

export default Routes;
