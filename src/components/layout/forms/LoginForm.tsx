'use client';

import { useState, FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { client } from "@/utils/client";
import { useRouter } from "next/navigation";


const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 8 characters."
    }).max(50, {
        message: "Username could have maximum 50 characters."
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters."
    })
})

type FormSchemaType = z.infer<typeof formSchema>


export const LoginForm: FC = () => {
    const router = useRouter();
    const [ message, setMessage ] = useState('');

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "" ,
            password: ""
        }
    });

    async function onSubmit(values: FormSchemaType) {
        const token = await client.logIn(values.username, values.password)
        
        if (token == null) {
            setMessage("User with this password doesn't exists.");
        } else {
            router.refresh();
        }
        setTimeout(() => { setMessage('') }, 10000);
    }

    return (
        <Form {...form}>
            {message && 
                <Alert className="mb-4" variant="destructive">
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        {message}
                    </AlertDescription>
                </Alert>
            }
            <form onSubmit={form.handleSubmit(onSubmit)} className="min-w-[300px] space-y-4">
                <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                        <Input placeholder="Type username" {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                            <Input placeholder="Type password" type="password" {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Log in</Button>
            </form> 
            
        </Form>

    )
}