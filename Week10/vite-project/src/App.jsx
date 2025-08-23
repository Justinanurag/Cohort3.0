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
  // ✅ Route configuration array
  // Instead of hardcoding <Route> multiple times, we store them here
  const routes = [
    {
      path: "neet/online-coaching-class-10",
      element: <Class10Program />,
    },
    {
      path: "neet/online-coaching-class-11",
      element: <Class11Program />,
    },
    {
      path: "neet/online-coaching-class-12",
      element: <Class12Program />,
    },
    {
      path: "*", // ✅ catch-all for invalid URLs inside "/"
      element: <Error />,
    },
    {
      index: true, // ✅ Default route for "/"
      element: <Home />,
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Layout is the parent route */}
        {/* All child routes will render inside <Outlet /> */}
        <Route path="/" element={<Layout />}>
          {/* ✅ map over the routes array to generate child routes */}
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path} // child path (relative to parent "/")
              index={route.index} // only one route can be index
              element={route.element} // component to render
            />
          ))}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

// ✅ Layout component: always renders Header + Footer
// Outlet is where child routes will be displayed
function Layout() {
  return (
    <div>
      <Header />
      <Outlet /> {/* placeholder for nested routes */}
      <div>Footer || Contact Us</div>
    </div>
  );
}

// ---------------- Page Components ----------------
function Class10Program() {
  return <div>Neet programs for class 10th</div>;
}

function Class11Program() {
  return <div>Neet programs for class 11th</div>;
}

function Class12Program() {
  const navigate = useNavigate(); // ✅ useNavigate hook for programmatic navigation

  function redirectUser() {
    navigate("/"); // redirect user back to home
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
    navigate("/"); // redirect invalid page → home
  }

  return (
    <div>
      <h2>Page Not Found</h2>
      <button onClick={redirectToHome}>Go back to home page</button>
    </div>
  );
}

// ✅ Header with navigation links
// Use <Link> instead of <a> → prevents page reload
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
