import getWikiResults from "@/lib/getWikiResults"
import Item from "./components/Item"

type Props = {
    params: {
        searchTerm: string;
    }
}

export async function generateMetadata({ params: { searchTerm } }: Props) {
    const wikiResultsData: Promise<SearchResult> = getWikiResults(searchTerm)
    const wikiResults = await wikiResultsData
    const displayTerm = searchTerm.replace('%20', ' ');

    if (!wikiResults?.query?.pages) {
        return {
            title: `${displayTerm} Not Found`,
        }
    }

    return {
        title: displayTerm,
        description: `Search results for ${searchTerm}`,
    }
}

const SearchProps = async ({ params: { searchTerm } }: Props) => {
    const wikiResultsData: Promise<SearchResult> = getWikiResults(searchTerm)
    const wikiResults = await wikiResultsData
    const results: Result[] | undefined = wikiResults?.query?.pages
    const displayTerm = searchTerm.replace('%20', ' ');

    const content = (
        <main className="bg-slate-200 mx-auto max-w-lg py-1 min-h-screen">
            {
                results
                    ? Object.values(results).map((result) => (
                        <Item
                            key={result.pageid}
                            result={result}
                        />
                    ))
                    : <h2 className="p-2 text-xl">{displayTerm} was not found</h2>
            }
        </main>
    )
    return content;
}

export default SearchProps