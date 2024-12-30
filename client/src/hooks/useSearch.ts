import {useSearchParams} from "react-router-dom";
import {useCallback} from "react";

interface SearchFilter {
    search: string;
}

export function useSearch() {
    const [searchParams, setSearchParams] = useSearchParams();

    const search = searchParams.get("search") as string || "";

    const setSearch = useCallback((filter: SearchFilter) => {
        setSearchParams((params) => {
            if (filter.search !== "") {
                params.set("search", filter.search);
            } else {
                params.delete("search");
            }

            return params;
        });
    }, []);

    return {
        search,
        setSearch
    };
}