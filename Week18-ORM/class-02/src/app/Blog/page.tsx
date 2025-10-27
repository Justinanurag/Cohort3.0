import axios from "axios";

async function getBlogs() {
  const response = await axios.get("https://jsonplaceholder.typicode.com/todos/");
  console.log(response.data); // log the actual data
  return response.data;       // return the data instead of the full response object
}

export default async function Blog() {
  const blogs = await getBlogs();
  console.log(blogs);
  return (
    <div>
      Blog Page
      {blogs.map((blog:ITodo)=><Todo title={blog.title} completed={blog.completed}/>)}
    </div>
  );
}

interface ITodo{
    title:string
    completed:boolean;
}

function Todo({title,completed}:ITodo){
    return <div>
        {title}{completed ? "Done":"Not Done"}
    </div>
}