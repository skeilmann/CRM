const API_BASE_URL = 'http://localhost:3000/api/clients';

/**
 * Fetch all students from the server.
 * @returns {Promise<Array>} A promise resolving to an array of student objects.
 */

export async function fetchAllClients() {
    try {
        const response = await fetch(API_BASE_URL);
        if (!response.ok) throw new Error('Failed to fetch clients.');
        const clients = await response.json();

        //transform data
        return clients.map(client => ({
            ...client,
            fullName: `${client.name} ${client.surname} ${client.lastName}`
        }));
    } catch (error) {
        console.error('GEORGE Error fetching clients:', error);
        return [];
    }
}

/**
 * Add a new client to the database.
 * @param {Object} clientObj - The cleint object to be added.
 * @returns {Promise<Object>} A promise resolving to the created client object.
 */

export async function addClients(clientObj) {
    try {
        const response = await fetch(API_BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(clientObj),
        });
        if (!response.ok) throw new Error('GEORGE Failed to add client.');
        return await response.json();
    } catch (error) {
        console.error('GEORGE Error adding client:', error);
        return null;
    }
}

/**
 * Delete a client from the database by ID.
 * @param {number|string} id - The ID of the client to delete.
 * @returns {Promise<void>}
 */
export async function deleteClientById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('GEORGE Failed to delete client.');
    } catch (error) {
        console.error('GEORGE Error deleting client:', error);
    }
}


/**
 * Fetch a specific client by ID.
 * @param {number|string} id - The ID of the client to fetch.
 * @returns {Promise<Object>} A promise resolving to the client object.
 */
export async function fetchClientById(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`);
        if (!response.ok) throw new Error('GEORGE Failed to fetch client by ID.');
        return await response.json();
    } catch (error) {
        console.error('GEORGE Error fetching client by ID:', error);
        return null;
    }
}

/**
 * Update a client's data in the database.
 * @param {number|string} id - The ID of the client to update.
 * @param {Object} updates - The updates to apply to the client object.
 * @returns {Promise<Object>} A promise resolving to the updated client object.
 */
export async function updateclient(id, updates) {
    try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updates),
        });
        if (!response.ok) throw new Error('GEORGE Failed to update client.');
        return await response.json();
    } catch (error) {
        console.error('GEORGE Error updating client:', error);
        return null;
    }
}