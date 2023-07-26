import { useReducer } from "react"
import { db, timestamp } from '../firebase/config'

let initialState = {
    document: null,
    isPending: false, 
    error: null,
    success:null
}

const firestoreReducer = (state, action) => {
    switch (action.type) {
        case 'IS_PENDING':
            return { isPending: true, document: null, success: null, error: null }
        case 'ADDED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null }
        case 'DELETED_DOCUMENT':
            return { isPending: false, document: null, success: true, error: null }
        case 'UPDATED_DOCUMENT':
            return { isPending: false, document: action.payload, success: true, error: null  }
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state
    }
}

export const usefirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    
    // collection ref
    const ref = db.collection(collection)

    // add a document
    const addDocument = async (doc) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            const createdAt = timestamp.fromDate(new Date())

            await ref.add({...doc, createdAt: createdAt})

            dispatch({ type: 'ADDED_DOCUMENT' })
            
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.message })
        }
    }

    // delete a document
    const deleteDocument = async (id) => {
        dispatch({ type: 'IS_PENDIND' })

        try {
            const deletedDocument = await ref.doc(id).delete()

            dispatch({ type: 'DELETED_DOCUMENT', payload: deletedDocument })
        } catch (err) {
            dispatch({ type: 'ERROR', payload: 'Could not delete.' })
        }
    }

    // update a documents
    const updateDocument = async (id, updates) => {
        dispatch({ type: 'IS_PENDING' })

        try {
            const updatedDocument= await ref.doc(id).update(updates)

            dispatch({ type: 'UPDATED_DOCUMENT', payload: updatedDocument })

            return updateDocument

        } catch(err) {
            dispatch({ type: 'ERROR', payload: err.message })
            return null
        }
    }

    return { addDocument, deleteDocument, updateDocument, response }
}