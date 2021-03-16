const users = []

const addUser=({id, name, room})=>{
    if(name.length == 0 || room.length == 0){
        return {error: true, user: null}
    }
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()
    const existingUSer = users.find(user=> user.room=== room && user.name === name)
    if(existingUSer){
        return {error: true, user: null}
    }

    const user = {id, name, room}
    users.push(user)
    return {error: false, user}
}

const getUser=(id)=> users.find(user=> user.id === id)

const removeUser=(id)=>{
    const index = users.findIndex(user => user.id === id)
    if(index !== -1){
        return users.splice(index,1)[0]
    }
}

const getUsersInRoom=()=>{
    return users.filter(user=> user.room === room)
}


const checkUserInRoom=({name, room})=>{
    name = name.trim().toLowerCase()
    room = room.trim().toLowerCase()
    const existingUSer = users.find(user=> user.room=== room && user.name === name)
    if(existingUSer){
        return {error: true}
    }

    return {error: false}

}
module.exports ={ addUser, removeUser, getUser, getUsersInRoom, checkUserInRoom}