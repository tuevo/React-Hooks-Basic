import React, { useState, useEffect } from "react";
import "./App.scss";
import './assets/styles/animate.min.css';
import ColorBox from "./components/ColorBox";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import PostList from "./components/PostList";
import Pagination from "./components/Pagination";
import queryString from "query-string";
import PostFilterForm from "./components/PostFilterForm";
import Clock from "./components/Clock";
import MagicBox from "./components/MagicBox";
import BetterClock from "./components/BetterClock";
import BetterMagicBox from "./components/BetterMagicBox";
import Hero from "./components/Hero";

function App() {
  const pageLimit = 5;

  // Todo List
  const [todoList, setTodoList] = useState([
    { title: "Doing homework" },
    { title: "Watching news" },
    { title: "Studying online" }
  ]);

  function onTodoListClick(todo) {
    const index = todoList.findIndex(item => item.id === todo.id);
    if (index < 0) return;

    const newTodoList = [...todoList];
    newTodoList.splice(index, 1);
    setTodoList(newTodoList);
  }

  function onSubmitTodoForm(formValues) {
    const newTodoList = [...todoList, { ...formValues }];
    setTodoList(newTodoList);
  }

  // Post List
  const [postList, setPostList] = useState([]);
  const [isPostListLoading, setPostListLoading] = useState(false);
  const [postListPagination, setPostListPagination] = useState({
    _page: 1,
    _limit: pageLimit,
    _totalRows: 1
  });
  const [postListFilters, setPostListFilters] = useState({
    _page: 1,
    _limit: pageLimit
  })

  // Post Filter Form
  function onSubmitPostFilterForm(formValues) {
    // Re-fetch post list => Just change the postListFilters ( useEffect() is called when its dependencies change )
    setPostListFilters({
      ...postListFilters,
      page: 1,  // Beginning to search the term from the head of list
      title_like: formValues.searchTerm
    });
  }

  useEffect(() => {
    async function fetchPostList() {
      try {
        setPostListLoading(true);
        const queryParams = queryString.stringify(postListFilters);
        const responseUrl =
          `http://js-post-api.herokuapp.com/api/posts?${queryParams}`;
        const response = await fetch(responseUrl);
        const responseJSON = await response.json();
        const { data, pagination } = responseJSON;
        setPostList(data.sort((a, b) => b.createdAt - a.createdAt));
        setPostListPagination(pagination);
        setPostListLoading(false);
      } catch (error) {
        console.log("Failed to fetch post list: ", error.message);
      }
    }

    fetchPostList();
  }, [postListFilters]);

  function onPostListPageChange(newPage) {
    setPostListFilters({
      ...postListFilters,
      _page: newPage
    })
  }

  // Showing clock
  const [isClockShown, setClockShowing] = useState(true);

  // Hero counting
  const [appCount, setAppCount] = useState(0);

  return (
    <div className="app animated slideInUp">
      <div className="app__title">
        <img src="https://miro.medium.com/max/1166/1*fQefaOBmMkqfdpvphCEdVw.png" alt="" />
        <h1>React Hooks Examples</h1>
      </div>

      <h2>1. useState()</h2>

      <div className="app__examples">
        <div className="app__examples__item">
          <h3>Color Box</h3>
          <ColorBox />
        </div>

        <div className="app__examples__item">
          <h3>Todo List</h3>
          <TodoForm onSubmitTodoForm={onSubmitTodoForm} />
          <TodoList todoList={todoList} onTodoClick={onTodoListClick} />
        </div>
      </div>

      <h2>2. useEffect(), useRef()</h2>

      <div className="app__examples">
        <div className="app__examples__item">
          <h3>Post List</h3>
          <PostFilterForm onSubmitPostFilterForm={onSubmitPostFilterForm} />
          <PostList posts={postList} isLoading={isPostListLoading} />
          <Pagination
            pagination={postListPagination}
            onPageChange={onPostListPageChange}
          />
        </div>
        <div className="app__examples__item">
          <h3>Clock</h3>
          {isClockShown && <Clock />}
          <button className="app__btn-show-clock" onClick={() => setClockShowing(!isClockShown)}>
            {isClockShown ? <span>Hide clock</span> : <span>Show clock</span>}
          </button>
        </div>
      </div>

      <h2>3. Custom hook</h2>

      <div className="app__examples">
        <div className="app__examples__item">
          <h3>Magic Box</h3>
          <MagicBox />
        </div>

        <div className="app__examples__item">
          <h3>Better Clock</h3>
          <BetterClock />
        </div>

        <div className="app__examples__item">
          <h3>Better Magic Box</h3>
          <BetterMagicBox />
        </div>
      </div>

      <h2>4. React.memo() (is NOT a React Hook)</h2>

      <div className="app__examples">
        <div className="app__examples__item">
          <h3>Iron Man IS NOT RE-RENDERED WHEN APP COUNTER CHANGES</h3>
          <p>App counter: {appCount}</p>
          <button className="app__btn-count" onClick={() => setAppCount(appCount + 1)}>COUNT</button>
          <Hero name="Iron Man" />
        </div>
      </div>
    </div>
  );
}

export default App;
