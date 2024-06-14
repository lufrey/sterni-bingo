"use client";

import { Bingo } from "@/data/bingos";
import { Entry } from "@/db/schema";
import { useState } from "react";
import { BingoTable } from "./BingoTable";
import { bingos } from "@/data/bingos";

export function BingoOverview(props: {
    entries: Entry[];
    highestEntryCount: number;
}) {
    const [showFrequency, setShowFrequency] = useState(false);
    return (
        <div className="text-center">
            <label className="flex gap-2 cursor-pointer justify-center mb-8">
                <input
                    type="checkbox"
                    className=""
                    onChange={() => setShowFrequency((prev) => !prev)}
                    value={showFrequency ? "checked" : ""}
                />
                Frequenz anzeigen
            </label>
            <div className="flex flex-wrap justify-center gap-10">
                {bingos.map((bingo, index) => {
                    return (
                        <div key={index}>
                            <BingoTable
                                key={index}
                                bingo={bingo}
                                entries={props.entries}
                                highestEntryCount={props.highestEntryCount}
                                showFrequency={showFrequency}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
