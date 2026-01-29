import getAttrNameFromSelector from "@/utils/getAttrNameFromSelector"

// Parses JSON parameters from element's data attribute
const getParams = (element, dataAttrSelector) => {
    return JSON.parse(
        element.getAttribute(
            getAttrNameFromSelector(dataAttrSelector)
        )
    )
}

export default getParams