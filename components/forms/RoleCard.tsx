"use client";
import React from 'react'
import { createUser, getUserById } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

interface Interface {
    role: string, 
    user: any,
}

const RoleCard = ({ role, user }: Interface)  => {

    const router = useRouter()


    console.log(user);
    


    return (
        <div className="card w-full bg-base-100 text-primary-content">
            <div className="card-body">
            <h2 className="card-title">{role}</h2>
            <p>Focus on your learning skills</p>
            <div className="card-actions justify-end">
                        <button className="btn"
                        //     onClick={async (e) => {
                        // const Role: string = role.split(' ')[0].toString()
                        

                    

                        // console.log(Role);
        
                        // console.log({
                        //     userId: user.userId,
                        //     username: user.username,
                        //     role: Role,
                        // })
                        // console.log(await getUserById(''), 'uiopè')

                        // const userInfo = await createUser({
                        //     userId: user.userId,
                        //     username: user.username,
                        //     role: Role,
                        // })

                        // console.log('User created successfully! \n\n', userInfo )
                        // redirect('/')
                    // }}

                        onClick={(e) => {
                            const Role: string = role.split(' ')[0].toString()

                            console.log(Role, user);

                            const params = {
                                role: Role,
                                userInfo: user,
                            }
                            

                            router.push(`/onboarding/save-user/role=${Role}&username=${JSON.parse(user).username}&userId=${JSON.parse(user).userId}`)
                        }}
                >
                    Register as a {role.split(' ')[0]} &rarr;
                </button>
            </div>
            </div>
        </div>
    )
}




export default RoleCard