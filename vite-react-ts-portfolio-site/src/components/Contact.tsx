import { contact } from "@/constants";
import Wrapper from "../layouts/Wrapper";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";
//
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required.",
  }),
  email: z
    .string()
    .min(1, {
      message: "Email is required.",
    })
    .email({
      message: `@gmail.com`,
    }),
  message: z.string().min(1, {
    message: "Message is required.",
  }),
});

const Contact = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  return (
    <section className="section" id="contact">
      <Wrapper className="space-y-16">
        <div className="text-center space-y-1">
          <h2>Contact Me</h2>
          <p className="text-text-2">Get in touch</p>
        </div>
        {/*  */}
        <div className="flex flex-col md:flex-row items-start justify-center gap-10">
          {/* left */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="md:max-w-xs w-full"
          >
            <h5 className="text-center mb-6">Talk to me</h5>
            <ul className="space-y-3">
              {contact.map((item, idx) => (
                <li key={idx}>
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, delay: idx + 1 }}
                    className="p-5 rounded-xl border shadow flex flex-col items-center gap-1"
                  >
                    <p className="text-2xl">{item.icon}</p>
                    <p>{item.label}</p>
                    <p className="text-text-2">{item.content}</p>
                    <p className="mt-4 flex items-center gap-2 text-text-2 text-xs">
                      <span>Write Me</span>
                      <FiArrowRight />
                    </p>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>
          {/* right */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
            className="md:max-w-xl w-full"
          >
            <h5 className="text-center mb-6">Write me your project</h5>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
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
                        <Input {...field} />
                      </FormControl>
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
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Send message</Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </Wrapper>
    </section>
  );
};

export default Contact;
