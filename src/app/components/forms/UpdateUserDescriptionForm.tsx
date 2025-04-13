'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useEffect, useState } from "react";
import { client } from "@/app/data/client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    description: z.string().max(2048, "Description is too long. Max 2048 characters."),
});
type FormSchemaType = z.infer<typeof formSchema>;

type Props = {
    username?: string,
    description?: string
}

export const UpdateUserDescriptionForm: FC<Props> = ({ username, description }) => {
    const router = useRouter();

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
            case 201:
                router.refresh();
        }   
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col w-fit bg-gray-200 rounded space-x-4 p-4"
            >
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
                <div className="flex flex-row justify-center">
                    <Button type="submit">Update description</Button>
                </div>
            </form>

        </Form>
    )
}