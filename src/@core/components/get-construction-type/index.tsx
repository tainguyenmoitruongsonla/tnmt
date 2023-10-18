import { useRouter } from "next/router";

export function GetConstructionTypeId() {
    const router = useRouter();
    const pathSegments = router.pathname.split('/');
    const section = pathSegments[2];

    switch (section) {
        case "nuoc-mat":
            return 1;
        case "nuoc-duoi-dat":
            return 2;
        case "xa-thai":
            return 3;
        default:
            return 0;
    }
}