import {Outlet} from "react-router-dom";
import Header from "../../Header/Header";

const Root = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <Header />
      </div>
      <Outlet />
    </div>
  );
};

export default Root;
