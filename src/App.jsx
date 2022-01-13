import axios from "axios";
import React, { useEffect, useState } from "react";
import _, { take } from "lodash";

const pageSize = 10;

const App = () => {
  let [post, setPost] = useState([]);
  let [pagination, setPagination] = useState();
  let [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then(res => {
      console.log(res.data);
      setPost(res.data);
      setPagination(_(res.data).slice(0).take(pageSize).value());
    });
  }, []);

  const pageCount = post ? Math.ceil(post.length / pageSize) : 0;
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);

  const paginate = pageNo => {
    setCurrentPage(pageNo);
    const startIndex = (pageNo - 1) * pageSize;
    const pagination = _(post).slice(startIndex).take(pageSize).value();
    setPagination(pagination);
  };

  return (
    <div>
      {!pagination ? (
        "No page found"
      ) : (
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th>ID</th>
              <th>User ID</th>
              <th>Title</th>
              <th>Completed</th>
            </tr>
          </thead>
          <tbody>
            {pagination.map((todos, id) => (
              <tr key={id}>
                <td>{todos.id}</td>
                <td>{todos.userId}</td>
                <td>{todos.title}</td>
                <td>
                  <p
                    className={
                      todos.completed ? "btn btn-success" : "btn btn-danger"
                    }
                  >
                    {todos.completed ? "True" : "False"}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          {pages.map(page => (
            <li
              className={
                page === currentPage ? "page-item active" : "page-item"
              }
            >
              <p className="page-link" onClick={() => paginate(page)}>
                {page}
              </p>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default App;
