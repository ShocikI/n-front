'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { client } from "@/app/_data/client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
    avatar: z.union([
        z.instanceof(File).refine(file => file.size <= 2621440, {
            message: "Max acceptable size is 2.5MB."
        }),
        z.string().optional()
    ]).refine(value => value instanceof File || typeof value === "string")
    .optional()
});
type FormSchemaType = z.infer<typeof formSchema>;

type Props = {
    username?: string,
    flag: boolean,
    setFlag: (flag: boolean) => void,
}

export const UpdateUserAvatarForm: FC<Props> = ({ username, flag, setFlag }) => {
    const [ message, setMessage ] = useState('');

    const form = useForm<FormSchemaType>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                avatar: undefined
            }
        });

    function handleChangeFile(e: any) {   
        const file = e.target.files?.[0];
        if (file) form.setValue("avatar", file);
    };

    async function onSubmit(values: FormSchemaType) {
        const status = await client.changeUserAvatar(username, values.avatar);
        switch (status) {
            case 200:
                setFlag(!flag); break;
            case 401: 
                setMessage("Unauthorized access."); break;
            case 404:
                setMessage("Unsuccessful update"); break;
            case 500:
                setMessage("Server issue."); break;
            default:
                setMessage("Unpredicted error."); break;
            };
                
        setTimeout(() => { setMessage('') }, 10000);
    }  

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col w-fit bg-gray-200 rounded space-x-4 p-4 min-w-[350px]"
            >
                {message && 
                    <Alert className="mb-4" variant="destructive">
                        <AlertTitle>{message}</AlertTitle>
                        <AlertDescription/>
                    </Alert>
                }
                <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Avatar</FormLabel>
                    <FormControl>
                        <Input type="file" accept="image/*" onChange={handleChangeFile}/>
                    </FormControl>
                    <FormDescription/>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className="flex flex-row justify-center mt-2">
                    <Button type="submit">Update avatar</Button>
                </div>
            </form>

        </Form>
    )
}