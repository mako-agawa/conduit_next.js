import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
            <nav className="bg-slate-50">
                <div className="flex px-12 py-4 justify-between items-center">
                <Link className="text-green-500 text-3xl" href="/">
                    conduit
                </Link>
                    
                    <ul className="flex ">
                        <li className="pr-4">

                            <a className="nav-link active" href="/">Home</a>
                        </li>
                        <li className="pr-4">
                            <a className="nav-link" href="/login">Sign in</a>
                        </li>
                        <li className="">
                            <a className="nav-link" href="/register">Sign up</a>
                        </li>
                    </ul>
                </div>
            </nav>
    )
}

export default Header