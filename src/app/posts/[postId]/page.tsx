import { getSortedPostsData, getPostData } from "@/lib/posts"
import { notFound } from "next/navigation"
import type { Metadata } from 'next'
import getFormattedDate from "@/lib/getFormattedDate"
import Link from "next/link"

export function generateStaticParams(): Params<'postId'>[] {
    const posts = getSortedPostsData() // deduped!

    return posts.map(post => ({
        params: {
            postId: post.id,
        }
    }))
}

export function generateMetadata({ params }: Params<'postId'>): Metadata {
    const { postId } = params

    /**The new docs have clarified that fetch requests are deduped (deduplicated) 
     * by default, so we don't need to worry about repeating requests.
     * 
     * If you want to dedupe a function that is NOT using fetch, you
     * can use React cache()
    */
    const posts = getSortedPostsData() // deduped!

    const post = posts.find(post => post.id === postId);

    if (!post) {
        return {
            title: "Post Not Found",
        }
    }

    return {
        title: post.title,
    }
}

export default async function Post({ params }: Params<'postId'>) {
    const { postId } = params

    /**The new docs have clarified that fetch requests are deduped (deduplicated) 
     * by default, so we don't need to worry about repeating requests.
     * 
     * If you want to dedupe a function that is NOT using fetch, you
     * can use React cache()
    */
    const posts = getSortedPostsData() // deduped!

    if (!posts.find(post => post.id === postId)) {
        notFound()
    }

    const { title, date, contentHtml } = await getPostData(postId)

    const pubDate = getFormattedDate(date)

    return (
        <main className='px-6 prose prose-xl prose-slate dark:prose-invert mx-auto'>
            <p>
                <Link href="/">⬅️ Back to Home</Link>
            </p>
            <h1 className="text-3xl mt-4 mb-0">{title}</h1>
            <p className="mt-0">{pubDate}</p>
            <article>
                <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
            </article>
        </main>
    )
}