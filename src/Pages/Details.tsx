import { useState, useEffect } from "react";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { BsFillPencilFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import axios from "axios";

type Item = {
  title: string;
  body: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const Details = () => {
  const [details, setDetails] = useState<Item>(Object);
  const [date, setDate] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const getOne = async () => {
      const response = await axios.get(`http://localhost:3500/todo/${id}`);
      setDetails(response.data);
      if (details.createdAt) {
        const dbDate = new Date(details.createdAt);
        if (!isNaN(dbDate.getTime())) {
          const formattedDate = format(dbDate, "MM/dd/yyyy, HH:mm");
          setDate(formattedDate);
        }
      }
    };

    getOne();
  }, [id, details.createdAt]);

  return (
    <div className=" w-full flex flex-col items-start text-black p-5">
      <h3 className=" ml-6 mt-6 text-2xl" title="Back">
        <Link to="/">
          <IoIosArrowBack />
        </Link>
      </h3>
      <div className="w-full p-4 shadow shadow-black rounded-md mt-6">
        <h1 className="font-bold text-3xl mb-10">{details?.title}</h1>
        <h2 className=" mb-5 text-lg">{details?.body}</h2>
        <div className=" w-full flex flex-row items-center justify-between">
          <p>Created on: {date}</p>
          <button>
            <Link to="/edit">
              <BsFillPencilFill />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
