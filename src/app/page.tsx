import { BingoOverview } from "@/components/BingoOverview";
import { BingoTable } from "@/components/BingoTable";
import { NameInputForm } from "@/components/NameInputForm";
import { NumberInputForm } from "@/components/NumberInputForm";
import { PreviousEntries } from "@/components/PreviousEntries";
import { getBottleCapEntries } from "@/data/entries";
import { z } from "zod";

async function LoggedInState({ username }: { username: string }) {
    const entries = await getBottleCapEntries(username);
    const entryCounts = entries.reduce((acc, entry) => {
        acc[entry.value] = (acc[entry.value] || 0) + 1;
        return acc;
    }, {} as { [key: number]: number });
    const highestEntryCount = Math.max(...Object.values(entryCounts));

    return (
        <>
            <NumberInputForm />
            <PreviousEntries entries={entries} username={username} />
            <BingoOverview
                entries={entries}
                highestEntryCount={highestEntryCount}
            />
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
