import { useEffect } from "react";
import { useRouter } from "next/router";
import nProgress from "nprogress";

function UseUnsavedChangesWarning(condition: boolean) {
  const router = useRouter();

  useEffect(() => {
    const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
      if (condition) {
        e.preventDefault();
        e.returnValue = true;
      }
    };
    const routeChangeStartHandler = () => {
      if (
        condition &&
        !window.confirm(
          "You have unsaved changes. Do you want to leave the page?"
        )
      ) {
        nProgress.done();
        // throw anything to abort navigation
        throw "routeChange aborted";
      }
    };

    window.addEventListener("beforeunload", beforeUnloadHandler);
    router.events.on("routeChangeStart", routeChangeStartHandler);

    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
      router.events.off("routeChangeStart", routeChangeStartHandler);
    };
  }, [condition, router.events]);
}

export default UseUnsavedChangesWarning;
