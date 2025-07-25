'use client';

import { useState, FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { LinkType, Event } from "@/utils/interfaces";
import { client } from "@/utils/client";

const formSchema = z.object({
    type: z.number(),
    url: z.string() 
});
type FormSchemaType = z.infer<typeof formSchema>

type Props = {
    eventId: number,
    flag: boolean,
    setFlag: (flag: boolean) => void,
}

export const CreateEventLinkForm: FC<Props> = ({ eventId, flag, setFlag }) => {
    const [ linkTypes, setLinkTypes ] = useState<LinkType[]>();
    const [ message, setMessage ] = useState('');

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            type: 0,
            url: "",
        }
    });
    
    useEffect(() => {
        const fetchLinkTypes = async () => {
            try {
                const data = await client.getLinkTypes();
                setLinkTypes(data);
            } catch (error) {
                console.error("Can't get Link types:", error);
            }
        };
        fetchLinkTypes();
    }, []);

    const handleChangeLinkType = (value: string) => {
        form.setValue("type", Number(value));
    }

    async function onSubmit(values: FormSchemaType) {
        const status = await client.createEventLink(values.type, values.url, eventId,);
        switch (status) {
            case 201:
                form.reset({ type: 0, url: "" });
                setFlag(!flag); break;
            case 401: 
                setMessage("Unauthorized access."); break;
            case 404:
                setMessage("Not found."); break;
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
                className="flex flex-col min-w-[350px] w-1/2 bg-gray-200 rounded p-4"
            >
                {message && 
                    <Alert className="mb-4" variant="destructive">
                        <AlertTitle>{message}</AlertTitle>
                        <AlertDescription/>
                    </Alert>
                }
                <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                        <Select onValueChange={handleChangeLinkType}>
                            <SelectTrigger>
                                <SelectValue placeholder="Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                {linkTypes?.map((link) => (
                                    <SelectItem key={link.id} value={String(link.id)}>
                                        {link.title}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <FormDescription/>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Url</FormLabel>
                    <FormControl>
                        <Input placeholder="Url" {...field}/>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                    </FormItem>
                )}
                />   
                <div className="flex flex-row justify-center mt-2">
                    <Button type="submit">Create link</Button>
                </div>
            </form> 
        </Form>
    )
}