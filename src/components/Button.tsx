import { ComponentPropsWithoutRef } from "react";

export function Button(
    props: ComponentPropsWithoutRef<"button"> & { children?: React.ReactNode }
) {
    return (
        <button
            className="bg-red-700 text-white px-4 py-2 rounded-md hover:bg-red-800 transition-colors disabled:bg-red-400 disabled:cursor-not-allowed"
            {...props}
        >
            {props.children}
        </button>
    );
}
