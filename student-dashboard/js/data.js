export const students = [
    { id: "ST-001", name: "Maryam Ahmad", group: "Group A", email: "maryam@example.com" },
    { id: "ST-002", name: "Zahra Rahimi", group: "Group A", email: "zahra@example.com" },
    { id: "ST-003", name: "Amina Karimi", group: "Group B", email: "amina@example.com" },
    { id: "ST-004", name: "Sahar Mohammadi", group: "Group B", email: "sahar@example.com" },
    { id: "ST-005", name: "Laila Waziri", group: "Group A", email: "laila@example.com" },
    { id: "ST-006", name: "Nadia Ahmadi", group: "Group C", email: "nadia@example.com" }
];

export const assignments = [
    { id: "A-01", title: "HTML & CSS Project", deadline: "2026-09-02" },
    { id: "A-02", title: "JavaScript Exercise", deadline: "2026-09-05" },
    { id: "A-03", title: "React Components", deadline: "2026-09-08" },
    { id: "A-04", title: "API Integration", deadline: "2026-09-10" },
    { id: "A-05", title: "Final Dashboard", deadline: "2026-09-12" }
];

export const submissions = {
    "ST-001": {
        "A-01": { status: "Completed", score: 92 },
        "A-02": { status: "Completed", score: 88 },
        "A-03": { status: "Completed", score: 91 },
        "A-04": { status: "Late", score: 82 },
        "A-05": { status: "Completed", score: 95 }
    },
    "ST-002": {
        "A-01": { status: "Completed", score: 84 },
        "A-02": { status: "Completed", score: 79 },
        "A-03": { status: "Completed", score: 83 },
        "A-04": { status: "Late", score: 77 },
        "A-05": { status: "Missing", score: null }
    },
    "ST-003": {
        "A-01": { status: "Completed", score: 94 },
        "A-02": { status: "Completed", score: 91 },
        "A-03": { status: "Completed", score: 93 },
        "A-04": { status: "Completed", score: 90 },
        "A-05": { status: "Completed", score: 89 }
    },
    "ST-004": {
        "A-01": { status: "Completed", score: 75 },
        "A-02": { status: "Completed", score: 62 },
        "A-03": { status: "Late", score: 70 },
        "A-04": { status: "Missing", score: null },
        "A-05": { status: "Completed", score: 56 }
    },
    "ST-005": {
        "A-01": { status: "Completed", score: 86 },
        "A-02": { status: "Completed", score: 89 },
        "A-03": { status: "Completed", score: 87 },
        "A-04": { status: "Completed", score: 84 },
        "A-05": { status: "Completed", score: 90 }
    },
    "ST-006": {
        "A-01": { status: "Completed", score: 58 },
        "A-02": { status: "Late", score: 64 },
        "A-03": { status: "Completed", score: 61 },
        "A-04": { status: "Missing", score: null },
        "A-05": { status: "Missing", score: null }
    }
};
