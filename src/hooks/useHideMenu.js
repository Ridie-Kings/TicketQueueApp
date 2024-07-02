import { useContext, useEffect } from "react"
import { UiContext } from "../context/UIContext"

export const useHideMenu = (hide) => {

    const { showMenu, hideMenu } = useContext(UiContext)
    useEffect(() => {
        if (hide) {
            hideMenu()
        } else {
            showMenu()
        }
    }, [hideMenu, showMenu, hide])
}