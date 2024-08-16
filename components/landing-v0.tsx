"use client";

import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckIcon, CloudIcon } from "lucide-react";
import { AuthLinks } from "@/components/atoms/auth-links";
import Image from "next/image";

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-[100dvh] py-4">
      <header className="px-4 lg:px-6 h-14 flex justify-center items-center">
        <Link
          href="#"
          className="flex items-center gap-2 justify-center"
          prefetch={false}
        >
          <Link href="/">
            <span className="flex items-center gap-2">
              <Image
                src="/icon.png"
                alt="logo"
                width={50}
                height={50}
                className="cursor-pointer rounded-lg"
              />
              <h1 className="text-2xl text-primary font-semibold font-sans">
                Cloudy
              </h1>
            </span>
          </Link>
        </Link>
        <nav className="ml-auto flex items center gap-4 sm:gap-6">
          <Link
            href="#"
            className="text-sm font-medium items-center hover:underline underline-offset-4"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="#"
            className="items-center text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Pricing
          </Link>
          <AuthLinks />
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Effortless File Sharing and Storage
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Cloudly makes it easy to securely store, share, and
                    collaborate on files with your team.
                  </p>
                </div>
                <div className="flex flex-col gap-4 py-4 min-[400px]:flex-row">
                  <Link
                    href="#"
                    className="inline-flex  h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Get Started
                  </Link>
                  <Link
                    href="#"
                    className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    prefetch={false}
                  >
                    Learn More
                  </Link>
                </div>
              </div>
              <img
                src="/landing-illustration.png"
                width="550"
                height="550"
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:aspect-square"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Secure, Seamless, and Scalable
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Cloudly offers a comprehensive suite of features to make file
                  sharing and collaboration a breeze. From secure storage to
                  real-time updates, we've got you covered.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Secure Storage</h3>
                      <p className="text-muted-foreground">
                        Your files are encrypted and stored securely in the
                        cloud, ensuring your data is protected.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Easy Sharing</h3>
                      <p className="text-muted-foreground">
                        Quickly share files with your team or clients with
                        customizable permissions and access controls.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Real-time Collaboration
                      </h3>
                      <p className="text-muted-foreground">
                        Collaborate on documents in real-time, with changes
                        synced instantly across all devices.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <img
                src="/collaboration-illustraion.png"
                width="550"
                height="310"
                alt="Features"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
              />
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Testimonials
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  What Our Customers Say
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from our satisfied customers about how Cloudly has
                  transformed their file management and collaboration workflows.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="rounded-lg border bg-background p-6 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder-user.jpg"
                        alt="@username"
                      />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">
                        CEO, Acme Inc.
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    "Cloudly has been a game-changer for our team. The\n
                    seamless file sharing and real-time collaboration have\n
                    streamlined our workflows and boosted our productivity."
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="rounded-lg border bg-background p-6 shadow-sm">
                  <div className="flex items-start space-x-4">
                    <Avatar>
                      <AvatarImage
                        src="/placeholder-user.jpg"
                        alt="@username"
                      />
                      <AvatarFallback>JA</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">Jane Appleseed</p>
                      <p className="text-sm text-muted-foreground">
                        Project Manager, Acme Inc.
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-muted-foreground">
                    "I love how Cloudly makes it easy to share files and\n
                    collaborate with my team. The secure storage and\n real-time
                    updates are a game-changer."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
                  Pricing
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Affordable Plans for Every Need
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the plan that best fits your team\'s file storage and
                  sharing needs. Get started with our free plan or upgrade to a
                  paid plan for more features.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold">Free</h3>
                    <p className="text-4xl font-bold">$0</p>
                    <p className="text-sm text-muted-foreground">per month</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                      2 GB storage
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Secure file sharing
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Basic collaboration tools
                    </li>
                  </ul>
                  <Button>Get Started</Button>
                </div>
              </div>
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold">Pro</h3>
                    <p className="text-4xl font-bold">$9</p>
                    <p className="text-sm text-muted-foreground">
                      per user/month
                    </p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                      50 GB storage
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Advanced sharing and permissions
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Real-time collaboration
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Priority support
                    </li>
                  </ul>
                  <Button>Get Started</Button>
                </div>
              </div>
              <div className="rounded-lg border bg-background p-6 shadow-sm">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold">Enterprise</h3>
                    <p className="text-4xl font-bold">Custom</p>
                    <p className="text-sm text-muted-foreground">Contact us</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Unlimited storage
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Advanced security and compliance
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Dedicated account management
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4 text-green-500" />
                      Customizable solutions
                    </li>
                  </ul>
                  <Button>Contact Sales</Button>
                </div>
              </div>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2 pt-12">
              <form className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="max-w-lg flex-1"
                />
                <Button type="submit">Sign Up</Button>
              </form>
              <p className="text-xs text-muted-foreground">
                Sign up to get started with Cloudly.{" "}
                <Link
                  href="#"
                  className="underline underline-offset-2"
                  prefetch={false}
                >
                  Terms &amp; Conditions
                </Link>
              </p>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-muted p-6 md:py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 text-sm">
          <div className="grid gap-1">
            <h3 className="font-semibold">Made with 💙 by Glen</h3>
          </div>
        </div>
      </footer>
    </div>
  );
}
