import React from "react";

const App = () => {
  const todos = [
    { title: "go to gym", done: false },
    { title: "Go to study", done: true },
  ];

  const styleComponents = {
    backgroundColor: "red",
    color: "white",
    padding: 10,
    borderRadius: 20,
  };

  function Todo({ title, done }) {
    return (
      <div style={styleComponents}>
        {title} - {done ? "Done!" : "Not Done!"}
      </div>
    );
  }

  const todosComponents = todos.map((todo, index) => (
    <Todo key={index} title={todo.title} done={todo.done} />
  ));

  return <div>{todosComponents}</div>;
};

export default App;
