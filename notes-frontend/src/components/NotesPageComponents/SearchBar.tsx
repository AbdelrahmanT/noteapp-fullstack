import React from "react";


type SearchBarProps ={
    query: string;
    setQuery: React.Dispatch<React.SetStateAction<string>>
}


export default function SearchBar({query, setQuery}: SearchBarProps){
    // const [query, setQuery] = React.useState("")

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const {value} = e.target

        setQuery(()=>value)
    }

    return <>
    
    <input
        type="text"
        name="query"
        id="searchBar"
        placeholder="Look up your notes here"
        value={query}
        onChange={handleChange}
    
    />
    
    </>
    
}