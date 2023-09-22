import {
  Route,
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import Home from "./Pages/Home";
import Details from "./Pages/Details";
import Add from "./Pages/Add";
import Edit from "./Pages/Edit";
import RootLayout from "./components/RootLayout";
import Delete from "./Pages/Delete";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/item/:id" element={<Details />}></Route>
        <Route path="/add" element={<Add />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
        <Route path="/delete/:id" element={<Delete />}></Route>
      </Route>
    )
  );

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
