import {createFileRoute, redirect} from '@tanstack/react-router'
import {Button} from "#/components/ui/button.tsx";
import {useServerFn} from "@tanstack/react-start";
import {getSessionUserId, logoutFn} from "#/functions/password.ts";

export const Route = createFileRoute('/secret')({
    component: RouteComponent,
    beforeLoad: async ({location}) => {
        const userId = await getSessionUserId();

        if (!userId) {
            throw redirect({
                to: '/',
                search: {redirect: location.href},
            })
        }
    },
})

function RouteComponent() {
    const logoutFunction = useServerFn(logoutFn);

    return (
        <div className={"w-full p-4 flex flex-col gap-4 justify-center items-center"}>
            <h1 className={"font-black text-3xl"}>You're in!</h1>
            <Button onClick={() => void logoutFunction()}>Logout</Button>
            <img src={"/treasure.webp"} alt={"Image of a treasure.webp"} className={"aspect-square h-64"}/>
        </div>
    );
}
