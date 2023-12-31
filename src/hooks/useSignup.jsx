import { useState } from "react"

import { auth } from "../firebase/config"

import { storage } from "../firebase/config"

import { db } from "../firebase/config"

import { useAuthContext } from '../hooks/useAuthContext'


export const useSignup = () => {
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName, profilePhoto) => {
        setError(null)
        setSuccess(null)
        setIsPending(true)

        try {
            // signup user
            const response = await auth.createUserWithEmailAndPassword(email, password)

        
            if (!response) {
                throw new Error('Could not complete signup')
            }
            if(response){
                setSuccess('Usuário criado com sucesso.')
            }

            // upload profilePhoto
            const uploadPath = `profile-photos/${response.user.uid}/profilePhoto`
            const img = await storage.ref(uploadPath).put(profilePhoto)
            const imgUrl = await img.ref.getDownloadURL()



            // add display name to user
            await response.user.updateProfile({ displayName: displayName, photoURL: imgUrl })

            // create a user doc
            await db.collection('users').doc(response.user.uid).set({
                displayName: displayName, 
                lowerCaseName: displayName.toLowerCase(),
                photoURL: imgUrl,
                bio: '',
                emailContato: null,
                linkedinURL: null,
                githubURL: null,
                githubUsername: null,
                telefone: null,
                languages: [],
                fazFreelance: false,
                buscaEmpregoComo: ''                
            })

            //dispatch login action
            dispatch({ type: 'LOGIN', payload: response.user })

            // update states
            setIsPending(false)
            setError(null)
                
            
        } catch (err) {

                console.log(err.message)
                
                if (err.message === 'Password should be at least 6 characters') {
                    setError('A senha precisa ter ao menos 6 caracteres.')
        
                }
                else if(err.message === 'The email address is badly formatted.') {
                    setError('Insira um email válido.')
                }
                else if(err.message === 'The email address is already in use by another account.') {
                    setError('Email já cadastrado.')
                }
                else{
                    setError('Email ou senha inválidos, tente novamente.')
                }
                setIsPending(false)
                setSuccess(null)
                
        }
    }



    return {error, isPending, signup, success}
}