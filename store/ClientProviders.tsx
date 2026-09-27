"use client"

import { ReactNode, useRef } from "react";
import { store } from "./store";
import { setInitialView } from "./viewSlice";
import { Provider } from "react-redux";

interface ClientProvidersProps {
    children: ReactNode
    initialView: "tasks" | "notes"
}

export const ClientProviders = ({ children, initialView }: ClientProvidersProps) => {
    const isInitialized = useRef(false);

    if (!isInitialized.current) {
        store.dispatch(setInitialView(initialView));
        isInitialized.current = true;
    }

    return <Provider store={store}>{children}</Provider>
}