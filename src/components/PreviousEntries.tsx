"use client";
import { deleteEntry } from "@/app/actions";
import { Entry } from "@/db/schema";

export function PreviousEntries(props: { entries: Entry[]; username: string }) {
    if (props.entries.length === 0) {
        return (
            <div className="flex font-mono justify-center pb-6">
                Keine Einträge vorhanden
            </div>
        );
    }

    return (
        <div className="flex gap-2 font-mono justify-center pb-6 flex-wrap">
            <span>Letze Einträge:</span>
            {props.entries.map((e) => (
                <button
                    key={e.id}
                    onClick={async () => {
                        deleteEntry(props.username, e.id);
                    }}
                    className="hover:text-red-700 cursor-pointer"
                >
                    {e.value}
                </button>
            ))}
        </div>
    );
}
