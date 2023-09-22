import { FaTrash } from "react-icons/fa";
import { BsFillPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";

type TodoProps = {
  title: string;
  body: string;
  id: string;
};

const Todo = (props: TodoProps) => {
  return (
    <div className="flex flex-row items-center mb-5 shadow shadow-black rounded-md p-4">
      <Link to={`/item/${props.id}`}>
        <div>
          <h1 className="font-bold text-xl">{props.title}</h1>
          <p>{props.body}</p>
        </div>
      </Link>

      <div className=" ml-10">
        <button className=" mr-7">
          <Link to={`/edit/${props.id}`}>
            <BsFillPencilFill />
          </Link>
        </button>
        <button className=" mr-5">
          <Link to={`/delete/${props.id}`}>
            <FaTrash />
          </Link>
        </button>
      </div>
    </div>
  );
};

export default Todo;
