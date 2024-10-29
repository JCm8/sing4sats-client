import {onBeforeMount, ref} from 'vue';

export const LOCAL_STORAGE = {
    USER_ID: 'user-id',
    LIGHTNING_ADDRESS: 'lightning-address',
    ROOM_CODE: 'room-code'
}

export function useAuth() {
    const isSignedIn = ref(false)

    function onAuth() {
        isSignedIn.value = true
    }

    function onLogout() {
        window.localStorage.removeItem(LOCAL_STORAGE.USER_ID)
        window.localStorage.removeItem(LOCAL_STORAGE.LIGHTNING_ADDRESS)
        window.localStorage.removeItem(LOCAL_STORAGE.ROOM_CODE)
        isSignedIn.value = false
    }

    onBeforeMount(() => {
        const userId = window.localStorage.getItem('user-id')

        if (userId) {
            isSignedIn.value = true
        }
    })

    return {
        isSignedIn,
        onAuth,
        onLogout
    }
}
