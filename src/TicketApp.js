import { RouterPage } from "./pages/RouterPage"
import { UiProvider } from "./context/UIContext"

export const TicketApp = () => {
    return (
        <UiProvider>
            <RouterPage />
        </UiProvider>
    )
}