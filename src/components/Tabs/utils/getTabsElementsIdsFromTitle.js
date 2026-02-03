import getIdFromTitle from "@/utils/getIdFromTitle"

// Generate unique IDs for tab system: base + item title
const getTabsElementsIdsFromTitle = (baseTitle, itemTitle) => {
    // Format titles for HTML IDs
    const baseFormatted = getIdFromTitle(baseTitle)
    const itemFormatted = getIdFromTitle(itemTitle)

    // Combine for uniqueness (prevents ID collisions)
    const fullId = `${baseFormatted}-${itemFormatted}`

    return {
        buttonId: `${fullId}-tab`,
        contentId: `${fullId}-tabpanel`,
    }
}

export default getTabsElementsIdsFromTitle