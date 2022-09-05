/**
 * Hook that alerts clicks outside of the passed ref
 */
import { useEffect } from 'react';

export const useOutSideClicker = (ref: any) => {
    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event: Event) {
            // console.log("ref -- ", ref, (event.target as HTMLInputElement)?.tagName);
            if (ref.current && !ref.current.contains(event.target) && ref.current.style.display !== "none") {
                // console.log("hide --- ");
                ref.current.style.display = "none";
            } else if (ref.current.style.display === "none" && (event.target as HTMLInputElement)?.tagName === "INPUT") {
                // console.log("here --- ");
                ref.current.style.display = "block";
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}
