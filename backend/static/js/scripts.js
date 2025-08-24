console.log("Loaded scripts.js");

document.addEventListener("DOMContentLoaded", function () {
    var el = document.getElementById("revenue-data");
    console.log("Element:", el);
    if (!el) return;

    var payload = JSON.parse(el.textContent || "{}");
    var canvas = document.getElementById("revenueChart");
    if (!canvas) return;

    var ctx = canvas.getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: payload.labels || [],
            datasets: [{
                label: "Revenue",
                data: payload.values || [],
                borderColor: "#6e25ebff",
                backgroundColor: "rgba(96, 37, 235, 0.1)",
                borderWidth: 2,
                fill: false,
                tension: 0,
                pointRadius: 2,
                pointHitRadius: 6,
                pointHoverRadius: 4,
                borderCapStyle: "butt",
                borderJoinStyle: "miter"
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { grid: { display: false }, ticks: { color: "#64748b" } },
                y: { grid: { color: "#e2e8f0" }, ticks: { color: "#64748b" } }
            },
            plugins: { legend: { display: false } }
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var el = document.getElementById("active-users-data");
    if (!el) return;

    var payload = JSON.parse(el.textContent || "{}");
    var ctx = document.getElementById("activeUsersChart").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: payload.labels,
            datasets: [{
                label: "Active Users",
                data: payload.values,
                backgroundColor: "#6e25ebff"  // green
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { grid: { display: false } },
                y: { beginAtZero: true }
            },
            plugins: { legend: { display: false } }
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Grab JSON data
    var el = document.getElementById("success-failed-data");
    if (!el) return;

    var payload = JSON.parse(el.textContent || "{}");
    var ctx = document.getElementById("successFailedChart").getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            labels: payload.labels,
            datasets: [
                {
                    label: "Success",
                    data: payload.success,
                    borderColor: "#10b981",  // green
                    backgroundColor: "rgba(16, 185, 129, 0.1)",
                    borderWidth: 2,
                    tension: 0,  // straight lines
                    fill: false,
                    pointRadius: 2
                },
                {
                    label: "Failed",
                    data: payload.failed,
                    borderColor: "#ef4444",  // red
                    backgroundColor: "rgba(239, 68, 68, 0.1)",
                    borderWidth: 2,
                    tension: 0,
                    fill: false,
                    pointRadius: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { grid: { color: "#e2e8f0" }, ticks: { color: "#64748b" } },
                y: { grid: { color: "#e2e8f0" }, ticks: { color: "#64748b" }, beginAtZero: true }
            },
            plugins: { legend: { display: false }}
        }
    });
});