import { NextResponse } from "next/server"

const allowedOrigins = process.env.NODE_ENV === 'production'
    ? ['https://yoursite.com', 'https://anothersite.com']
    : ['http://localhost:3000', 'https://www.google.com']

export function middleware(request: Request) {
    const origin = request.headers.get("origin")

    // if (origin && !allowedOrigins.includes(origin)) {
    //     return new NextResponse(null, {
    //         status: 403,
    //         statusText: "Forbidden",
    //         headers: {
    //             'Content-Type': 'text/plain',
    //         },
    //     })
    // }

    // const regex = new RegExp('/api/.*')
    // if (request.url.includes('/api/')) {

    // }

    // if (regex.test(request.url)) {

    // }

    // The middleware function will be invoked for EVERY ROUTE IN YOUR PROJECT

    return NextResponse.next()
}

export const config = {
    matcher: '/api/:path*'
}