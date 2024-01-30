
import React, { useState } from 'react'
import { currentUser } from "@clerk/nextjs";
import { createUser, getUserById } from "@/lib/actions/user.actions";
import { getChartById } from '@/lib/actions/chart.actions';
import { redirect } from "next/navigation";
import RoleCard from '@/components/forms/RoleCard';


async function Page() {

    // const [role, setRole] = useState('other')
    
    const user = await currentUser()

    if (!user) return null;

    const roles = ['Student 🎓', 'Teacher 🧑‍🏫', 'Statistical 📊', 'Other']

    const userInfo = {
        userId: user.id,
        username: user.username || user.firstName || ((Math.random() * 10**20).toString() + '_user'),
    }
    

    // console.log(await getUserById(''), 'uiopè')
    
    return (
        <>
            <main className='absolute top-0 bottom-0 left-0 right-0'>
                <div className='flex items-center justify-center w-full h-full'>
                    <div className='bg-base-200 w-1/2 h-4/6 rounded-lg shadow-lg flex flex-col items-center'>
                        <h1 className='text-center mt-5 font-extrabold text-2xl'>Choose your role</h1>  
                        <div className='w-full h-full mt-5 gap-2 p-2 grid grid-rows-2 grid-cols-2 overflow-hidden'>
                            {roles.map((role, index) => (
                                <RoleCard key={index} role={role} user={JSON.stringify(userInfo)} />
                        
                            ))}
                        

                        </div>
                    </div>
                
                </div>

            </main>
        </>
    );
}

export default Page

