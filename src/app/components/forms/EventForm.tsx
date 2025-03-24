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
import { DatePicker } from "../timepicker/DatePicker";
import { Textarea } from "@/components/ui/textarea";
import { GoogleMaps } from "../GoogleMaps";

const formSchema = z.object({
    title: z.string().max(128, {
        message: "Title is too long. Max 128 characters."
    }),
    date: z.date(),
    address: z.string().max(255, {
        message: "Address is too long. Max 255 characters"
    }),
    location: z.object({
        latitude: z.number(),
        longitude: z.number(),
      }),
    description: z.string().max(2048, {
        message: "Description is too long, max 2048 characters"
    }),
    price: z.preprocess((val) => Number(val), z.number().nonnegative()),
    avaliablePlaces: z.preprocess((val) => Number(val), z.number()
        .int("It should be an intiger")
        .nonnegative("It should be not negative number")
    ),

});
type FormSchemaType = z.infer<typeof formSchema>

export const EventForm: FC = () => {
    const [message, setMessage] = useState('');

    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            date: new Date(),
            address: "",
            location: {
                latitude: 0.0,
                longitude: 0.0
            },
            description: "",
            price: 0,
            avaliablePlaces: 0,
        }
    });
    async function onSubmit(values: FormSchemaType) {
        console.log(values);
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-row">
                <section className="flex flex-col space-y-2 mr-8">
                    <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                            <Input placeholder="My awesome event" {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Date<br/></FormLabel>
                        <FormControl>
                            <DatePicker setDate={field.onChange} date={field.value}/>
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                        </FormItem>
                    )}
                    /> 
                    <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                            <Textarea placeholder="About me event"/>
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
                            <Input placeholder="About me event" type="number" {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                        </FormItem>
                    )}
                    /> 
                    <FormField
                    control={form.control}
                    name="avaliablePlaces"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Avaliable places</FormLabel>
                        <FormControl>
                            <Input placeholder="About me event" type="number" {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                        </FormItem>
                    )}
                    /> 
                    <Button type="submit">Register in</Button>
                </section>
                <GoogleMaps onlyMap={true}/>
                {/* form.setValue("location", {latitude: 12, longitude: 12}) */}
            </form> 
        </Form>
    )
}