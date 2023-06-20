import dynamic from 'next/dynamic'

function MapComponent() {
  const Map = dynamic(
    () => import('src/@core/components/map/Map'), // replace '@components/map' with your component's location
    { ssr: false } // This line is important. It's what prevents server-side render
  )

  return <Map />
}

export default MapComponent