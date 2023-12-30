import { NextResponse } from "next/server"

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos"
const API_KEY: string = process.env.API_KEY as string

export async function GET(request: Request) {
    const origin = request.headers.get("origin")
    const response = await fetch(DATA_SOURCE_URL)
    const todos: Todo[] = await response.json()
    // return NextResponse.json(todos)
    return new NextResponse(JSON.stringify(todos), {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': origin || '*',
            // You have to return the 'Access-Control-Allow-Origin' header in the response
            // when you are using CORS
            // otherwise, the browser will block the response
            // and you will see an error message in the console
        },
    })
}

export async function DELETE(request: Request) {
    const { id }: Pick<Todo, 'id'> = await request.json();

    if (!id) return NextResponse.json({ "message": "id is required" });

    const response = await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': API_KEY // not required, just an example why we might need to use next.js route handlers
        },
    });

    return NextResponse.json({ "message": `Todo ${id} deleted` });
}

export async function POST(request: Request) {
    const { userId, title }: Pick<Todo, 'userId' | 'title'> = await request.json();

    if (!userId || !title) {
        return NextResponse.json({ "message": "Missing either userId or title or both" });
    }

    const response = await fetch(DATA_SOURCE_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': API_KEY // not required, just an example why we might need to use next.js route handlers
        },
        body: JSON.stringify({ userId, title, completed: false })
    });

    const newTodo: Todo = await response.json();

    return NextResponse.json(newTodo);
}

export async function PUT(request: Request) {
    const { id, userId, title, completed }: Todo = await request.json();

    if (!userId || !title || !title || typeof(completed) !== 'boolean') {
        return NextResponse.json({ "message": "Missing required data in request body" });
    }

    const response = await fetch(`${DATA_SOURCE_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': API_KEY // not required, just an example why we might need to use next.js route handlers
        },
        body: JSON.stringify({ userId, title, completed })
    });

    const updatedTodo: Todo = await response.json();

    return NextResponse.json(updatedTodo);
}