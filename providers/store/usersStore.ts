import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'



const usersStore = (set: any) => ({
  users: {},
  updateUsers: (users: object) => {
    set(() => ({
      users: users
    }))
  }
})

const useUsersStore = create((
  devtools(
    persist(usersStore, {
      name: 'users'
    })
  )
))

export default useUsersStore

