
import { useState } from "react"
import { db } from "../firebase/config"
import { useEffect } from "react"

export const useDocument = (collection, id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)

    // realtime data for document
    useEffect(() => {
        const ref = db.collection(collection).doc(id)

        const unsub = ref.onSnapshot((snapshot) => {

            if (snapshot.data()) {
                setDocument({...snapshot.data(), id: snapshot.id})
                setError(null) 
            }else{
                setError('no such project exists')
            }

        }, (err) => {
            console.log(err.message)
            setError('Failed to get document')
        })

        return () => unsub()
    
        
    }, [document, id])

    return { document, error }

}