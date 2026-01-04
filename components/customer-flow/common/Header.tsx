export default function Header(){


    return (
        <header className="sticky top-0 z-50 border-b bg-white">
  
            <div className="border-b">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">

                <a href="https://offto.in/dashboard" className="flex items-center border-r pr-4">
                    <img
                    src="https://offto.in/assets_web/new/assets/img/logo.png"
                    alt="logo"
                    className="h-8"
                    />
                </a>

                <nav className="flex flex-1">
                    <ul className="flex w-full">

                    <li className="flex-1 border-r">
                        <a
                        href="https://offto.in/hotel"
                        className="flex items-center gap-3 px-3 py-2 md:justify-center"
                        >
                        <img
                            src="https://offto.in/assets_web/new/assets/img/hotel.png"
                            className="h-6 w-6"
                            alt="Hotels"
                        />
                        <div>
                            <div className="text-sm font-bold">Hotels</div>
                            <div className="text-xs text-gray-500">
                            Best stays, best rates
                            </div>
                        </div>
                        </a>
                    </li>

                    <li className="flex-1 border-r">
                        <a
                        href="#"
                        className="flex items-center gap-3 px-3 py-2 md:justify-center"
                        >
                        <img
                            src="https://offto.in/assets_web/new/assets/img/holiday.png"
                            className="h-6 w-6"
                            alt="Holidays"
                        />
                        <div>
                            <div className="text-sm font-bold">Holidays</div>
                            <div className="text-xs text-gray-500">
                            Holiday more, spend less
                            </div>
                        </div>
                        </a>
                    </li>

                    <li className="flex-1 border-r">
                        <a
                        href="#"
                        className="flex items-center gap-3 px-3 py-2 md:justify-center"
                        >
                        <img
                            src="https://offto.in/assets_web/new/assets/img/activ.png"
                            className="h-6 w-6"
                            alt="Activities"
                        />
                        <div>
                            <div className="text-sm font-bold">Activities</div>
                            <div className="text-xs text-gray-500">
                            Thrills at the best price
                            </div>
                        </div>
                        </a>
                    </li>
                    </ul>
                </nav>

                <div className="flex items-center px-4">
                    <a href="#" className="flex items-center gap-3">
                    <img
                        src="https://offto.in/assets_web/new/assets/img/world.png"
                        alt="world"
                        className="h-6 w-6"
                    />
                    <div className="hidden text-xs text-gray-500 md:block">
                        Discover our social <br />
                        space, & connect with <br />
                        travelers
                    </div>
                    </a>
                </div>

                <div className="ml-4 flex flex-col items-center gap-2">
                    <a href="#">
                    <img
                        src="https://offto.in/assets_web/new/assets/img/suitcase.png"
                        className="h-6 w-6"
                        alt="suitcase"
                    />
                    </a>
                    <a href="#">
                    <img
                        src="https://offto.in/assets_web/new/assets/img/chat.png"
                        className="h-6 w-6"
                        alt="chat"
                    />
                    </a>
                </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-2">
                <div className="flex justify-end">
                <button
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-black"
                >
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    </svg>
                    Login / Signup
                </button>
                </div>
            </div>
        </header>
    )
}