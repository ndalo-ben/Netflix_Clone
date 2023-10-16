"use client"

import CommonLayout from '@/components/common-layout'
import ManageAccounts from '@/components/manage-accounts'
import UnauthPage from '@/components/unauth-page/index'
import { GlobalContext } from '@/context'
import { useSession} from 'next-auth/react'
import { useContext } from 'react'

export default function Movies(){
    const {loggedInAccount} = useContext(GlobalContext)

    const {data: session} = useSession()
    if(session === null) return <UnauthPage />
    if(loggedInAccount === null) return <ManageAccounts />;

    return <main className='flex min-h-screen flex-col'>
        <CommonLayout mediaData={[]}/>
    </main>
}