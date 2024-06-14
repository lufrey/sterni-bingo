"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "./Button";

export function NameInputForm() {
    const router = useRouter();
    const pathname = usePathname();
    return (
        <div className="text-center">
            <h2 className="text-xl">Was ist dein Nutzername?</h2>
            <small>
                Diesen Namen brauchst du, um später und auf anderen Geräten
                deine Einträge zu bearbeiten
            </small>
            <form
                className="flex gap-2 justify-center pt-8"
                onSubmit={(e) => {
                    const formdata = new FormData(e.target as HTMLFormElement);
                    const username = formdata.get("username");
                    e.preventDefault();
                    router.push(`${pathname}?username=${username}`);
                }}
            >
                <input
                    className="border-red-700 border-2 rounded-md p-2"
                    type="text"
                    placeholder="lukas"
                    name="username"
                ></input>
                <Button type="submit">wählen</Button>
            </form>
        </div>
    );
}
