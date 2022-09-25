import { Transition } from "@headlessui/react";
import { useState } from "react";
import Button from "../components/Button";
import Updated from "../components/Updated";

export default function Home() {
  const [activity, setActivity] = useState("");
  const [todos, setTodos] = useState([]);
  const [edit, setEdit] = useState({});
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgIsShow, setMsgIsShow] = useState(false);
  const [updatedSucess, setUpdatedSuccess] = useState(false);
  const generateId = () => {
    return Date.now();
  };

  function saveTodoHandler(e) {
    e.preventDefault();
    if (!activity) {
      setMsgIsShow(true);
      return setMsg("Aktivitas tidak boleh kosong ");
    }
    setMsg("");

    if (edit.id) {
      const updateTodo = {
        id: edit.id,
        activity,
        done: edit.done,
      };

      const editTodoIndex = todos.findIndex((todo) => {
        return todo.id == edit.id;
      });

      const updateTodos = [...todos];
      updateTodos[editTodoIndex] = updateTodo;

      setTodos(updateTodos);
      setUpdatedSuccess(true);
      return cancelEditHandler();
    }

    setTodos((arr) => [
      ...arr,
      {
        id: generateId(),
        activity,
        done: false,
      },
    ]);
    setActivity("");
  }

  function removeHandler(todoId) {
    setMsg("");
    const filteredTodos = todos.filter((todo) => {
      return todo.id !== todoId;
    });
    setTodos(filteredTodos);
    return cancelEditHandler();
  }

  function editHandler(todo) {
    setMsg("");
    setActivity(todo.activity);
    setEdit(todo);
    setShow(true);
  }

  function cancelEditHandler() {
    setShow(false);
    setEdit({});
    setActivity("");
  }

  function doneTodoHandler(todo) {
    const updatedTodo = {
      ...todo,
      done: todo.done ? false : true,
    };

    const editTodoIndex = todos.findIndex((currentTodo) => {
      return currentTodo.id == todo.id;
    });

    const updatedTodos = [...todos];
    updatedTodos[editTodoIndex] = updatedTodo;

    setTodos(updatedTodos);
  }

  if (msgIsShow) {
    setTimeout(() => {
      setMsgIsShow(false);
    }, 3000);
  }

  if (updatedSucess) {
    setTimeout(() => {
      setUpdatedSuccess(false);
    }, 4200);
  }

  const buttonStyle =
    "px-2 bg-rose-200 rounded-md font-mono fonst-semibold h-8 shadow-lg focus:outline-none focus:ring-2 ring-1 ring-rose-300 transition duration-500";

  return (
    <>
      <div className="flex justify-center bg-rose-500 ">
        <div className="container  flex min-h-screen flex-col items-center justify-center">
          <h1
            className={`m:w-6/12 w-full rounded-lg bg-rose-400 py-3 text-center font-mono text-2xl font-bold md:w-5/12 lg:w-3/12 ${
              msgIsShow ? "mb-0" : "mb-6"
            }`}
          >
            Todo List APP
          </h1>
          {msg && (
            <Transition
              className="w-12/12 mt-6 flex flex-row items-center justify-center rounded-lg bg-rose-300 p-2 font-mono font-medium"
              appear={true}
              show={msgIsShow}
              enter="transition duration-500"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-500"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opcaity-0"
            >
              {msg}
              {/* prettier-ignore */}
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-rose-600 animate-pulse ml-1" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M4.931.481c1.627-1.671 5.692 1.254 0 5.015-5.692-3.76-1.626-6.686 0-5.015Zm6.84 1.794c1.084-1.114 3.795.836 0 3.343-3.795-2.507-1.084-4.457 0-3.343ZM7.84 7.642c2.71-2.786 9.486 2.09 0 8.358-9.487-6.268-2.71-11.144 0-8.358Z"/>
            </svg>
            </Transition>
          )}
          <form
            className="mt-3 flex items-center justify-center gap-3"
            onSubmit={saveTodoHandler}
          >
            <input
              type="text"
              maxLength={21}
              placeholder="Your activity"
              value={activity}
              className={`rounded-lg px-2 font-mono text-rose-500 shadow-lg shadow-rose-600 transition duration-500 placeholder:font-mono placeholder:text-rose-400 focus:border-rose-400 focus:accent-rose-400 focus:outline-none focus:ring-1 focus:ring-rose-300 ${
                edit.id ? "h-16" : "h-8"
              }`}
              onChange={(e) => {
                setActivity(e.target.value);
              }}
            />
            <div className="flex flex-col gap-2">
              <Button type="submit" className="bg-rose-400 px-6">
                {edit.id ? "Simpan" : "Tambah"}
              </Button>
              {edit.id && (
                <Transition
                  appear={show}
                  show={show}
                  enter="transition duration-500"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-500"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opcaity-0"
                >
                  <button
                    className="fonst-semibold h-8 w-full rounded-md bg-rose-400 px-1 font-mono shadow-lg ring-1 ring-rose-300 transition duration-500 focus:outline-none focus:ring-2"
                    onClick={cancelEditHandler}
                  >
                    Batal Edit
                  </button>
                </Transition>
              )}
            </div>
          </form>
          {todos.length > 0 ? (
            <ul className="mt-4 flex flex-col items-start">
              {todos.map((todo) => {
                return (
                  <Transition
                    appear={true}
                    show={true}
                    key={todo.id}
                    className="flex flex-row gap-1"
                    enter="transition duration-500"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-500"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opcaity-0"
                  >
                    <li
                      className="mb-2 mr-1 flex w-60 flex-row items-center rounded-md bg-rose-200 p-1 font-mono font-bold shadow-lg"
                      style={{
                        textDecoration: `${
                          todo.done == true ? "line-through" : ""
                        }`,
                      }}
                    >
                      {/* prettier-ignore */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`${!todo.done && "animate-bounce mt-2"} mt-1 mr-1 text-rose-500`} viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M8.49 10.92C19.412 3.382 11.28-2.387 8 .986 4.719-2.387-3.413 3.382 7.51 10.92l-.234.468a.25.25 0 1 0 .448.224l.04-.08c.009.17.024.315.051.45.068.344.208.622.448 1.102l.013.028c.212.422.182.85.05 1.246-.135.402-.366.751-.534 1.003a.25.25 0 0 0 .416.278l.004-.007c.166-.248.431-.646.588-1.115.16-.479.212-1.051-.076-1.629-.258-.515-.365-.732-.419-1.004a2.376 2.376 0 0 1-.037-.289l.008.017a.25.25 0 1 0 .448-.224l-.235-.468ZM6.726 1.269c-1.167-.61-2.8-.142-3.454 1.135-.237.463-.36 1.08-.202 1.85.055.27.467.197.527-.071.285-1.256 1.177-2.462 2.989-2.528.234-.008.348-.278.14-.386Z"/>
                    </svg>
                      {todo.activity}
                      <input
                        type="checkbox"
                        className="ml-auto mr-1 rounded-lg text-rose-500 transition duration-500 focus:border-rose-500 focus:accent-rose-500 focus:ring-0"
                        onChange={doneTodoHandler.bind(this, todo)}
                      />
                    </li>
                    <button
                      className={buttonStyle}
                      onClick={removeHandler.bind(this, todo.id)}
                    >
                      {/* prettier-ignore */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-rose-500" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                    </button>
                    <button
                      className={buttonStyle}
                      onClick={editHandler.bind(this, todo)}
                    >
                      {/* prettier-ignore */}
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-rose-500" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                  </svg>
                    </button>
                  </Transition>
                );
              })}
            </ul>
          ) : (
            <h1 className="text-md mt-4 animate-pulse rounded-lg bg-rose-300 px-3 py-2 font-mono font-medium">
              Belum ada aktivitas
            </h1>
          )}
          <Updated show={updatedSucess}></Updated>
        </div>
      </div>
    </>
  );
}
