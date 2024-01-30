import CreateChartForm from "@/components/forms/CreateChartForm"

import { getUserById } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";


async function Page() {
  // ...

  const user = await currentUser()
  const userInfo = await getUserById(user?.id ? user.id : '')

  console.log('user: ', userInfo);
    

    return (
        <CreateChartForm user={JSON.stringify(userInfo)} />
    )
}

export default Page