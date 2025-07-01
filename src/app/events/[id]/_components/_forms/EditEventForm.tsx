'use client';

import { useState, FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Event } from "@/app/_data/interfaces";
import { client } from "@/app/_data/client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    description: z.string().max(2048, {
        message: "Description is too long, max 2048 characters."
    }).optional(),
    price: z.preprocess((val) => Number(val), z.number()
        .nonnegative("Price can't be negative."))
        .optional(),
    avaliable_places: z.preprocess((val) => Number(val), z.number()
        .int("It should be an intiger.")
        .nonnegative("There can't be negative amount of avaliable places.")
    ).optional(),
});
type FormSchemaType = z.infer<typeof formSchema>

type Props = {
    event: Event
}

export const EditEventForm: FC<Props> = ({ event }) => {
    const router = useRouter();
    const [ message, setMessage ] = useState('');
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: event?.description || "",
            price: event?.price || 0,
            avaliable_places: event?.avaliable_places || 0, 
        }
    });

    async function onSubmit(values: FormSchemaType) {
        const status = await client.updateEvent(
            event.id,
            values.description, 
            `${values.price}`, 
            `${values.avaliable_places}`
        )

        switch (status) {
            case 201:
                router.push("/")
            case 401: 
                setMessage("Unauthorized access."); break;
            case 500:
                setMessage("Server issue.")
            default:
                setMessage("Unpredicted error."); break;
            };

            setTimeout(() => { setMessage('') }, 10000);
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} 
            className="bg-gray-200 rounded p-4">
                <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea {...field} />
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                    </FormItem>
                )}
                />   
                <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                        <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                        If admission is free, leave 0.
                    </FormDescription>
                    <FormMessage />
                    </FormItem>
                )}
                /> 
                <FormField
                control={form.control}
                name="avaliable_places"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Avaliable places</FormLabel>
                    <FormControl>
                        <Input type="number" {...field} />
                    </FormControl>
                    <FormDescription>
                        If there is no limitation of seats, leave 0.
                    </FormDescription>
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