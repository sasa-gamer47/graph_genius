import { SignedIn, UserButton, currentUser } from "@clerk/nextjs";
import DropdownThemeSelector from "@/components/shared/DropdownThemeSelector";
import { getUserById } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";


const Topbar = async () => {
    const user = await currentUser()
    
    const userInfo = await getUserById(user?.id ? user.id : '')

    console.log('userInfo: ', userInfo)

    !userInfo || !userInfo.onboarded ? redirect('/onboarding') : ''
    console.log('user: ', user)

    return (
        <div className="fixed z-50 top-0 w-full h-20 flex bg-base-100 items-center justify-around shadow-lg">
            {/* bg-gradient-to-r from-blue-600 to-sky-400 */}
            <div className="w-4/12 h-full flex items-center justify-center">
                <div>
                    Logo
                </div>
            </div>
            <div className="w-full">

            </div>
            <div className="w-2/12 flex items-center justify-center">
                <DropdownThemeSelector />
            </div>
            <div className="w-1/12 h-full flex items-center justify-around">
                <div>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    {!user && (
                        <button>
                            Sign In
                        </button>
                    )}
                </div>
            </div> 
        </div>
    )
}

export default Topbar