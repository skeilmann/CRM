import { fetchAllClients } from './server_communication.js';
import { addClients } from './server_communication.js';
import { renderClientsTable } from './dom.js';

async function loadAndRenderClients() {
    const clients = await fetchAllClients();
    renderClientsTable(clients);
}

async function addAndRenderNew() {

}

loadAndRenderClients();