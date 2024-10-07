// src/utils/localStorage.js

/**
 * Sets an item in localStorage.
 * @param {string} key - The key under which the value will be stored.
 * @param {any} value - The value to store. It will be stringified.
 */

export function setItem(key, value) {
    try {
        const serializedValue = JSON.stringify(value);
        localStorage.setItem(key, serializedValue);
    } catch (error) {
        console.error('Error setting item to localStorage', error);
    }
}

/**
 * Gets an item from localStorage.
 * @param {string} key - The key of the item to retrieve.
 * @returns {any|null} The retrieved value, or null if not found.
 */
export function getItem(key) {
    try {
        const serializedValue = localStorage.getItem(key);
        return serializedValue ? JSON.parse(serializedValue) : null;
    } catch (error) {
        console.error('Error getting item from localStorage', error);
        return null;
    }
}
