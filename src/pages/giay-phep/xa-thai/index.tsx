import { useRouter } from 'next/router';
import { checkAccessPermission } from 'src/@core/layouts/components/checkAccessPermission';
import Error401 from "src/pages/401";
import DischargewaterLicense from 'src/views/license/discharge-water';

const DischargeWater = () => {
    const router = useRouter();
    const routePath = router.pathname; // Use router.pathname to get the current pathname

    // Split the pathname and get the part you need (in this case, the first segment)
    const routeSegment = routePath.split('/')[1];

    // Use routeSegment in your conditional rendering
    return checkAccessPermission(routeSegment, 'view') ? <DischargewaterLicense /> : <Error401 />;
}

export default DischargeWater;
