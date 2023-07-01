import { Card, CardContent, CardHeader } from "@mui/material"
import Map from "src/@core/components/map/Map"

const HomeMap = () => {

    return (
        <Card sx={{ position: 'relative' }}>
            <CardHeader
                title="BẢN ĐỒ TRANG THÁI VẬN HÀNH CÔNG TRÌNH"
                sx={{ padding: 0 }}
                titleTypographyProps={{
                    sx: {
                        mb: 2.5,
                        textAlign: 'center',
                        fontSize: '18px !important',
                        fontWeight: 600,
                        lineHeight: '2rem !important',
                        letterSpacing: '0.15px !important',
                        borderBottom: '1px solid gray',
                    }
                }}
            />
            <CardContent sx={{ height: 'calc(100vh - 200px)' }}>
                <Map />
            </CardContent>
        </Card>
    )
}
export default HomeMap