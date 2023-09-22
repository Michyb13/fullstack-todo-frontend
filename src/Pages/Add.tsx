import axios from "axios";
import { useState, ChangeEvent, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import { todoContext } from "../context/TodoContextProvider";

const Add = () => {
  const todo = useContext(todoContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setTitle(value);
  };
  const handleBody = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setText(value);
  };

  const submitForm = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = { title: title, text: text };

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:3500/todo", formData);
      todo?.addItem(response.data);
      setTitle("");
      setText("");
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setError(error.response.data.message);
      setIsLoading(false);
    }
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
          Add a Todo Item
        </h1>
      </div>
      <form
        className=" w-full flex flex-col items-start p-4"
        onSubmit={submitForm}
      >
        <label className="my-4 font-bold text-2xl">Title</label>
        <input
          className=" border border-black w-full p-2 text-xl"
          type="text"
          value={title}
          onChange={handleTitle}
        />
        <label className="my-4 font-bold text-2xl">Description</label>
        <textarea
          className="border border-black w-full p-3 text-xl"
          maxLength={150}
          minLength={5}
          value={text}
          onChange={handleBody}
        />
        <button
          disabled={isLoading}
          className="border border-black w-1/5 self-center mt-4 rounded-md p-1 font-bold hover:bg-black hover:text-white"
        >
          {isLoading ? "Adding Item" : "Add Task"}
        </button>
      </form>
      {error && (
        <h3 className=" text-red-600 font-bold text-lg my-6">{error}</h3>
      )}
    </div>
  );
};

export default Add;
