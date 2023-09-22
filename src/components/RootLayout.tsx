import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <main className=" mx-auto mt-10 w-4/6 bg-white rounded-md text-white shadow shadow-black">
      <Outlet />
    </main>
  );
};

export default RootLayout;
