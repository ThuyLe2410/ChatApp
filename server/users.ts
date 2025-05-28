type userProps = {id: string, name: string, room: string}
const users:userProps[] = [];

export const addUser = ({id,name, room}: userProps) => {
    name = name.trim().toLowerCase();
    room = room.trim().toLowerCase();
    const existingUser = users.find((user) => user.name === name && user.room === room);
    if (existingUser) {
        return {error: 'Username is taken'}
    }
    const user = {id, name, room};
    console.log('addUser', user)
    users.push(user);
    return {user}
}
export const removeUser = (id: string) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        console.log('remove User', users.splice(index, 1))
        return users.splice(index, 1)
    }
}

export const getUser = (id: string) => {
    console.log('users', users)
    const user = users.find((user)=> user.id === id);
    console.log('getUser', user);
    return user
}

export const getUserInRoom = (room: string) => {
    users.filter((user) => user.room === room)
}