import { useEffect, useState } from "react"
import { auth, db } from "../firebase/config"
import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {
    const [isCanceled, setIsCanceled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const { dispatch, user } = useAuthContext()

    const logout = async () => {
        setError(null)
        setIsPending(true)

        // sign the use out
        try {
            // update online status
            const { uid } = user
            await db.collection('users').doc(uid).update({ online: false })

            await auth.signOut()

            // dispatch logout action
            dispatch({ type: 'LOGOUT' })

            // update states

                setIsPending(false)
                setError(null)


        } catch (err) {
          
                console.log(err.message)
                setError(err.message)
                setIsPending(false)
            
        }
    }



    return { logout, error, isPending }
}