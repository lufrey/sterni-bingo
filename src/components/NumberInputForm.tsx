"use client";
import { addEntry } from "@/app/actions";
import { useAction } from "next-safe-action/hooks";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import { Button } from "./Button";

export function NumberInputForm() {
    const searchParams = useSearchParams();
    const username = searchParams.get("username")!;
    const formRef = useRef<HTMLFormElement>(null);
    const { execute, isExecuting, result, hasErrored } = useAction(addEntry, {
        onSuccess: () => {
            formRef.current?.reset();
        },
        onError: (error) => {
            console.log(error);
            formRef.current?.reset();
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                const formdata = new FormData(e.target as HTMLFormElement);

                execute({
                    username,
                    value: formdata.get("bottleCapNumber") as unknown as number,
                });
            }}
            ref={formRef}
            className="pb-8 flex gap-2 flex-col items-center"
        >
            <input
                className="border-red-700 border-4 font-bold text-6xl rounded-full size-32 text-center"
                type="number"
                name="bottleCapNumber"
                placeholder="21"
                min={0}
                max={99}
                maxLength={2}
            ></input>
            <Button type="submit" disabled={isExecuting}>
                hinzufügen
            </Button>
            {hasErrored && result.validationErrors?.value ? (
                <>
                    {result.validationErrors.value._errors?.map((error) => (
                        <span key={error} className="text-red-700">
                            {error}
                        </span>
                    ))}
                </>
            ) : null}
        </form>
    );
}
