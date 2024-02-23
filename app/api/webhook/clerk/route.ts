// /* eslint-disable camelcase */
// // Resource: https://clerk.com/docs/users/sync-data-to-your-backend
// // Above article shows why we need webhooks i.e., to sync data to our backend

// // Resource: https://docs.svix.com/receiving/verifying-payloads/why
// // It's a good practice to verify webhooks. Above article shows why we should do it
// import { Webhook, WebhookRequiredHeaders } from "svix";
// import { headers } from "next/headers";

// import { IncomingHttpHeaders } from "http";

// import { NextResponse } from "next/server";
// import {
//     createUser, deleteUserById
// } from "@/lib/actions/user.actions";

// // Resource: https://clerk.com/docs/integration/webhooks#supported-events
// // Above document lists the supported events
// type EventType =
//     | "user.created"
//     | "user.deleted"



// type Event = {
//     data: Record<string, string | number | Record<string, string>[]>;
//     object: "event";
//     type: EventType;
// };

// export const POST = async (request: Request) => {

//     console.log('webhook started');
    
    

//     const payload = await request.json();
//     const header = headers();

//     const heads = {
//         "svix-id": header.get("svix-id"),
//         "svix-timestamp": header.get("svix-timestamp"),
//         "svix-signature": header.get("svix-signature"),
//     };

//     console.log('Incoming Request Headers:', request.headers);


//     // Activitate Webhook in the Clerk Dashboard.
//     // After adding the endpoint, you'll see the secret on the right side.
//     const wh = new Webhook(process.env.NEXT_CLERK_WEBHOOK_SECRET || "");

//     let evnt: Event | null = null;

//     try {
//         evnt = wh.verify(
//         JSON.stringify(payload),
//         heads as IncomingHttpHeaders & WebhookRequiredHeaders
//       ) as Event;
      
//       console.log('payload success');
      
//     } catch (err) {
//       console.log('payload failure');
      
//         return NextResponse.json({ message: err }, { status: 400 });
//     }

//     const eventType: EventType = evnt?.type!;

//   // Listen organization creation event
//     if (eventType === "user.created") {
//     // Resource: https://clerk.com/docs/reference/backend-api/tag/Organizations#operation/CreateOrganization
//     // Show what evnt?.data sends from above resource
//         const { id, username } =
//             evnt?.data ?? {};

//         console.log('params: ', id, username);
        
        
//         try {
//         // @ts-ignore
//             await createUser(
//                 // @ts-ignore
//                 {
//                     userId: id,
//                     username,
//                 })

//             return NextResponse.json({ message: "User created" }, { status: 201 });
//         } catch (err) {
//             console.log(err);
//             return NextResponse.json(
//                 { message: "Internal Server Error" },
//                 { status: 500 }
//             );
//         }
//     }



//     if (eventType === "user.deleted") {
//     // Resource: https://clerk.com/docs/reference/backend-api/tag/Organizations#operation/CreateOrganization
//     // Show what evnt?.data sends from above resource
//         const { id, username } =
//             evnt?.data ?? {};

//         console.log('params: ', id, username);
        
        
//         try {
//         // @ts-ignore
//             await deleteUserById(
//                 // @ts-ignore
//                 {
//                     userId: id,
//                 })

//             return NextResponse.json({ message: "User deleted" }, { status: 201 });
//         } catch (err) {
//             console.log(err);
//             return NextResponse.json(
//                 { message: "Internal Server Error" },
//                 { status: 500 }
//             );
//         }
//     }

// };

import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser } from '@/lib/actions/user.actions'
import { clerkClient } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {

  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }

  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === 'user.created') {
    const { id, username } = evt.data;

    const user = {
      userId: id,
      username: username!,
      role: 'Student', // Default to Student
    };

    let newUser: any;
    try {
      newUser = await createUser(user);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message: 'Error creating user' });
    }

    if (newUser) {
      try {
        const updateResult = await clerkClient.users.updateUserMetadata(id, {
          publicMetadata: {
            userId: newUser._id,
          },
        });
        if (!updateResult) {
          throw new Error('Error updating metadata');
        }
      } catch (error) {
        console.error(error);
        return NextResponse.json({ message: 'Error updating metadata' });
      }

      return NextResponse.json({ message: 'OK', user: newUser });
    }
  }


}
