'use client';

import { useState, FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { DatePicker } from "../timepicker/DatePicker";
import { GoogleMaps } from "../mapComponents/GoogleMaps";
import { Category } from "@/app/data/interfaces";
import { client } from "@/app/data/client";

const formSchema = z.object({
    title: z.string()
        .max(128, "Title is too long. Max 128 characters.")
        .min(8, "Title is too short, it should contain 8 characters."),
    date: z.date(),
    category: z.number(),
    address: z.string()
        .max(255, "Address is too long. Max 255 characters.")
        .min(16, "Address is too short, it should contain 16 characters."),
    location: z.object({
        latitude: z.number(),
        longitude: z.number(),
      }),

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
    image: z.union([
        z.instanceof(File).refine(file => file.size <= 2621440, {
            message: "Max acceptable size is 2.5MB."
        }),
        z.string().optional()
    ]).refine(value => value instanceof File || typeof value === "string")
        .optional()
});
type FormSchemaType = z.infer<typeof formSchema>

export const EventForm: FC = () => {
    const router = useRouter();
    const [ message, setMessage ] = useState('');
    const [ categories, setCategories ] = useState<Category[]>();
    const form = useForm<FormSchemaType>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            address: "",
            description: "",
            price: 0,
            avaliable_places: 0,
            image: undefined
        }
    });
    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await client.getCategories();
                setCategories(data);
            } catch (error) {
                console.error("Can't get categories:", error);
            }
        };
        fetchCategories();
    }, []);
    

    function handleChangeCategory(value: string) {
        form.setValue("category", Number(value));
    }

    function handleChangeFile(e: any) {   
        const file = e.target.files?.[0];
        if (file) form.setValue("image", file);
    }

    function handleChangeLocation(lat: number, lng: number) {
        form.setValue("location", { latitude: lat, longitude: lng }, { shouldValidate: true })
    }

    function handleChangeAddress(new_address: string) {
        form.setValue("address", new_address, { shouldValidate: true })
    }

    async function onSubmit(values: FormSchemaType) {
        const formattedDate = new Date(values.date).toISOString();

        const status = await client.createNewEvent(
            values.title, 
            formattedDate, 
            values.category,
            values.address, 
            values.location, 
            values.description, 
            values.price, 
            values.avaliable_places, 
            values.image, 
        );

        switch (status) {
            case 201:
                router.push("/")
            case 400:
                setMessage("Event already exists!"); break;
            case 401: 
                setMessage("Unauthorized access."); break;
            case 500:
                setMessage("Server issue.")
            default:
                setMessage("Unpredicted error."); break;
            };
            
        setTimeout(() => { setMessage('') }, 10000);
    }

    const sectionStyle = "flex flex-col w-1/3 space-y-2";

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} 
                className="flex flex-col bg-gray-200 rounded space-x-4 p-4"
            >
                <main className="flex flex-row justify-between">   
                    <section className={sectionStyle}>
                        <GoogleMaps 
                            onlyMap={true} 
                            changeLocation={handleChangeLocation}
                            changeFormAddress={handleChangeAddress}
                        />
                    </section>
                    <section className={sectionStyle+" mx-4"}>
                        {message && 
                            <Alert className="mb-4" variant="destructive">
                                <AlertTitle>Heads up!</AlertTitle>
                                <AlertDescription>
                                    {message}
                                </AlertDescription>
                            </Alert>
                        }
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
                        name="category"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Category</FormLabel>
                            <FormControl>
                                <Select onValueChange={handleChangeCategory}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Categories" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories?.map((cat) => (
                                            <SelectItem key={cat.id} value={String(cat.id)}>
                                                {cat.title}
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
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Displayed address</FormLabel>
                            <FormControl>
                                <Input placeholder="About me event" {...field} />
                            </FormControl>
                            <FormDescription>
                                Type there address which will be displayed.
                                <br/>
                                If address in searchbar above map is acceptable leave this input empty.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        
                    </section>
                    <section className={sectionStyle}>
                        <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder="About me event" onChange={field.onChange}/>
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
                                <Input placeholder="About me event" type="number" {...field} />
                            </FormControl>
                            <FormDescription>
                                If there is no limitation of seats, leave 0.
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        /> 
                        <FormField
                        control={form.control}
                        name="image"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                                <Input 
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChangeFile}
                                />
                            </FormControl>
                            <FormDescription>
                                Upload an image that will be displayed with the event. Max size is 2.5 MB. 
                            </FormDescription>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        
                    </section>
                </main>
                <div className="flex flex-row justify-center">
                    <Button type="submit">Create event</Button>
                </div>
            </form> 
        </Form>
    )
}