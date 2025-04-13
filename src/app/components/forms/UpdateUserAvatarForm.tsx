'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { client } from "@/app/data/client";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

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
    username?: string
}

export const UpdateUserAvatarForm: FC<Props> = ({ username }) => {
    const router = useRouter();
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
                name="avatar"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Avatar</FormLabel>
                    <FormControl>
                        <Input type="file" accept="image/*" onChange={handleChangeFile} className="min-w-[350px]" />
                    </FormControl>
                    <FormDescription/>
                    <FormMessage />
                    </FormItem>
                )}
                />
                <div className="flex flex-row justify-center">
                    <Button type="submit">Update avatar</Button>
                </div>
            </form>

        </Form>
    )
}