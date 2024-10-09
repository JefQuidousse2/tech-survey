"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Section } from "~/models/types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem} from "./form";

import { Button } from "./button";
import { Label } from "./label";
import { Input } from "./input";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";
import { SelectValue } from "@radix-ui/react-select";


const formSchema = z.object({
  role: z.string(),
  tech: z.string()
})

const ShowTechSearchWrapper = ({ roles } : { roles: Section[]}) => {
  const path = usePathname();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role");
  const defaultTech = searchParams.get("tech");
  const route = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: defaultRole ?? "",
      tech: defaultTech ?? "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="sm:col-span-3"> 
            <FormField
              control={form.control}
              name="tech"
              render={({ field }) => (
                <FormItem>
                  <Label>Technology</Label>
                  <FormControl>
                    <Input placeholder="technology" {...field}/>
                  </FormControl>
                </FormItem>
                )}
            />
          </div>
          <div className="sm:col-span-3">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                    <Label>Viewing results for role:</Label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {
                          roles.map(r => {
                            return (
                              <SelectItem value={r.label} key={r.id}>{r.label}</SelectItem>
                            )
                          })
                        }
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  )

  function onSubmit(values: z.infer<typeof formSchema>) {
    const role2 = values.role != undefined ? values.role.length != 0 && values.role != "No role" ? `role=${values.role}` : "" : "";
    const tech2 = values.tech != undefined ? values.tech.length != 0 ? `&tech=${values.tech}` : "" : "";
    route.push(`${path}?${role2}${tech2}`);
  }
};

  export default ShowTechSearchWrapper;