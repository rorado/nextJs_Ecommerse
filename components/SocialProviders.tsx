import { Button } from "./ui/button";
import { Icon } from "@iconify/react";
import { signIn as nextAuthSignIn } from "next-auth/react";

// Reusable signIn function
function signIn(provider: string) {
  return () => nextAuthSignIn(provider, { callbackUrl: "/", redirectTo: "/profile",
});
}

const SocialProviders = () => {
  return (
    <div className="space-y-4">
      <Button
        className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg shadow-md bg-white  hover:bg-white text-gray-700 border border-gray-300 hover:shadow-lg transition-all duration-300 relative overflow-hidden cursor-pointer"
        onClick={signIn("google")} // pass a function reference, not call it
      >
        <Icon icon="flat-color-icons:google" className="h-5 w-5" />
        <span className="font-medium">Login with Google</span>

        {/* subtle hover gradient */}
        <span className="absolute inset-0 bg-linear-to-r from-blue-400 to-red-400 opacity-0 hover:opacity-10 rounded-lg pointer-events-none transition-opacity duration-300" />
      </Button>
    </div>
  );
};

export default SocialProviders;
