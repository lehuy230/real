import React, { useState } from 'react';

import useFirestore from '../hook/useFireStore';
import { AuthContext } from './AuthProviders';

export const AppContext  = React.createContext();


function AppProvider({children}) {
    const [isAddRoomvisible,setIsAddRoomvisible] = useState(false);
    const [isInviteMembervisible,setIsInviteMembervisible] = useState(false);
    const [selectedRoomId,setSelectedRoomId] = useState('');
    const {user:{uid}} = React.useContext(AuthContext);
    /**
     * name:'room name'
     * descripttion:'mo ta'
     * members:[uid1,uid2]
     */
    const roomsCondition = React.useMemo(()=>{
        return{
            fieldName:'members',
            operator:'array-contains',
            compareValue:uid
        }
    },[uid])

    
    const rooms = useFirestore('rooms',roomsCondition);

    const sellectedRoom =  React.useMemo(
        ()=>rooms.find((room)=>room.id === selectedRoomId) || {}
    ,[rooms,selectedRoomId]);

    const userCondition = React.useMemo(()=>{
        return{
            fieldName:'uid',
            operator:'in',
            compareValue:sellectedRoom.members
        }
    },[sellectedRoom.members])
    const members = useFirestore('users',userCondition)
    
    return (
        <AppContext.Provider 
            value={{
                rooms,
                isAddRoomvisible, 
                setIsAddRoomvisible,
                selectedRoomId,
                setSelectedRoomId,
                sellectedRoom,
                members,
                isInviteMembervisible,
                setIsInviteMembervisible
            }}
        >
            {children}
        </AppContext.Provider>
            
    );
}

export default AppProvider;