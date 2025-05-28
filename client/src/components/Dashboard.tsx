
import Sidebar from './Sidebar'

export default function Dashboard({id}: {id: string}) {
  return (
    <div className='flex h-full'>
      <Sidebar id={id}/>
    </div>
  )
}
