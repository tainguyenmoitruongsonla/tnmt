import { useRouter } from 'next/router';
import { checkAccessPermission } from 'src/@core/layouts/checkAccessPermission';
import Error401 from "src/pages/401";
import ListLicenses from "src/views/license";

const DrillingPracticeGroundWater = () => {
    const router = useRouter();
    const routePath = router.pathname; // Use router.pathname to get the current pathname

    // Split the pathname and get the part you need (in this case, the first segment)
    const routeSegment = routePath.split('/')[1];

    // Use routeSegment in your conditional rendering
    return checkAccessPermission(routeSegment, 'view') ? <ListLicenses /> : <Error401 />;
}

export default DrillingPracticeGroundWater;
