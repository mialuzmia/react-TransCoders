import { useEffect, useRef, useState } from "react"

import { db } from "../firebase/config"

export const useCollection = (collection, _query, _orderby) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    const query = useRef(_query).current
    const orderBy = useRef(_orderby).current


    useEffect(() => {
        let ref = db.collection(collection)

        if (query) {
            ref = ref.where(...query)
        }
        
        if(orderBy){
            ref = ref.orderBy(...orderBy)
        }

        const unsub = ref.onSnapshot((snapshot) => {
            let results = []
            snapshot.docs.forEach((doc) => {

                results.push({ ...doc.data(), id: doc.id })
            })

            setDocuments(results)

            setError(null)

        },(error) => {
            console.log(error)
            setError('Could not fetch the data.')
        })
    
        return () => unsub()
        
    }, [collection, query, orderBy]);

    return { documents, error }
}