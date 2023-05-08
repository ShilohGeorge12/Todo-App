import { model, Schema } from "mongoose";

export interface ITodoModel{
  todo: string;
  completed: boolean;
  createdAt: Date;
} 

const TodoModel = model('stores', new Schema<ITodoModel>({
  todo: {
    type: String,
    minlength: 2,
    maxLenght: 100,
    required: true,
  },
  completed: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
}))

export default TodoModel;