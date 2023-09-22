import { useState, useContext, useEffect, ChangeEvent } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { todoContext } from "../context/TodoContextProvider";
import axios from "axios";

type Item = {
  title: string;
  body: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const Delete = () => {
  const todo = useContext(todoContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [details, setDetails] = useState<Item>(Object);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getOne = async () => {
      const response = await axios.get(`http://localhost:3500/todo/${id}`);
      setDetails(response.data);
    };
    getOne();
  }, [id]);

  const submitForm = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await axios.delete(`http://localhost:3500/todo/${id}`);
    todo?.deleteItem(response.data);
    setIsLoading(false);
    navigate("/");
  };

  return (
    <div className="w-full flex flex-col items-center text-black">
      <div className=" w-full flex flex-row items-center justify-center mb-10">
        <h1 className="mt-5 text-4xl font-bold text-center ">
          Delete Todo Item
        </h1>
      </div>
      <h2 className=" text-xl">Are you sure you want to delete this item?</h2>
      <form
        className=" w-full flex flex-col items-start p-4"
        onSubmit={submitForm}
      >
        <label className="my-4 font-bold text-2xl">Title</label>
        <input
          className=" border border-black w-full p-2 text-xl"
          type="text"
          value={details?.title}
          readOnly
        />
        <label className="my-4 font-bold text-2xl">Description</label>
        <textarea
          className="border border-black w-full p-3 text-xl"
          maxLength={150}
          minLength={5}
          value={details?.body}
          readOnly
        />
        <div className=" w-full flex flex-row items-center justify-center">
          <button
            type="submit"
            disabled={isLoading}
            className="border border-black w-1/5 self-center mt-4 rounded-md p-1 font-bold hover:bg-black hover:text-white mr-8"
          >
            {isLoading ? "Deleting Item" : "Delete Task"}
          </button>
          <button
            type="button"
            disabled={isLoading}
            className="border border-black w-1/5 self-center mt-4 rounded-md p-1 font-bold hover:bg-black hover:text-white"
          >
            <Link to="/">Cancel</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Delete;
