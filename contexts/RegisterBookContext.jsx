import { createContext, useState } from "react";

export const BookValueContext = createContext();

export function BookValueContextProvider({ children }) {
    const [dataInputs, setDataInputs] = useState({
        internalCode: null,
        isbn: null,
        title: null,
        subtitle: null,
        genre: null,
        volume: null,
        edition: null,
        collection: null,
        language: null,
        synopsis: null,
        originCountry: null,
        author: null,
        authorLastName: null,
        publishingCompany: null,
        publishDate: null,
        pages: null,
        ageGroup: null,
        bookImage: null,
        bookSituation: 'Livre'
    })
    return (
        <BookValueContext.Provider value={{ dataInputs, setDataInputs }}>
            {children}
        </BookValueContext.Provider>
    )
}