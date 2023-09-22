import { useState, createContext, ReactNode } from "react";

interface ItemFeatures {
  items: Item[];
  allItems: (response: Item[]) => void;
  addItem: (response: Item) => void;
  editItem: (response: Item) => void;
  deleteItem: (response: Item) => void;
}

type Item = {
  title: string;
  body: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export const todoContext = createContext<ItemFeatures | null>(null);
const TodoContextProvider = (props: { children: ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);

  const allItems = (response: Item[]) => {
    setItems(response);
  };

  const addItem = (response: Item) => {
    setItems((prev) => {
      return [response, ...prev];
    });
  };

  const editItem = (response: Item) => {
    const editList = items.map((item) =>
      response._id === item._id ? response : item
    );
    setItems(editList);
  };

  const deleteItem = (response: Item) => {
    const filteredList = items.filter((item) => item._id !== response._id);
    setItems(filteredList);
  };

  const exports = {
    items,
    allItems,
    addItem,
    editItem,
    deleteItem,
  };

  return (
    <todoContext.Provider value={exports}>
      {props.children}
    </todoContext.Provider>
  );
};

export default TodoContextProvider;
