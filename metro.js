// Metro stations data
const stations = [
    "LBnagar", "Victoria_memorial", "Chaitanyapuri", "Dilshukhnagar",
    "Moosrambagh", "New Market", "Malakpet", "MG BusStation",
    "Osmania_medical", "GandhiBhavan", "Assembly", "Lakdikapool",
    "Khairtabad", "Irrummanzil", "Panjagutta", "Ameerpet",
    "SRnagar", "ESIhospital", "Erragadda", "Bharatnagar",
    "Moosapet", "DR_BRambedkar", "Kukatpally", "KPHBcolony",
    "JNTUcollege", "Miyapur", "Sultanbazar", "Narayanguda",
    "Chikkadpali", "RTCxroads", "Musheerabad", "Gandhihospital",
    "SecundrabadWest", "Paradeground", "Nagole", "Uppal",
    "stadium", "NGRI", "Habsiguda", "Tarnaka", "Mettuguda",
    "SecuderabadeEast", "Paradise", "Rasoolpura", "PrakashNagar",
    "Begumpet", "MathuraNagar", "Yusufguda", "Jubliehills",
    "JH-checkpost", "Peddamagudi", "Madhapur", "Dugamcheruvu",
    "Hitechcity", "Raidurg"
];

const V = stations.length;
const graph = Array(V).fill().map(() => Array(V).fill(0));

function initializeGraph() {
    // Blue Line (Corridor 1)
    addConnection(0, 1);    // LB Nagar ↔ Victoria Memorial
    addConnection(1, 2);    // Victoria Memorial ↔ Chaitanyapuri
    addConnection(2, 3);    // Chaitanyapuri ↔ Dilsukhnagar
    addConnection(3, 4);    // Dilsukhnagar ↔ Moosrambagh
    addConnection(4, 5);    // Moosrambagh ↔ New Market
    addConnection(5, 6);    // New Market ↔ Malakpet
    addConnection(6, 7);    // Malakpet ↔ MG Bus Station
    addConnection(7, 8);    // MG Bus Station ↔ Osmania Medical
    addConnection(8, 9);    // Osmania Medical ↔ Gandhi Bhavan
    addConnection(9, 10);   // Gandhi Bhavan ↔ Assembly
    addConnection(10, 11);  // Assembly ↔ Lakdikapul
    addConnection(11, 12);  // Lakdikapul ↔ Khairatabad
    addConnection(12, 13);  // Khairatabad ↔ Irrum Manzil
    addConnection(13, 14);  // Irrum Manzil ↔ Panjagutta
    addConnection(14, 15);  // Panjagutta ↔ Ameerpet
    addConnection(15, 16);  // Ameerpet ↔ SR Nagar
    addConnection(16, 17);  // SR Nagar ↔ ESI Hospital
    addConnection(17, 18);  // ESI Hospital ↔ Erragadda
    addConnection(18, 19);  // Erragadda ↔ Bharatnagar
    addConnection(19, 20);  // Bharatnagar ↔ Moosapet
    addConnection(20, 21);  // Moosapet ↔ DR BR Ambedkar
    addConnection(21, 22);  // DR BR Ambedkar ↔ Kukatpally
    addConnection(22, 23);  // Kukatpally ↔ KPHB Colony
    addConnection(23, 24);  // KPHB Colony ↔ JNTUCollege
    addConnection(24, 25);  // JNTUCollege ↔ Miyapur

    // Red Line (Corridor 2)
    addConnection(8, 26);   // Osmania Medical ↔ Sultan Bazar
    addConnection(26, 27);  // Sultan Bazar ↔ Narayanguda
    addConnection(27, 28);  // Narayanguda ↔ Chikkadpally
    addConnection(28, 29);  // Chikkadpally ↔ RTC X Roads
    addConnection(29, 30);  // RTC X Roads ↔ Musheerabad
    addConnection(30, 31);  // Musheerabad ↔ Gandhi Hospital
    addConnection(31, 32);  // Gandhi Hospital ↔ Secunderabad West
    addConnection(32, 33);  // Secunderabad West ↔ Parade Ground

    // Green Line (Corridor 3)
    addConnection(34, 35);  // Nagole ↔ Uppal
    addConnection(35, 36);  // Uppal ↔ Stadium
    addConnection(36, 37);  // Stadium ↔ NGRI
    addConnection(37, 38);  // NGRI ↔ Habsiguda
    addConnection(38, 39);  // Habsiguda ↔ Tarnaka
    addConnection(39, 40);  // Tarnaka ↔ Mettuguda
    addConnection(40, 41);  // Mettuguda ↔ Secunderabad East
    addConnection(41, 42);  // Secunderabad East ↔ Paradise
    addConnection(42, 43);  // Paradise ↔ Rasoolpura
    addConnection(43, 44);  // Rasoolpura ↔ Prakash Nagar
    addConnection(44, 45);  // Prakash Nagar ↔ Begumpet
    addConnection(45, 46);  // Begumpet ↔ Madhura Nagar
    addConnection(46, 47);  // Madhura Nagar ↔ Yusufguda
    addConnection(47, 48);  // Yusufguda ↔ Jubilee Hills
    addConnection(48, 49);  // Jubilee Hills ↔ JH Checkpost
    addConnection(49, 50);  // JH Checkpost ↔ Peddamma Gudi
    addConnection(50, 51);  // Peddamma Gudi ↔ Madhapur
    addConnection(51, 52);  // Madhapur ↔ Durgam Cheruvu
    addConnection(52, 53);  // Durgam Cheruvu ↔ Hitec City
    addConnection(53, 54);  // Hitec City ↔ Raidurg

    // Interchange Stations
    addConnection(15, 45);  // Ameerpet (Blue Line ↔ Green Line)
    addConnection(33, 41);  // Parade Ground (Red Line ↔ Green Line)
    addConnection(8, 26);   // Osmania Medical (Blue Line ↔ Red Line)
}

function addConnection(station1, station2) {
    graph[station1][station2] = 1;
    graph[station2][station1] = 1;
    console.log(`Connected: ${stations[station1]} ↔ ${stations[station2]}`);
}

function dijkstra(src, dest) {
    const dist = new Array(V).fill(Infinity);
    const visited = new Array(V).fill(false);
    const prev = new Array(V).fill(-1);

    dist[src] = 0;

    for (let count = 0; count < V - 1; count++) {
        const u = minDistance(dist, visited);
        if (u === -1) break;
        
        visited[u] = true;

        for (let v = 0; v < V; v++) {
            if (!visited[v] && graph[u][v] === 1 && 
                dist[u] !== Infinity && 
                dist[u] + graph[u][v] < dist[v]) {
                dist[v] = dist[u] + graph[u][v];
                prev[v] = u;
            }
        }
    }

    return {
        distance: dist[dest],
        path: reconstructPath(prev, src, dest)
    };
}

function minDistance(dist, visited) {
    let min = Infinity;
    let minIndex = -1;

    for (let v = 0; v < V; v++) {
        if (!visited[v] && dist[v] <= min) {
            min = dist[v];
            minIndex = v;
        }
    }
    return minIndex;
}

function reconstructPath(prev, src, dest) {
    const path = [];
    let current = dest;

    while (current !== -1) {
        path.unshift(stations[current]);
        current = prev[current];
    }

    return path;
}

function findRoute() {
    const sourceIndex = parseInt(document.getElementById('sourceStation').value);
    const destIndex = parseInt(document.getElementById('destinationStation').value);

    if (isNaN(sourceIndex) || isNaN(destIndex)) {
        alert('Please select both source and destination stations');
        return;
    }

    if (sourceIndex === destIndex) {
        alert('Source and destination stations cannot be the same');
        return;
    }

    const result = dijkstra(sourceIndex, destIndex);
    displayRoute(result);
}

function displayRoute(result) {
    const routeResult = document.getElementById('routeResult');
    const routeInfo = document.getElementById('routeInfo');
    const pathDisplay = document.getElementById('pathDisplay');

    routeResult.style.display = 'block';

    if (result.distance === Infinity || result.path.length <= 1) {
        routeInfo.innerHTML = '<div class="alert alert-danger"><i class="fas fa-exclamation-triangle"></i> No route available between these stations.</div>';
        pathDisplay.innerHTML = '';
        return;
    }

    const numberOfStations = result.path.length - 1;
    const fare = calculateFare(numberOfStations);
    const time = numberOfStations * 3;
    
    routeInfo.innerHTML = `
        <div class="info-box">
            <i class="fas fa-subway"></i>
            <h4>${numberOfStations}</h4>
            <p>Stations</p>
        </div>
        <div class="info-box">
            <i class="fas fa-clock"></i>
            <h4>${time} mins</h4>
            <p>Estimated Time</p>
        </div>
        <div class="info-box">
            <i class="fas fa-ticket-alt"></i>
            <h4>₹${fare}</h4>
            <p>Fare</p>
        </div>
    `;

    const pathHTML = result.path.map((station, index) => {
        if (index === result.path.length - 1) {
            return `<span class="station-dot"></span>${station}`;
        }
        return `<span class="station-dot"></span>${station}<span class="station-arrow">→</span>`;
    }).join('');

    pathDisplay.innerHTML = `
        <h5><i class="fas fa-map-signs"></i> Route:</h5>
        <div class="path-stations">
            ${pathHTML}
        </div>
    `;
}

function calculateFare(stations) {
    if (stations <= 2) return 10;
    if (stations <= 4) return 15;
    if (stations <= 6) return 20;
    if (stations <= 8) return 25;
    return 30;
}

function populateStationDropdowns() {
    const sourceSelect = document.getElementById('sourceStation');
    const destSelect = document.getElementById('destinationStation');

    stations.forEach((station, index) => {
        const sourceOption = new Option(station, index);
        const destOption = new Option(station, index);
        sourceSelect.add(sourceOption);
        destSelect.add(destOption);
    });
}

// Initialize the application
window.onload = function() {
    initializeGraph();
    populateStationDropdowns();
};