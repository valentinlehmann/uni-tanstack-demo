import {createFileRoute} from '@tanstack/react-router'
import {Input} from "#/components/ui/input.tsx";
import {Button} from "#/components/ui/button.tsx";
import {useState} from "react";
import {validatePassword} from "#/functions/password.ts";
import {useServerFn} from "@tanstack/react-start";

export const Route = createFileRoute('/')({component: Home})

function Home() {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const passwordFunction = useServerFn(validatePassword);

    return (
        <div className="p-8">
            <h1 className="text-4xl font-bold">Welcome to the Picture Stash!</h1>
            <p className="mt-4 text-lg">
                Enter the password below to gain access to the secret image.
            </p>
            {error && <p className="mt-4 text-red-500">{error}</p>}
            <div className={"mt-8 flex flex-row gap-4"}>
                <Input value={password} onChange={(event) => {
                    setPassword(event.target.value);
                }} type="password" placeholder="Enter password" className="max-w-64" />
                <Button className="" onClick={async () => {
                    setError("");
                    const result = await passwordFunction({data: {password}});

                    if (result.success) {
                        window.location.href = '/secret';
                    } else {
                        setError("Invalid password. Please try again.");
                    }
                }}>Submit</Button>
            </div>
        </div>
    )
}
