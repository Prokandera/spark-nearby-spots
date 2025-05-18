import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BatteryCharging, Mail, Phone, MapPin } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { toast } from '@/components/ui/sonner';
import Navbar from '@/components/Navbar';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
  subscribe: z.boolean().default(false),
});

const Contact = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
      subscribe: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("Form values:", values);
    toast.success("Form submitted successfully!");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="container flex-1 flex flex-col items-center justify-center py-8 px-4">
        <div className="max-w-2xl w-full">
          <div className="mb-8 text-center">
            <BatteryCharging className="mx-auto h-12 w-12 text-ev-blue mb-4" />
            <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
            <p className="text-muted-foreground mt-2">
              We'd love to hear from you! Get in touch using the form below.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormDescription>
                      What is your name?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your.email@example.com"
                        type="email"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      How can we reach you?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us a little bit about your problem"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Please describe your issue.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subscribe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-md border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Subscribe to newsletter?</FormLabel>
                      <FormDescription>
                        Receive updates and special offers directly to your
                        inbox.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-ev-blue hover:bg-ev-blue/90">
                Submit
              </Button>
            </form>
          </Form>

          <div className="mt-8 py-4 border-t text-center">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Other ways to connect:
            </h3>
            <div className="flex justify-center space-x-6">
              <a
                href="mailto:support@evfinder.com"
                className="text-gray-500 hover:text-ev-blue transition-colors"
              >
                <Mail className="h-6 w-6 inline-block mr-2 align-middle" />
                support@evfinder.com
              </a>
              <a
                href="tel:+15551234567"
                className="text-gray-500 hover:text-ev-blue transition-colors"
              >
                <Phone className="h-6 w-6 inline-block mr-2 align-middle" />
                +1 (555) 123-4567
              </a>
            </div>
            <div className="mt-4 text-gray-500">
              <MapPin className="h-6 w-6 inline-block mr-2 align-middle" />
              123 Electric Ave, Silicon Valley, CA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
