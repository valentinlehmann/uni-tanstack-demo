import {createServerFn} from "@tanstack/react-start";
import {useAppSession} from "#/utils/session.ts";
import {redirect} from "@tanstack/react-router";

export const validatePassword = createServerFn({ method: 'POST' })
    .inputValidator((data: { password: string }) => data)
    .handler(async ({ data }) => {
        if (data.password === "top-secret") {
            const session = await useAppSession();
            await session.update({userId: "secret-user"});

            return { success: true };
        } else {
            return { success: false };
        }
    });

export const logoutFn = createServerFn({ method: 'POST' }).handler(async () => {
    const session = await useAppSession()
    await session.clear()
    throw redirect({ to: '/' })
})