'use client';

import { useState, FC } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { client } from "@/app/data/client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 8 characters."
    }).max(50, {
        message: "Username could have maximum 50 characters."
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters."
    }),
    rePassword: z.string().min(8),
    email: z.string().email().min(6),
})
.refine((data) => data.password == data.rePassword, {
    message: "Passwords don't match",
    path: ["rePassword"]
})
type FormSchemaType = z.infer<typeof formSchema>

export const RegistrationForm: FC = () => {
    const [message, setMessage] = useState('');

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
            rePassword: "",
            email: ""
        }
    });

    async function onSubmit(values: FormSchemaType) {
        const status = await client.createUser(values.username, values.email, values.password);
        
        switch (status) {
            case 201:
                setMessage("User registered."); break;
            case 400:
                setMessage("User already exists!"); break;
            default:
                setMessage("Unpredicted error"); break;
            };
        
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
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="Type email" {...field} />
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
                <FormField
                control={form.control}
                name="rePassword"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Confirm password</FormLabel>
                        <FormControl>
                            <Input placeholder="Confirm password" type="password" {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                    </FormItem>
                )}
                />
                <Button type="submit">Register in</Button>
            </form> 
            
        </Form>

    )

}
//     const [ username, setUsername ] = useState('');
//     const [ password, setPassword ] = useState('');
//     const [ rePassword, setRePassword ] = useState('');
//     const [ email, setEmail ] = useState('');
//     const [ message, setMessage ] = useState('');

//     const onChangeUsername = (e: any) => setUsername(e.target.value);
//     const onChangePassword = (e: any) => setPassword(e.target.value);
//     const onChangeRePassword = (e: any) => setRePassword(e.target.value);
//     const onChangeEmail = (e: any) => setEmail(e.target.value);

//     const errorStyles = 'border-red-600 border-4'

//     const handleSubmit = async (e: any) => {
//         e.preventDefault();
//         const status = await client.createUser(username, email, password);
        
//         switch (status) {
//             case 201:
//                 setMessage("User registered."); break;
//             case 400:
//                 setMessage("User already exists!"); break;
//             default:
//                 setMessage("Unpredicted error"); break;
//             };
        
//         setTimeout(() => { setMessage('') }, 10000);
//     }

//     return (
//         <form className="flex flex-col p-10 bg-white/30 rounded-2xl" method="POST" onSubmit={handleSubmit}>
//             <p className={clsx("w-full text-center mb-5 font-medium underline", !message && "hidden")}>{message}</p>
//             <input className="input label p-2 my-2" 
//                 name="username" type="text" placeholder="Type username" required
//                 onChange={onChangeUsername} autoComplete="off"
//             />
//             <input className={clsx("input label p-2 my-2", email && !email.includes("@") && errorStyles)}
//                 name="email" type="text" placeholder="Type email" required
//                 onChange={onChangeEmail} autoComplete="off"
//             />
//             <input className="input label p-2 my-2" 
//                 name="password" type="password" placeholder="Type password" required
//                 onChange={onChangePassword} autoComplete="off"
//             />
//             <input className={clsx("input label p-2 my-2", password && password!=rePassword && errorStyles)}
//                 name="rePassword" type="password" placeholder="Retype password" required
//                 onChange={onChangeRePassword} autoComplete="off"
//             />
//             <input className="btn btn-primary p-2 my-2 font-extrabold" type="submit" value='Sign up'/>
//         </form>
//     )
// }