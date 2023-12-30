import getUser from '@/lib/getUser'
import getUserPosts from '@/lib/getUserPosts'
import getAllUsers from '@/lib/getAllUsers'
import { Suspense } from 'react'
import UserPosts from './components/UserPosts'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

type Params = {
    params: {
        userId: string
    }
}

export const generateMetadata = async ({ params: { userId } }: Params): Promise<Metadata> => {
    const userData: Promise<User> = getUser(userId)
    const user: User = await userData

    if(!user) {
        return {
            title: 'User Not Found',
        }
    }

    return {
        title: user.name,
        description: `${user.name}'s Page Description`,
    }
} 

export default async function UserPage({ params: { userId } }: Params) {
    const userData: Promise<User> = getUser(userId)
    const userPostsData: Promise<Post[]> = getUserPosts(userId)

    //Notice we don't await the promises here, we request them in parallel.

    // const [user, userPosts] = await Promise.all([userData, userPostsData]);

    const user = await userData

    if(!user) {
        notFound()
    }

    return (
        <>
            <h2>{user.name}</h2>
            <br />
            <Suspense fallback={<h2>Loading...</h2>}>
                <UserPosts promise={userPostsData} />
            </Suspense>
        </>
    )
}

export async function generateStaticParams() {
    const usersData: Promise<User[]> = getAllUsers()
    const users: User[] = await usersData

    return users.map((user) => ({
        userId: user.id.toString(),
    }))
}