import dynamic from 'next/dynamic'

function ConstructionMap() {
  const Map = dynamic(
    () => import('src/views/construction/Map'), // replace '@components/map' with your component's location
    { ssr: false } // This line is important. It's what prevents server-side render
  )
  
  return <Map />
}

export default ConstructionMap