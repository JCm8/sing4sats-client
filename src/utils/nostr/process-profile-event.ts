import type * as Nostr from 'nostr-tools'
import { ref } from 'vue'

export function useNostrProfileEvent() {
    let latestProfileEvent: Nostr.Event | null = null
    // const latestProfileEvent = ref<Nostr.Event | null>(null)

    function processProfileEvent(event: Nostr.Event) {
        if (event.kind !== 0) {
            return // not a metadata event
        }
        const metadataFields = ['picture', 'display_name']

        try {
            const profileJSON = JSON.parse(event.content)

            if (Object.keys(profileJSON).some(key => metadataFields.includes(key))) {
                // ignore older events
                if (latestProfileEvent && event.created_at < latestProfileEvent.created_at) {
                    return
                }
                latestProfileEvent = event
                alert(JSON.stringify(event))
                if (profileJSON.picture) {
                    // profilePic = profileJSON.picture
                }
            }
        } catch (error) {
            // invalid metadata
        }
    }

    return {
        processProfileEvent
    }
}
