// Convert title to valid HTML ID: lowercase, spaces to hyphens
const getIdFromTitle = (title) => {
    return title
        .toLowerCase()
        .replaceAll(' ', '-')
}

export default getIdFromTitle