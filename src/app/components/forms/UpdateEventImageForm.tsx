`use client`;

import { FC, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Event } from "@/app/data/interfaces";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { client } from "@/app/data/client";


const formSchema = z.object({
    image: z.union([
        z.instanceof(File).refine(file => file.size <= 2621440, {
            message: "Max acceptable size is 2.5MB."
        }),
        z.string().optional()
    ]).refine(value => value instanceof File || typeof value === "string")
    .optional()
});
type FormSchemaType = z.infer<typeof formSchema>;

type Props = { 
    event: Event,
    flag: boolean,
    setFlag: (flag: boolean) => void
}

export const UpdateEventImageForm: FC<Props> = ({ event, flag, setFlag }) => {
    const [ message, setMessage ] = useState('');
    
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            image: undefined
        }
    });

    function handleChangeFile(e: any) {   
        const file = e.target.files?.[0];
        if (file) form.setValue("image", file);
    };


    async function onSubmit(values: FormSchemaType) {
        const status = await client.changeEventImage(event.id, values.image);
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
                className="flex flex-col w-fit bg-gray-200 rounded space-x-4 p-4 w-full min-w-[350px]"
            >
                {message && 
                    <Alert className="mb-4" variant="destructive">
                        <AlertTitle>{message}</AlertTitle>
                        <AlertDescription/>
                    </Alert>
                }
                <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl>
                        <Input type="file" accept="image/*" onChange={handleChangeFile} />
                    </FormControl>
                    <FormDescription/>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className="flex flex-row justify-center mt-2">
                    <Button type="submit">Update image</Button>
                </div>
            </form>
        </Form>
    )

}