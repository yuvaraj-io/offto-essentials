import Link from "next/link"

export default function TripEssential(){
    return (
     <>
        <section className="px-10 py-12 font-lato">

            <div className="grid grid-cols-2 gap-y-12 gap-x-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                
                <Link href="/trip-essentials/connectivity-and-sim-services">
                        <div className="flex flex-col items-center text-center">
                            <img src="/landing-page/sim-services.png" className="h-14 w-14" />
                            <p className="mt-3 w-32 text-sm text-gray-600">
                                Connectivity & SIM Services
                            </p>
                        </div>
                </Link>
                

                <div className="flex flex-col items-center text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full">
                    <img src="/landing-page/transport-and-mobility.png" className="" />
                </div>
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Transport & Mobility
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/landing-page/adventure-and-outgear.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Adventure & Outdoor Gear
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/landing-page/luggage-and-baggage.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Luggage and packing support
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/landing-page/photography.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Photography & videography Service
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/landing-page/local-guide-and-translator.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Local Guides & Translators
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/landing-page/forex-currency-services.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Forex & Currency Services
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/landing-page/camping.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Camping & Outdoor Setup Vendors
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/landing-page/travel.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Travel Insurance
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/landing-page/souveiner-and-local-craft.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Souvenir & Local Craft Stores
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/landing-page/courier-and-logistic.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Courier & Logistics Support
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/landing-page/wellness-and-spa.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Wellness & Relaxation
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/landing-page/vehicle-assistant-garages.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Vehicle Assistance & Garage Service
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/landing-page/events-and-celebrations.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Event & Celebration Partners
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/landing-page/permits-and-entry-services.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Permits & Entry Services
                </p>
                </div>

                <div className="flex flex-col items-center text-center">
                <img src="/landing-page/travel-consultants.png" className="h-14 w-14" />
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
                <img src="/landing-page/pet-friendly.png" className="h-14 w-14" />
                <p className="mt-3 w-32 text-sm text-gray-600">
                    Pet-Friendly Travel Essentials
                </p>
                </div>

            </div>

        </section>
     </>
    )

}