import axios from "axios";
import { useState, ChangeEvent, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { todoContext } from "../context/TodoContextProvider";

const Edit = () => {
  const todo = useContext(todoContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const [editTitle, setEditTitle] = useState("");
  const [editText, setEditText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getOne = async () => {
      const response = await axios.get(`http://localhost:3500/todo/${id}`);
      setEditTitle(response.data.title);
      setEditText(response.data.body);
    };
    getOne();
  }, [id]);

  const submitForm = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = { newTitle: editTitle, newText: editText };

    setIsLoading(true);
    try {
      const response = await axios.put(
        `http://localhost:3500/todo/${id}`,
        params
      );
      todo?.editItem(response.data);
      setEditText("");
      setEditTitle("");
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
  };

  const handleEditTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEditTitle(value);
  };
  const handleEditText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setEditText(value);
  };

  return (
    <div className="w-full flex flex-col items-center text-black">
      <div className=" w-full flex flex-row items-center">
        <h3 className=" ml-6 mt-6 text-2xl text-start " title="Back">
          <Link to="/">
            <IoIosArrowBack />
          </Link>
        </h3>
        <h1 className="mt-5 text-4xl font-bold text-center ml-64">
          Edit Todo Item
        </h1>
      </div>
      <form
        className=" w-full flex flex-col items-start p-4"
        onSubmit={submitForm}
      >
        <label className="my-4 font-bold text-2xl"> Edit Title</label>
        <input
          className=" border border-black w-full p-2 text-xl"
          type="text"
          value={editTitle}
          onChange={handleEditTitle}
        />
        <label className="my-4 font-bold text-2xl"> Edit Description</label>
        <textarea
          className="border border-black w-full p-3 text-xl"
          maxLength={150}
          minLength={5}
          value={editText}
          onChange={handleEditText}
        />
        <button
          disabled={isLoading}
          className="border border-black w-1/5 self-center mt-4 rounded-md p-1 font-bold hover:bg-black hover:text-white"
        >
          {isLoading ? "Editing Item" : "Edit Task"}
        </button>
      </form>
      {error && (
        <h3 className=" text-red-600 font-bold text-lg my-6">{error}</h3>
      )}
    </div>
  );
};

export default Edit;
