import { useState } from "react"
import { auth, db } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [success, setSuccess] = useState(null)


    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setError(null)
        setIsPending(true)
        setSuccess(null)

        // sign the use out
        try {
            const response = await auth.signInWithEmailAndPassword(email, password)

            if (!response) {
                throw new Error('Could not complete login')
            }
            if(response){
                setSuccess('Logado com sucesso.')
            }

             // update online status
             await db.collection('users').doc(response.user.uid).update({ online: true })

            // dispatch logout action
            dispatch({ type: 'LOGIN', payload: response.user })

            // update states
                setIsPending(false)
                setError(null)


        } catch (err) {
            console.log(err.message)

            if (err.message === 'The password is invalid or the user does not have a password.' || 'There is no user record corresponding to this identifier. The user may have been deleted.') {
                setError('Email ou senha inválidos.')
                
            }
            
            setIsPending(false)
            setSuccess(null)


        }
    }

    return { login, error, isPending, success }
}