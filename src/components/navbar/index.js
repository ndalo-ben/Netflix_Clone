"use client"

import { useSession } from 'next-auth/react'
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import Search from './search';
import { GlobalContext } from '@/context';
import AccountPopup from './account-popup';
import { signOut } from 'next-auth/react';
import CircleLoader from '../circle-loader';
export default function Navbar(){

    const {data: session} = useSession();
    const [isScrolled, setIsScrolled] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const [searchQuery, setSearchQuery] = useState('');
    const [showAccountPopup, setShowAccountPopup] = useState(false);

    const {setPageLoader, loggedInAccount, setAccounts, accounts, setLoggedInAccount, pageLoader} = useContext(GlobalContext);

    const menuItems = [
        {
            id : 'home',
            title : 'Home',
            path : '/browse'
        },
        {
            id : 'tv',
            title : 'TV',
            path : '/tv'
        },
        {
            id : 'movies',
            title : 'Movies',
            path : '/movies'
        },
        {
            id : 'my-list',
            title : 'My List',
            path : '/mylist'
        }
    ]

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }

            window.addEventListener('scroll', handleScroll);

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        }
    }, []);

    async function getAllAccounts() {
        const res = await fetch(
            `/api/account/get-all-accounts?id=${session?.user?.uid}`,
             { method: "GET",
             });

        const data = await res.json()

        console.log(data);

        if (data && data.data && data.data.length) {
            setAccounts(data.data)
            setPageLoader(false);
        } else {
            setPageLoader(false);
        }

    }

    useEffect(() => {
        getAllAccounts();
    }, []);

    if(pageLoader) return <CircleLoader />

    return <div className="relative">
        <header className={`header ${isScrolled && 'bg-[#141414]'} hover:bg-[#141414]`}>
            <div className='flex items-center space-x-2 md:space-x-10'>
                <Image src="/Netflix-logo.png" alt='logo' width={120} height={120} className="cursor-pointer object-contain" 
                onClick={() => router.push('/browse')}
                />
                <ul className='hidden space-x-4 md:flex cursor-pointer'>
                    {menuItems.map((item) => (
                        <li key={item.id} className='cursor-pointer text-[16px] font-light text-[#e5e5e5] transition duration-[-4s] hover:text-[#b3b3b3]' 
                        onClick={() => {
                            setPageLoader(true);
                            router.push(item.path)
                            setSearchQuery('')
                            setShowSearchBar(false)
                        }
                        }
                        >
                            {item.title}
                        </li>
                    ))}
                </ul>
            </div>
            <div className='flex items-center space-x-4 text-sm font-light'>
                {
                    showSearchBar ? (
                    <Search
                    pathname={pathname}
                    router={router}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    setPageLoader={setPageLoader}
                    setShowSearchBar={setShowSearchBar}
                    />
                    ) : (
                    <AiOutlineSearch 
                    onClick={() => setShowSearchBar(true)}
                    className='cursor-pointer hidden sm:inline sm:w-6 sm:h-6'
                    />
                    )}
                    <div onClick={() => setShowAccountPopup(!showAccountPopup)} className='flex gap-2 items-center cursor-pointer'>
                            <Image src="/netflix.png" alt='user' width={30} height={30} 
                            className='max-w-[30px] rounded min-w-[30px] max-h-[30px] min-h-[30px] object-cover w-[30px] h-[30px]'
                            />
                            <p className='font-semibold'>{loggedInAccount && loggedInAccount?.name}</p>
                    </div>
            </div>
        </header>
        {
            showAccountPopup && (
            <AccountPopup
            accounts={accounts}
            setPageLoader={setPageLoader}
            signOut={signOut}
            loggedInAccount={loggedInAccount}
            setLoggedInAccount={setLoggedInAccount}
            />
            )
        }
    </div>
}