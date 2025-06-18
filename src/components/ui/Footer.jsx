/**
 * v0 by Vercel.
 * @see https://v0.dev/t/L9SZac4GR6Q
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"

export default function Footer() {
  return (
    <div className="bg-zinc-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8 xl:col-span-1">
            <img src="/images/flag.png" className="h-10" alt="Company logo" />
            <p className="text-zinc-500 text-base leading-6">
              Making the world a better place through constructing elegant hierarchies.
            </p>
            <div className="flex space-x-6">
              <Link href="#" className="text-zinc-400 hover:text-zinc-500" prefetch={false}>
                <span className="sr-only">Facebook</span>
                <FacebookIcon className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-zinc-500" prefetch={false}>
                <span className="sr-only">Twitter</span>
                <TwitterIcon className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-zinc-400 hover:text-zinc-500" prefetch={false}>
                <span className="sr-only">GitHub</span>
                <GithubIcon className="h-6 w-6" />
              </Link>
            </div>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h4 className="text-sm leading-5 font-semibold text-zinc-400 tracking-wider uppercase">Products</h4>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="#" className="text-base leading-6 text-zinc-500 hover:text-zinc-900" prefetch={false}>
                      Cool stuff
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base leading-6 text-zinc-500 hover:text-zinc-900" prefetch={false}>
                      Random feature
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base leading-6 text-zinc-500 hover:text-zinc-900" prefetch={false}>
                      Team feature
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base leading-6 text-zinc-500 hover:text-zinc-900" prefetch={false}>
                      Stuff for developers
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base leading-6 text-zinc-500 hover:text-zinc-900" prefetch={false}>
                      Another one
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base leading-6 text-zinc-500 hover:text-zinc-900" prefetch={false}>
                      Last time
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h4 className="text-sm leading-5 font-semibold text-zinc-400 tracking-wider uppercase">Legal</h4>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="#" className="text-base leading-6 text-zinc-500 hover:text-zinc-900" prefetch={false}>
                      Privacy policy
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base leading-6 text-zinc-500 hover:text-zinc-900" prefetch={false}>
                      Terms of service
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h4 className="text-sm leading-5 font-semibold text-zinc-400 tracking-wider uppercase">Resources</h4>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="#" className="text-base leading-6 text-zinc-500 hover:text-zinc-900" prefetch={false}>
                      Documentation
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base leading-6 text-zinc-500 hover:text-zinc-900" prefetch={false}>
                      Tutorials
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h4 className="text-sm leading-5 font-semibold text-zinc-400 tracking-wider uppercase">Company</h4>
                <ul className="mt-4 space-y-4">
                  <li>
                    <Link href="#" className="text-base leading-6 text-zinc-500 hover:text-zinc-900" prefetch={false}>
                      About
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base leading-6 text-zinc-500 hover:text-zinc-900" prefetch={false}>
                      Jobs
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base leading-6 text-zinc-500 hover:text-zinc-900" prefetch={false}>
                      Press
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-base leading-6 text-zinc-500 hover:text-zinc-900" prefetch={false}>
                      Partners
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-zinc-800 pt-8">
          <p className="text-base leading-6 text-zinc-500 xl:text-center">&copy; 2024 Dhruv Aggarwal. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function GithubIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}


function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}
