import Link from "next/link"

export default function TripEssential(){
    return (
     <>
        <section className="px-10 py-12 font-lato">

            <div className="grid grid-cols-2 gap-y-12 gap-x-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                
                <Link href="/trip-essentials/connectivity-and-sim-services">
                        <div className="flex flex-col items-center text-center">
                            <img src="/icons/travel-insurance.png" className="h-14 w-14" />
                            <p className="mt-3 w-32 text-sm text-gray-600">
                                Connectivity & SIM Services
                            </p>
                        </div>
                </Link>
                

                <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow-400">
                    <img src="/icons/transport.png" className="h-7 w-7" />
                </div>
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Transport & Mobility
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/icons/adventure.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Adventure & Outdoor Gear
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/icons/luggage.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Luggage and packing support
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/icons/camera.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Photography & videography Service
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/icons/local-guide.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Local Guides & Translators
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/icons/forex.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Forex & Currency Services
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/icons/camping.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Camping & Outdoor Setup Vendors
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/icons/sim.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Travel Insurance
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/icons/store.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Souvenir & Local Craft Stores
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/icons/courier.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Courier & Logistics Support
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/icons/wellness.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Wellness & Relaxation
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/icons/vehicle.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Vehicle Assistance & Garage Service
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/icons/event.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Event & Celebration Partners
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/icons/permit.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Permits & Entry Services
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/icons/consultant.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Travel Consultants & Agents
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/icons/ticket.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Ticketing & Pass Services
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/icons/pet.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Pet-Friendly Travel Essentials
                </p>
                </div>

            </div>

        </section>
     </>
    )

}