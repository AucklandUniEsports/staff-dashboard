"use client";

import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify/unstyled";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

export default function SuccessToast() {
     const searchParams = useSearchParams();
     const router = useRouter();
     const pathname = usePathname();
     const successMessage = searchParams.get("success");
     
     useEffect(
          () => {
               if (successMessage) {
                    toast.success(successMessage);
                    router.replace(pathname);
               }
          }, [successMessage]
     );
     return <ToastContainer style={{top: "112px"}}/>;
}
