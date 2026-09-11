import { students, assignments } from "./data.js";
import {
    getStudentStats,
    getAllStudentStats,
    getDashboardStats,
    getAssignmentStats
} from "./calculations.js";

const pages = {
    dashboard: "pages/dashboard.html",
    students: "pages/students.html",
    assignments: "pages/assignments.html",
    performance: "pages/performance.html",
    profile: "pages/profile.html"
};

const pageTitles = {
    dashboard: "Dashboard",
    students: "Students",
    assignments: "Assignments",
    performance: "Performance",
    profile: "Student Profile"
};

let currentStudentId = "ST-001";

async function loadHTML(filePath) {
    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Unable to load ${filePath}`);
    return response.text();
}

function statusClass(status) {
    return status.toLowerCase();
}

function initials(name) {
    return name.split(" ").map(word => word[0]).join("").slice(0, 2).toUpperCase();
}

function renderDashboard() {
    const stats = getDashboardStats();
    const allStudents = getAllStudentStats();

    document.querySelector("#stats-grid").innerHTML = `
        <div class="stat-card"><span>Total Students</span><strong>${stats.totalStudents}</strong><small>Active students</small></div>
        <div class="stat-card"><span>Assignments</span><strong>${stats.totalAssignments}</strong><small>Current assignments</small></div>
        <div class="stat-card"><span>Completed</span><strong>${stats.completed}</strong><small>Submitted on time</small></div>
        <div class="stat-card"><span>Needs Review</span><strong>${stats.late + stats.missing}</strong><small>Late or missing</small></div>
    `;

    const total = stats.completed + stats.late + stats.missing;
    const completedPercent = total ? (stats.completed / total) * 100 : 0;
    const latePercent = total ? (stats.late / total) * 100 : 0;

    document.querySelector("#completion-rate").textContent =
        `${Math.round(completedPercent)}%`;

    document.querySelector("#completion-donut").style.setProperty(
        "--completed", `${completedPercent}%`
    );
    document.querySelector("#completion-donut").style.setProperty(
        "--late", `${completedPercent + latePercent}%`
    );

    document.querySelector("#completion-legend").innerHTML = `
        <div><span class="legend-dot completed"></span>Completed <strong>${stats.completed}</strong></div>
        <div><span class="legend-dot late"></span>Late <strong>${stats.late}</strong></div>
        <div><span class="legend-dot missing"></span>Missing <strong>${stats.missing}</strong></div>
    `;

    // document.querySelector("#student-chart").innerHTML = allStudents.map(student => `
    //     <div class="bar-row">
    //         <div class="bar-label"><span>${student.name}</span><strong>${student.average}%</strong></div>
    //         <div class="bar-track"><div class="bar-fill" style="width:${student.average}%"></div></div>
    //     </div>
    // `).join("");










    const studentChart = document.querySelector("#student-chart");
const studentAverage = document.querySelector("#student-average");
const studentLegend = document.querySelector("#student-legend");

if (allStudents.length) {

    // Calculate class average
    const average =
        allStudents.reduce(
            (sum, student) => sum + student.average,
            0
        ) / allStudents.length;

    // Display class average
    studentAverage.textContent = `${Math.round(average)}%`;


    // ==========================================
    // COLORS
    // ==========================================

    const colors = [
        "var(--success)",
        "var(--secondary)",
        "var(--accent)",
         "var(--warning)",
        "var(--primary)",
        
          "var(--danger)"
    ];


    // ==========================================
    // CREATE EQUAL DONUT SEGMENTS
    // ==========================================

    // Calculate the total of all student performance scores
const totalPerformance =
    allStudents.reduce(
        (sum, student) => sum + student.average,
        0
    );


// Keep track of where each segment starts
let currentPosition = 0;


// Create one segment for each student
const gradientParts = allStudents.map((student, index) => {

    // Convert student's average into a percentage
    // of the total performance
    const segmentSize =
        (student.average / totalPerformance) * 100;

    const start = currentPosition;
    const end = currentPosition + segmentSize;

    // Move the starting position for the next student
    currentPosition = end;

    return `
        ${colors[index % colors.length]}
        ${start}% ${end}%
    `;
});



    // const segmentSize = 100 / allStudents.length;

    // let currentPosition = 0;

    // const gradientParts = allStudents.map((student, index) => {

    //     const start = currentPosition;
    //     const end = currentPosition + segmentSize;

    //     currentPosition = end;

    //     return `
    //         ${colors[index % colors.length]}
    //         ${start}% ${end}%
    //     `;
    // });


    // ==========================================
    // DRAW DONUT
    // ==========================================

    const chart = studentChart.querySelector("#students-chart");

    chart.style.background =
        `conic-gradient(${gradientParts.join(",")})`;


    // ==========================================
    // CREATE LEGEND
    // ==========================================

    studentLegend.innerHTML = allStudents.map(
        (student, index) => {

            const color = colors[index % colors.length];

            return `
                <div class="legend-item">

                    <span
                        class="color-dot"
                        style="background: ${color}">
                    </span>

                    <span>${student.name}</span>

                    <strong>${student.average}%</strong>

                </div>
            `;
        }
    ).join("");
}















//     const studentChart = document.querySelector("#student-chart");
// const studentAverage = document.querySelector("#student-average");
// const studentLegend = document.querySelector("#student-legend");

// if (allStudents.length) {

//     // Calculate class average
//     const average =
//         allStudents.reduce((sum, student) => sum + student.average, 0)
//         / allStudents.length;

//     // Show average in the center of the donut
//     studentAverage.textContent = `${Math.round(average)}%`;

//     // Calculate equal segments for each student
//     const segmentSize = 100 / allStudents.length;

//     let currentPosition = 0;

//     const colors = [
//         "var(--primary)",
//         "var(--warning)",
//         "#60a5fa",
//         "#d1d5db"
//     ];

//     const gradientParts = allStudents.map((student, index) => {

//         const start = currentPosition;
//         const end = currentPosition + segmentSize;

//         currentPosition = end;

//         return `
//             ${colors[index % colors.length]}
//             ${start}% ${end}%
//         `;
//     });

//     // Draw the donut chart
//     studentChart.querySelector("#students-chart").style.background =
//         `conic-gradient(${gradientParts.join(",")})`;

//     // Create legend
//     studentLegend.innerHTML = allStudents.map((student, index) => `
//         <div class="legend-item">

//             <span class="color-dot"
//                   style="background:${colors[index % colors.length]}">
//             </span>

//             <span>${student.name}</span>

//             <strong>${student.average}%</strong>

//         </div>
//     `).join("");
// }












const chart = document.querySelector("#student-line-chart");

const students = allStudents.slice(0, 5);

const width = 700;
const height = 260;

const padding = {
    top: 30,
    right: 30,
    bottom: 50,
    left: 45
};

const chartWidth = width - padding.left - padding.right;
const chartHeight = height - padding.top - padding.bottom;

// Create points for each student's average
const points = students.map((student, index) => {

    const x = students.length === 1
        ? width / 2
        : padding.left +
          (index / (students.length - 1)) * chartWidth;

    const y =
        padding.top +
        ((100 - student.average) / 100) * chartHeight;

    return {
        ...student,
        x,
        y
    };
});

// Create the line connecting all points
const linePoints = points
    .map(point => `${point.x},${point.y}`)
    .join(" ");

// Create horizontal grid lines
const gridLines = [0, 25, 50, 75, 100]
    .map(value => {

        const y =
            padding.top +
            ((100 - value) / 100) * chartHeight;

        return `
            <line
                x1="${padding.left}"
                y1="${y}"
                x2="${width - padding.right}"
                y2="${y}"
                class="line-chart-grid"
            />

            <text
                x="5"
                y="${y + 4}"
                class="line-chart-label"
            >
                ${value}%
            </text>
        `;
    })
    .join("");

// Create points and labels
const studentPoints = points
    .map(point => `
        <circle
            cx="${point.x}"
            cy="${point.y}"
            r="5"
            class="line-chart-point"
        />

        <text
            x="${point.x}"
            y="${point.y - 12}"
            text-anchor="middle"
            class="line-chart-value"
        >
            ${point.average}%
        </text>

        <text
            x="${point.x}"
            y="${height - 15}"
            text-anchor="middle"
            class="line-chart-label"
        >
            ${point.name}
        </text>
    `)
    .join("");

// Render chart
chart.innerHTML = `
    <svg
        viewBox="0 0 ${width} ${height}"
        preserveAspectRatio="none"
    >

        ${gridLines}

        <polyline
            points="${linePoints}"
            class="line-chart-line"
        />

        ${studentPoints}

    </svg>
`;


    // document.querySelector("#recent-students").innerHTML =
    //     allStudents.slice(0, 5).map(student => `
    //         <tr>
    //             <td><div class="student-cell"><div class="avatar small">${initials(student.name)}</div><span>${student.name}</span></div></td>
    //             <td>${student.group}</td>
    //             <td><strong>${student.average}%</strong></td>
    //             <td><span class="status ${student.missing ? "warning" : "good"}">${student.missing ? "Review" : "On track"}</span></td>
    //             <td><button class="table-button" data-page="profile" data-student-id="${student.id}">View</button></td>
    //         </tr>
    //     `).join("");

    const attention = allStudents.filter(student => student.missing || student.late);

    document.querySelector("#attention-list").innerHTML = attention.length
        ? attention.map(student => `
            <button class="attention-item" data-page="profile" data-student-id="${student.id}">
                <div class="avatar small">${initials(student.name)}</div>
                <div><strong>${student.name}</strong><span>${student.missing} missing · ${student.late} late</span></div>
                <span>→</span>
            </button>
        `).join("")
        : `<p class="empty-state">All students are on track.</p>`;
}

function renderStudents() {
    const allStudents = getAllStudentStats();
    const groups = [...new Set(students.map(student => student.group))];
    const filter = document.querySelector("#group-filter");

    filter.innerHTML = `<option value="all">All groups</option>` +
        groups.map(group => `<option value="${group}">${group}</option>`).join("");

    function updateTable() {
        const query = document.querySelector("#student-search").value.toLowerCase().trim();
        const selectedGroup = filter.value;

        const filtered = allStudents.filter(student => {
            const matchesSearch =
                student.name.toLowerCase().includes(query) ||
                student.id.toLowerCase().includes(query);
            const matchesGroup =
                selectedGroup === "all" || student.group === selectedGroup;

            return matchesSearch && matchesGroup;
        });

        document.querySelector("#students-table").innerHTML = filtered.length
            ? filtered.map(student => `
                <tr>
                    <td><div class="student-cell"><div class="avatar small">${initials(student.name)}</div><span>${student.name}</span></div></td>
                    <td>${student.id}</td>
                    <td>${student.group}</td>
                    <td><strong>${student.average}%</strong></td>
                    <td>${student.completionRate}%</td>
                    <td><span class="status ${student.missing ? "warning" : "good"}">${student.missing ? "Needs Review" : "On Track"}</span></td>
                    <td><button class="table-button" data-page="profile" data-student-id="${student.id}">View</button></td>
                </tr>
            `).join("")
            : `<tr><td colspan="7" class="empty-cell">No students found.</td></tr>`;
    }

    document.querySelector("#student-search").addEventListener("input", updateTable);
    filter.addEventListener("change", updateTable);
    updateTable();
}

function renderAssignments() {
    const stats = getAssignmentStats();

    const totals = stats.reduce((total, assignment) => ({
        completed: total.completed + assignment.completed,
        late: total.late + assignment.late,
        missing: total.missing + assignment.missing
    }), { completed: 0, late: 0, missing: 0 });

    document.querySelector("#assignment-stats").innerHTML = `
        <div class="stat-card"><span>Completed</span><strong>${totals.completed}</strong><small>On-time submissions</small></div>
        <div class="stat-card"><span>Late</span><strong>${totals.late}</strong><small>Late submissions</small></div>
        <div class="stat-card"><span>Missing</span><strong>${totals.missing}</strong><small>Missing submissions</small></div>
    `;

    document.querySelector("#assignments-table").innerHTML = stats.map(assignment => `
        <tr>
            <td><strong>${assignment.title}</strong></td>
            <td>${assignment.deadline} · 9:00 PM</td>
            <td><span class="status good">${assignment.completed}</span></td>
            <td><span class="status warning">${assignment.late}</span></td>
            <td><span class="status danger">${assignment.missing}</span></td>
        </tr>
    `).join("");
}

function renderPerformance() {
    const allStudents = getAllStudentStats()
        .sort((a, b) => b.average - a.average);

    document.querySelector("#performance-list").innerHTML = allStudents.map((student, index) => `
        <div class="performance-item">
            <div class="rank">${index + 1}</div>
            <div class="avatar small">${initials(student.name)}</div>
            <div class="performance-info">
                <strong>${student.name}</strong>
                <span>${student.group} · ${student.completed}/${assignments.length} completed</span>
            </div>
            <div class="performance-score">
                <strong>${student.average}%</strong>
                <div class="bar-track"><div class="bar-fill" style="width:${student.average}%"></div></div>
            </div>
        </div>
    `).join("");
}

function renderProfile(studentId) {
    const student = students.find(item => item.id === studentId);

    if (!student) {
        document.querySelector("#profile-content").innerHTML =
            `<div class="error-state"><h2>Student not found</h2></div>`;
        return;
    }

    const stats = getStudentStats(studentId);
    const total = stats.completed + stats.late + stats.missing;
    const completedPercent = total ? (stats.completed / total) * 100 : 0;
    const latePercent = total ? (stats.late / total) * 100 : 0;

    document.querySelector("#profile-content").innerHTML = `
        <section class="profile-header card">
            <div class="profile-identity">
                <div class="avatar large">${initials(student.name)}</div>
                <div><p class="eyebrow">Student Profile</p><h2>${student.name}</h2><p>${student.id} · ${student.group} · ${student.email}</p></div>
            </div>
            <span class="status ${stats.missing ? "warning" : "good"}">${stats.missing ? "Needs Review" : "On Track"}</span>
        </section>

        <section class="stats-grid compact">
            <div class="stat-card"><span>Average</span><strong>${stats.average}%</strong><small>Current average</small></div>
            <div class="stat-card"><span>Completion</span><strong>${stats.completionRate}%</strong><small>Assignments completed</small></div>
            <div class="stat-card"><span>Late</span><strong>${stats.late}</strong><small>Late submissions</small></div>
            <div class="stat-card"><span>Missing</span><strong>${stats.missing}</strong><small>Requires attention</small></div>
        </section>

        <section class="dashboard-grid">
            <article class="card">
                <div class="card-header"><div><h3>Performance</h3><p>Score for each assignment</p></div></div>
                <div class="student-chart">
                    ${stats.records.map(item => {
                        const score = typeof item.result.score === "number" ? item.result.score : 0;
                        return `<div class="bar-row"><div class="bar-label"><span>${item.assignment.title}</span><strong>${item.result.score ?? "—"}</strong></div><div class="bar-track"><div class="bar-fill" style="width:${score}%"></div></div></div>`;
                    }).join("")}
                </div>
            </article>

            <article class="card">
                <div class="card-header"><div><h3>Submission Status</h3><p>Assignment history</p></div></div>
                <div class="donut-section">
                    <div class="donut-chart" style="--completed:${completedPercent}%;--late:${completedPercent + latePercent}%">
                        <div class="donut-content"><strong>${stats.completionRate}%</strong><span>completed</span></div>
                    </div>
                    <div class="chart-legend">
                        <div><span class="legend-dot completed"></span>Completed <strong>${stats.completed}</strong></div>
                        <div><span class="legend-dot late"></span>Late <strong>${stats.late}</strong></div>
                        <div><span class="legend-dot missing"></span>Missing <strong>${stats.missing}</strong></div>
                    </div>
                </div>
            </article>
        </section>

        <article class="card">
            <div class="card-header"><div><h3>Assignment History</h3><p>Submission and score details</p></div></div>
            <div class="table-container">
                <table>
                    <thead><tr><th>Assignment</th><th>Deadline</th><th>Status</th><th>Score</th><th>Final Comment</th></tr></thead>
                    <tbody>
                        ${stats.records.map(item => `
                            <tr>
                                <td><strong>${item.assignment.title}</strong></td>
                                <td>${item.assignment.deadline} · 9:00 PM</td>
                                <td><span class="status ${statusClass(item.result.status)}">${item.result.status}</span></td>
                                <td>${item.result.score ?? "—"}</td>
                                <td>${item.result.status === "Missing" ? "Submission required." : item.result.status === "Late" ? "Submitted after deadline." : "Good work."}</td>
                            </tr>
                        `).join("")}
                    </tbody>
                </table>
            </div>
        </article>
    `;
}

async function showPage(pageName, studentId = currentStudentId) {
    const pageContent = await loadHTML(pages[pageName] || pages.dashboard);
    document.querySelector("#page-content").innerHTML = pageContent;
    document.querySelector("#page-title").textContent = pageTitles[pageName] || "Dashboard";
    currentStudentId = studentId;

    document.querySelectorAll(".nav-item").forEach(button => {
        button.classList.toggle("active", button.dataset.page === pageName);
    });

    if (pageName === "dashboard") renderDashboard();
    if (pageName === "students") renderStudents();
    if (pageName === "assignments") renderAssignments();
    if (pageName === "performance") renderPerformance();
    if (pageName === "profile") renderProfile(studentId);
}

document.addEventListener("click", event => {
    const button = event.target.closest("[data-page]");
    if (!button) return;

    event.preventDefault();

    showPage(
        button.dataset.page,
        button.dataset.studentId || currentStudentId
    );
});

async function initialize() {
    try {
        document.querySelector("#sidebar").innerHTML =
            await loadHTML("components/sidebar.html");

        document.querySelector("#topbar").innerHTML =
            await loadHTML("components/topbar.html");

        await showPage("dashboard");
    } catch (error) {
        console.error(error);
        document.querySelector("#page-content").innerHTML = `
            <div class="error-state">
                <h2>Unable to load dashboard</h2>
                <p>Please run the project using VS Code Live Server.</p>
            </div>
        `;
    }
}


initialize();



const isLoggedIn = localStorage.getItem("isLoggedIn");

if (isLoggedIn !== "true") {
    window.location.href = "login/index.html";
}

renderDashboard();
