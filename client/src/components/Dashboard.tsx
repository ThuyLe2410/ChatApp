
import { useConversations } from '../contexts/ConversationsProvider'
import type { ConversationProps } from '../type'
import OpenConversation from './OpenConversation'
import Sidebar from './Sidebar'

export default function Dashboard({id} : {id: string}) {
    const {selectedConversation} = useConversations() as {selectedConversation: ConversationProps}
  return (
    <div className='flex h-full w-full'>
      <Sidebar id={id}/>
      {selectedConversation && <OpenConversation />}
    </div>
  )
}
