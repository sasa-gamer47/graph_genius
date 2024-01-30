
import React, { useState } from 'react'
import { currentUser } from "@clerk/nextjs";
import { createUser, getUserById } from "@/lib/actions/user.actions";
import { getChartById } from '@/lib/actions/chart.actions';
import { redirect  } from "next/navigation";
import RoleCard from '@/components/forms/RoleCard';


async function Page(params: any) {

    
        const role = params.params.params.split('role%')[1].split('%')[0].split('3D')[1]
        
        // const userInfo = {
        //     username: params.params.params.split('username%')[1].split('%')[0].split('3D')[1],
        //     userId: params.params.params.split('userId%')[1].split('3D')[1],
        //     role,
        // }
    

        // console.log('Role:', role);
    // console.log('userInfo:', userInfo);
    
    const newUser = await createUser({
        username: params.params.params.split('username%')[1].split('%')[0].split('3D')[1],
        userId: params.params.params.split('userId%')[1].split('3D')[1],
        role,
    })

    redirect('/')
    
        



    
    return (
        <>
        
        </>
    );
}

export default Page;