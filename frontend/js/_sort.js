// Sort an array based on a key and direction
export function sortArray(array, key, ascending = true) {
    return array.sort((a, b) => {
        const valueA = a[key];
        const valueB = b[key];

        // Handle different data types
        if (typeof valueA === 'string' && typeof valueB === 'string') {
            return compareStrings(valueA, valueB, ascending);
        } else if (valueA instanceof Date && valueB instanceof Date) {
            return compareDates(valueA, valueB, ascending);
        } else {
            return compareNumbers(valueA, valueB, ascending);
        }
    });
}

// Compare strings
function compareStrings(a, b, ascending) {
    return ascending ? a.localeCompare(b) : b.localeCompare(a);
}

// Compare dates
function compareDates(a, b, ascending) {
    return ascending ? a - b : b - a;
}

// Compare numbers
function compareNumbers(a, b, ascending) {
    return ascending ? a - b : b - a;
}