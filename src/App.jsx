import React, { useEffect, useState } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
// import "./home.css";

const App = () => {
  let [state, setState] = useState([]);
  let [loading, setLoading] = useState(false);
  let [pageNumber, setPageNumber] = useState(0);

  let userPerPage = 10;
  let pageVisited = pageNumber * userPerPage;

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/todos").then(res => {
      console.log(res.data);
      setState(res.data);
    });
  }, []);

  let handlePrev = () => {
    setPageNumber(pageNumber - 1);
  };

  let handlenext = () => {
    setPageNumber(pageNumber + 1);
  };

  let handleStart = () => {
    setPageNumber(0);
  };

  let handleLast = () => {
    setPageNumber(19);
  };

  let displayUser = state
    .slice(pageVisited, pageVisited + userPerPage)
    .map(x => (
      <tr key={x.id} className="bodyrow">
        <td>{x.id}</td>
        <td>{x.userId}</td>
        <td>{x.title}</td>
        <td>
          <p className={x.completed ? "btn btn-success" : "btn btn-danger"}>
            {x.completed ? "Yes" : "No"}
          </p>
        </td>
      </tr>
    ));

  let pageCount = Math.ceil(state.length / userPerPage);

  let changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <section className="paginationBlock">
      {loading === true ? (
        "loading...."
      ) : (
        <table className="table">
          <thead>
            <tr className="headRow">
              <th>id</th>
              <th>UserId</th>
              <th>title</th>
              <th>completed</th>
            </tr>
          </thead>

          <tbody>{displayUser}</tbody>
        </table>
      )}
      <nav className="d-flex justify-content-center">
        <button onClick={handlePrev}>previous</button>
        <button onClick={handleStart}>start</button>
        <button onClick={handleLast}>last</button>
        <button onClick={handlenext}>next</button>
      </nav>
    </section>
  );
};

export default App;
