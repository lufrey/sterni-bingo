import { BingoTable } from "@/components/BingoTable";
import { NameInputForm } from "@/components/NameInputForm";
import { NumberInputForm } from "@/components/NumberInputForm";
import { PreviousEntries } from "@/components/PreviousEntries";
import { bingos } from "@/data/bingos";
import { getBottleCapEntries } from "@/data/entries";
import { z } from "zod";

async function LoggedInState({ username }: { username: string }) {
    const entries = await getBottleCapEntries(username);
    return (
        <>
            <NumberInputForm />
            <PreviousEntries entries={entries} username={username} />
            <div className="flex flex-wrap justify-center gap-10">
                {bingos.map((bingo, index) => {
                    return (
                        <div key={index}>
                            <BingoTable
                                key={index}
                                bingo={bingo}
                                entries={entries}
                            />
                        </div>
                    );
                })}
            </div>
        </>
    );
}

export default async function Home({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const parsedUsername = z.string().safeParse(searchParams.username);

    return (
        <>
            <h1 className="text-3xl font-bold text-center pb-8">
                Sternburg Bingo
            </h1>
            {parsedUsername.success ? (
                <LoggedInState username={parsedUsername.data} />
            ) : (
                <NameInputForm />
            )}
        </>
    );
}
