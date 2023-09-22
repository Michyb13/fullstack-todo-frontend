import { useEffect, useContext } from "react";
import axios from "axios";
import Todo from "../components/Todo";
import { BsPlusCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { todoContext } from "../context/TodoContextProvider";

const Home = () => {
  const todo = useContext(todoContext);

  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await axios.get("http://localhost:3500/todo");
        todo?.allItems(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getItem();
  }, [todo?.items, todo]);

  const render = todo?.items.map((todo) => {
    return (
      <Todo key={todo._id} id={todo._id} title={todo.title} body={todo.body} />
    );
  });
  return (
    <div className=" w-full text-black flex flex-col items-center ">
      <div className="w-full flex flex-row items-center justify-between mt-5 mb-6 border-b border-black pb-5">
        <h1 className=" font-extrabold text-2xl ml-10 mr-10">To-Do List</h1>
        <button
          className=" mr-10 ml-96 text-2xl text-black"
          title="Add New Todo"
        >
          <Link to="/add">
            <BsPlusCircle />
          </Link>
        </button>
      </div>

      <div className="w-full flex flex-col items-start ml-8">
        {todo?.items.length === 0 ? (
          <h1 className=" text-3xl mb-5 self-center">No Items Added</h1>
        ) : (
          render
        )}
      </div>
    </div>
  );
};

export default Home;
