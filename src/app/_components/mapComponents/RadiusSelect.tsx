type Props = {
    handleOnChangeRadius: (e: any) => void
}

export const RadiusSelect = ({handleOnChangeRadius}: Props) => {
    const distances: number[] = [5, 10, 20, 30, 60, 120, 180, 240];
    return (
      <select onChange={handleOnChangeRadius} 
        className='w-24 h-10 pl-1 mx-1 border-none bg-gray-200 rounded-lg hover:text-white hover:bg-black focus:text-black focus:bg-white'
      >
        {distances.map((dis) => (
          <option key={dis} value={dis}>{dis} km</option>
        ))}
      </select>
      );
    }