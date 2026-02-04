// Import utility to get parameters from data attributes
import getParams from "@/utils/getParams";

// Root selector for all tabs components
const rootSelector = '[data-js-tabs]'

class Tabs {
    // CSS selectors for elements inside tabs component
    selectors = {
        root: rootSelector,
        content: '[data-js-tabs-content]',
        navigation: '[data-js-tabs-navigation]',
        button: '[data-js-tabs-button]',
    }

    // CSS classes for state management
    stateClasses = {
        isActive: 'is-active',
    }

    // CSS variables for dynamic styles
    stateCSSVariables = {
        activeButtonWidth: '--tabsActiveButtonWidth',
        activeButtonOffsetLeft: '--tabsActiveButtonOffsetLeft',
    }

    // Constructor - initializes tabs instance
    constructor(rootElement) {
        this.rootElement = rootElement

        // Get all tab content elements
        this.contentElements = [...this.rootElement.querySelectorAll(this.selectors.content)]

        // Get parameters from data attributes
        this.params = getParams(this.rootElement, this.selectors.root)

        // Find navigation element (either inside root or by ID)
        this.navigationElement = this.params.navigationTargetElementId
            ? document.getElementById(this.params.navigationTargetElementId)
            : this.rootElement.querySelector(this.selectors.navigation)

        // Get all tab buttons
        this.buttonElements = [...this.navigationElement.querySelectorAll(this.selectors.button)]

        // Initial state - find which tab is active by default
        this.state = {
            activeTabIndex: this.buttonElements.findIndex(({ ariaSelected }) => ariaSelected)
        }

        // Maximum tab index (zero-based)
        this.limitTabsIndex = this.buttonElements.length - 1

        // Bind event listeners
        this.bindEvents()
    }

    // Update UI to reflect current active tab
    updateUI() {
        const { activeTabIndex } = this.state

        // Update buttons state
        this.buttonElements.forEach((buttonElement, index) => {
            const isActive = index === activeTabIndex

            buttonElement.classList.toggle(this.stateClasses.isActive, isActive)
            buttonElement.ariaSelected = isActive
            buttonElement.tabIndex = isActive ? 0 : -1
        })

        // Update content visibility
        this.contentElements.forEach((contentElement, index) => {
            const isActive = index === activeTabIndex

            contentElement.classList.toggle(this.stateClasses.isActive, isActive)
            contentElement.ariaSelected = isActive
            contentElement.tabIndex = isActive ? 0 : -1
        })
    }

    // Activate specific tab by index
    activateTab(newTabIndex) {
        this.state.activeTabIndex = newTabIndex
        this.updateUI()
        this.buttonElements[newTabIndex].focus()
    }

    // Navigation methods
    previousTab = () => {
        const newTabIndex = this.state.activeTabIndex === 0
            ? this.limitTabsIndex
            : this.state.activeTabIndex - 1

        this.activateTab(newTabIndex)
    }

    nextTab = () => {
        const newTabIndex = this.state.activeTabIndex === this.limitTabsIndex
            ? 0
            : this.state.activeTabIndex + 1

        this.activateTab(newTabIndex)
    }

    firstTab = () => {
        this.activateTab(0)
    }

    lastTab = () => {
        this.activateTab(this.limitTabsIndex)
    }

    // Handle button click
    onButtonClick(buttonIndex) {
        this.state.activeTabIndex = buttonIndex
        this.updateUI()
    }

    // Handle keyboard navigation
    onKeyDown = (event) => {
        const { target, code, metaKey } = event

        // Check if focus is inside tabs component
        const isTabsContentFocused = this.contentElements
            .some((contentElement) => contentElement === target)
        const isTabsButtonFocused = this.buttonElements
            .some((buttonElement) => buttonElement === target)

        if (!isTabsContentFocused && !isTabsButtonFocused) {
            return
        }

        // Map keyboard keys to actions
        const action = {
            ArrowLeft: this.previousTab,
            ArrowRight: this.nextTab,
            Home: this.firstTab,
            End: this.lastTab,
            Numpad7: this.firstTab,
            Numpad1: this.lastTab,
        }[code]

        // Handle Mac specific shortcuts (Cmd + Arrow)
        const isMacHomeKey = metaKey && code === 'ArrowLeft'
        if(isMacHomeKey) {
            event.preventDefault()
            this.firstTab()
            return
        }

        const isMacEndKey = metaKey && code === 'ArrowRight'
        if(isMacEndKey) {
            event.preventDefault()
            this.lastTab()
            return
        }

        // Execute action if key is mapped
        if (action) {
            event.preventDefault()
            action()
        }
    }

    // Bind event listeners
    bindEvents() {
        // Add click handlers to all tab buttons
        this.buttonElements.forEach((buttonElement, index) => {
            buttonElement.addEventListener('click', () => this.onButtonClick(index))
        })

        // Add keyboard navigation listener
        document.addEventListener('keydown', this.onKeyDown)
    }
}

// Collection manager for all tabs instances on page
class TabsCollection {
    constructor() {
        this.init()
    }

    // Initialize all tabs components on page
    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Tabs(element)
        })
    }
}

export default TabsCollection