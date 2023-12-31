import Todo from "@/app/components/Todo"
import fetchTodo from "@/lib/fetchTodo"
import { notFound } from "next/navigation"

// export const revalidate = 0 // for development only
export const revalidate = 86400 // seconds

type Props = {
    params: {
        id: string
    }
}

export default async function page({ params: { id } }: Props) {

    const todo = await fetchTodo(id)

    if (!todo) notFound()

    return (
        <Todo {...todo} />
    )
}