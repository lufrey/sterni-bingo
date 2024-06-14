import { Bingo } from "@/data/bingos";
import { Entry } from "@/db/schema";
import { cn } from "@/lib/utils/cn";

function hasBingo(bingo: Bingo, values: number[]) {
    let validBottomLeftToTopRight = true;
    let validTopLeftToBottomRight = true;
    for (let i = 0; i < 5; i++) {
        let validRow = true;
        let validColumn = true;

        for (let j = 0; j < 5; j++) {
            validRow = validRow && values.includes(bingo[i][j]);
            validColumn = validColumn && values.includes(bingo[j][i]);
        }

        if (validColumn || validRow) return true;

        validBottomLeftToTopRight =
            validBottomLeftToTopRight && values.includes(bingo[4 - i][i]);
        validTopLeftToBottomRight =
            validTopLeftToBottomRight && values.includes(bingo[i][i]);
    }

    return validBottomLeftToTopRight || validTopLeftToBottomRight;
}

export function BingoTable(props: { bingo: Bingo; entries: Entry[] }) {
    const entryValues = props.entries.map((entry) => entry.value);
    return (
        <div className="font-mono text-xl">
            {hasBingo(props.bingo, entryValues) ? (
                <div className="text-center bg-red-700 text-white">BINGO!</div>
            ) : null}
            <table className="border-separate border-spacing-2 text-center">
                <tbody>
                    {props.bingo.map((row, rowIndex) => {
                        return (
                            <tr key={rowIndex}>
                                {row.map((cell, cellIndex) => {
                                    const highlighted =
                                        entryValues.includes(cell);
                                    return (
                                        <td
                                            key={cellIndex}
                                            className={cn(
                                                "size-8",
                                                highlighted &&
                                                    "bg-red-700 text-white"
                                            )}
                                        >
                                            {cell < 10 ? "0" + cell : cell}
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}
