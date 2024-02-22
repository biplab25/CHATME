import { create } from 'zustand';

// const useStore = create((set) => ({
//   authUser: null,
//   setAuthUser: (user) => set({ authUser: user }),
// }));

const useConversation = create((set) => ({
    selectedConversation: null,
    setSelectedConversation: (selectedConversation) => set({ selectedConversation }),
    messages: [],
    setMessages: (messages) => set({ messages }),
  }));

  export default useConversation;