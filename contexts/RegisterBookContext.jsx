import { createContext, useState } from "react";

export const BookValueContext = createContext();

export function BookValueContextProvider({ children }) {
    const [dataInputs, setDataInputs] = useState({
        internalCode: '',
        isbn: '',
        title: '',
        subtitle: '',
        genre: '',
        volume: '',
        edition: '',
        collection: '',
        language: '',
        synopsis: '',
        originCountry: '',
        author: '',
        authorLastName: '',
        publishingCompany: '',
        publishDate: '',
        pages: '',
        ageGroup: '',
        bookImage: '',
        bookSituation: ''
    })
    return (
        <BookValueContext.Provider value={{ dataInputs, setDataInputs }}>
            {children}
        </BookValueContext.Provider>
    )
}