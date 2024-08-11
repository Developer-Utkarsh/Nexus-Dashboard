import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'



const meetingsStore = (set: any) => ({
  meetings: {},
  updateMeetings: (meetings: object) => {
    set(() => ({
        meetings: meetings
    }))
  }
})

const useMeetingsStore = create((
  devtools(
    persist(meetingsStore, {
      name: 'meetings'
    })
  )
))

export default useMeetingsStore

