import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'



const contactsStore = (set: any) => ({
  contacts: {},
  updateContacts: (contacts: object) => {
    set(() => ({
        contacts: contacts
    }))
  }
})

const useContactsStore = create((
  devtools(
    persist(contactsStore, {
      name: 'contacts'
    })
  )
))

export default useContactsStore

