// Load all category images using Vite's glob import
const imageModules = import.meta.glob('../../assets/images/categories/*/*.jpg', {
    eager: true,
    import: 'default',
})

// Base categories array
const categories = ['action', 'adventure', 'comedy', 'drama', 'horror']

// Get images for a specific category
const getCategoryImages = (categoryName) => {
    const images = []

    // Get 4 images for this category
    for (let i = 1; i <= 4; i++) {
        const path = `../../assets/images/categories/${categoryName}/${i}.jpg`
        if (imageModules[path]) {
            images.push(imageModules[path])
        }
    }

    return images
}

// Format category name (first letter uppercase)
const formatCategoryName = (name) => {
    return name.charAt(0).toUpperCase() + name.slice(1)
}

// Create category items array
const categoryItems = []

// Repeat 4 times (like in original code)
for (let repetition = 0; repetition < 4; repetition++) {
    for (const category of categories) {
        categoryItems.push({
            title: formatCategoryName(category),
            images: getCategoryImages(category)
        })
    }
}

export default categoryItems