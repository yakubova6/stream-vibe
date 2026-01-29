// Extracts attribute name from CSS selector (removes brackets)
const getAttrNameFromSelector = (attrSelector) => {
    return attrSelector.substring(
        1,
        attrSelector.length - 1
    )
}

export default getAttrNameFromSelector
