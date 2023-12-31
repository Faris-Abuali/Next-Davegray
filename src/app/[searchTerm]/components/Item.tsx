import Link from 'next/link'
import Image from 'next/image'

type Props = {
    result: Result;
}

export default function Item({ result }: Props) {
    const thumbnail = result?.thumbnail?.source;
    const hasThumbnail = !!thumbnail;
    let content;

    const itemTextCol = (
        <div className="flex flex-col justify-center">
            <h2>
                <Link
                    href={`https://en.wikipedia.org/?curid=${result.pageid}`}
                    target='_blank'
                    className="text-xl font-bold underline"
                >
                    {result.title}
                </Link>
            </h2>
            <p>{result.extract}</p>
        </div>
    )

    if (hasThumbnail) {
        const { source, width, height } = result.thumbnail!;

        content = (
            <article className="m-4 max-w-lg">
                <div className="flex flex-row gap-4">
                    <div className="flex flex-col justify-center">
                        <Image
                            src={source}
                            alt={result.title}
                            width={width}
                            height={height}
                            loading='lazy'
                        />
                    </div>
                    {itemTextCol}
                </div>
            </article>
        );
    }
    else {
        content = (
            <article className="m-4 max-w-lg">
                {itemTextCol}
            </article>
        );
    }

    return content
}