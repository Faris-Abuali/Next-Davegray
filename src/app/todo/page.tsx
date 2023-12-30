import TodoList from "../components/TodoList"
import AddTodo from "../components/AddTodo"

export const revalidate = 0 // equivalent to setting the 'cache': 'no-store' header

export default function TodoPage() {
  return (
    <main className="p-5">
      <AddTodo />
      <TodoList />
    </main>
  )
}
