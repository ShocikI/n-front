'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import { client } from "@/app/data/client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
    description: z.string().max(2048, "Description is too long. Max 2048 characters."),
});
type FormSchemaType = z.infer<typeof formSchema>;

type Props = {
    username?: string,
    description?: string,
    flag: boolean,
    setFlag: (flag: boolean) => void,
}

export const UpdateUserDescriptionForm: FC<Props> = ({ username, description, flag, setFlag }) => {
    const [ message, setMessage ] = useState('');

    const form = useForm<FormSchemaType>({
            resolver: zodResolver(formSchema),
            defaultValues: {
                description: description || ""
            }
        });

    useEffect(() => {
        if (description) {
            form.reset({ description });
        }
    }, [description, form]);

    async function onSubmit(values: FormSchemaType) {
        const status = await client.changeUserDescription(username, values.description);
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
                className="flex flex-col w-fit bg-gray-200 rounded space-x-4 p-4"
            >
                {message && 
                <Alert className="mb-4" variant="destructive">
                    <AlertTitle>{message}</AlertTitle>
                    <AlertDescription/>
                </Alert>
                }
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea {...field} className="min-w-[350px]"/>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                    </FormItem>
                )}
                />   
                <div className="flex flex-row justify-center mt-2">
                    <Button type="submit">Update description</Button>
                </div>
            </form>

        </Form>
    )
}