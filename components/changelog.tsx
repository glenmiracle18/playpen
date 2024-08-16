import { Separator } from "@/components/ui/separator";

export function Changelog() {
  return (
    <div className="px-4 py-6 md:px-6 md:py-12 lg:py-16">
      <div className="prose prose-gray mx-auto max-w-4xl dark:prose-invert">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
          Changelog
        </h1>
        <p className="text-muted-foreground">
          Stay up-to-date with the latest changes and improvements to our
          platform.
        </p>
        <div className="space-y-8">
          <div className="border-l-2 border-primary pl-6 relative">
            <div className="absolute left-[-9px] top-0 h-3 w-3 rounded-full bg-primary" />
            <h2 className="text-2xl font-bold">Version 2.5.0</h2>
            <p className="text-muted-foreground">August 16, 2024</p>
            <ul className="space-y-2">
              <li>
                <h3 className="text-lg font-medium">
                  New Feature: Collaboration Tools
                </h3>
                <p>
                  Introduced a suite of collaboration tools to streamline
                  teamwork, including real-time code editing, in-app chat, and
                  integrated project management.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-medium">Improved Performance</h3>
                <p>
                  Optimized the codebase and infrastructure for faster page
                  loads and smoother user experiences.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-medium">Bug Fixes</h3>
                <p>
                  Resolved several minor bugs and issues reported by our users.
                </p>
              </li>
            </ul>
          </div>
          <Separator className="my-4" />
          <div className="border-l-2 border-primary pl-6 relative">
            <div className="absolute left-[-9px] top-0 h-3 w-3 rounded-full bg-primary" />
            <h2 className="text-2xl font-bold">Version 2.4.0</h2>
            <p className="text-muted-foreground">July 1, 2024</p>
            <ul className="space-y-2">
              <li>
                <h3 className="text-lg font-medium">New Template Library</h3>
                <p>
                  Launched a comprehensive library of pre-built templates and
                  components to accelerate development.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-medium">Improved Onboarding</h3>
                <p>
                  Streamlined the onboarding process with clearer instructions
                  and better-guided setup.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-medium">Bug Fixes</h3>
                <p>
                  Fixed several issues related to user authentication and
                  deployment workflows.
                </p>
              </li>
            </ul>
          </div>
          <Separator className="my-4" />
          <div className="border-l-2 border-primary pl-6 relative">
            <div className="absolute left-[-9px] top-0 h-3 w-3 rounded-full bg-primary" />
            <h2 className="text-2xl font-bold">Version 2.3.0</h2>
            <p className="text-muted-foreground">May 15, 2024</p>
            <ul className="space-y-2">
              <li>
                <h3 className="text-lg font-medium">Analytics Dashboard</h3>
                <p>
                  Introduced a comprehensive analytics dashboard to track key
                  performance metrics and user insights.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-medium">Improved Accessibility</h3>
                <p>
                  Enhanced the platform's accessibility features to better
                  support users with disabilities.
                </p>
              </li>
              <li>
                <h3 className="text-lg font-medium">Bug Fixes</h3>
                <p>
                  Resolved several minor bugs and issues reported by our users.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
