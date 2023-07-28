import { useReducer } from "react"
import { db, timestamp } from '../firebase/config'

import { storage } from "../firebase/config"

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
            return { isPending: false, document: action.payload, success: 'Documento adcionado com sucesso', error: null }
        case 'DELETED_DOCUMENT':
            return { isPending: false, document: null, success: 'Documento deletado com sucesso', error: null }
        case 'UPDATED_DOCUMENT':
            return { isPending: false, document: action.payload, success: 'Perfil atualizado com sucesso', error: null  }
        case 'ERROR':
            return { isPending: false, document: null, success: false, error: action.payload }
        default:
            return state
    }
}

export const usefirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)
    
    // collection refq
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
    dispatch({ type: 'IS_PENDING' });

    try {
      await ref.doc(id).delete();

      dispatch({ type: 'DELETED_DOCUMENT' });
    } catch (err) {
      dispatch({ type: 'ERROR', payload: 'Could not delete.' });
    }
  };

  // update a document
  const updateDocument = async (id, updates) => {
    dispatch({ type: 'IS_PENDING' });

    try {
      await ref.doc(id).update(updates);

      dispatch({ type: 'UPDATED_DOCUMENT' });

      return true;
    } catch (err) {

      dispatch({ type: 'ERROR', payload: 'Não foi possivel atualizar o perfil, tente novamente.' });

      console.log(err.message);
      return false;
    }
  };

  return { addDocument, deleteDocument, updateDocument, response };
};

export const uploadProfilePhoto = async (userId, profilePhoto) => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(`profile-photos/${userId}/profilePhoto`);
  
      const snapshot = await fileRef.put(profilePhoto);
      const downloadURL = await snapshot.ref.getDownloadURL();
  
      return downloadURL;
    } catch (error) {
      console.error('Error uploading profile photo:', error);
      return null;
    }
  };