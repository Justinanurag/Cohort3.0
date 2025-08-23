import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  Outlet,
} from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Default page */}
          <Route index element={<Home />} />

          {/* Nested routes */}
          <Route
            path="neet/online-coaching-class-10"
            element={<Class10Program />}
          />
          <Route
            path="neet/online-coaching-class-11"
            element={<Class11Program />}
          />
          <Route
            path="neet/online-coaching-class-12"
            element={<Class12Program />}
          />

          {/* Error / 404 route */}
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
//Phale layout ko render kro
function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <div>Footer || Contact Us</div>
    </div>
  );
}

function Class10Program() {
  return <div>Neet programs for class 10th</div>;
}

function Class11Program() {
  return <div>Neet programs for class 11th</div>;
}

function Class12Program() {
  const navigate = useNavigate();
  function redirectUser() {
    navigate("/");
  }
  return (
    <div>
      Neet programs for class 12th
      <button onClick={redirectUser}>Go back to landing page</button>
    </div>
  );
}

function Home() {
  return <div>Welcome! This is the home page of Willen!</div>;
}

function Error() {
  const navigate = useNavigate();
  function redirectToHome() {
    navigate("/");
  }

  return (
    <div>
      <h2>Page Not Found</h2>
      <button onClick={redirectToHome}>Go back to home page</button>
    </div>
  );
}

function Header() {
  return (
    <div>
      <Link to="/">Allen</Link> |{" "}
      <Link to="/neet/online-coaching-class-10">Class 10</Link> |{" "}
      <Link to="/neet/online-coaching-class-11">Class 11</Link> |{" "}
      <Link to="/neet/online-coaching-class-12">Class 12</Link>
    </div>
  );
}

export default App;
