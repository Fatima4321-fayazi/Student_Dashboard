import { students, assignments, submissions } from "./data.js";

export function getStudentRecords(studentId) {
    return assignments.map(assignment => {
        const result = submissions[studentId]?.[assignment.id] || {
            status: "Missing",
            score: null
        };
        return { assignment, result };
    });
}

export function getStudentStats(studentId) {
    const records = getStudentRecords(studentId);

    const completed = records.filter(item => item.result.status === "Completed").length;
    const late = records.filter(item => item.result.status === "Late").length;
    const missing = records.filter(item => item.result.status === "Missing").length;

    const scores = records
        .map(item => item.result.score)
        .filter(score => typeof score === "number");

    const average = scores.length
        ? Math.round(scores.reduce((total, score) => total + score, 0) / scores.length)
        : 0;

    const completionRate = assignments.length
        ? Math.round((completed / assignments.length) * 100)
        : 0;

    return { records, completed, late, missing, average, completionRate };
}

export function getAllStudentStats() {
    return students.map(student => ({
        ...student,
        ...getStudentStats(student.id)
    }));
}

export function getDashboardStats() {
    const allStudents = getAllStudentStats();

    return {
        totalStudents: students.length,
        totalAssignments: assignments.length,
        completed: allStudents.reduce((total, student) => total + student.completed, 0),
        late: allStudents.reduce((total, student) => total + student.late, 0),
        missing: allStudents.reduce((total, student) => total + student.missing, 0)
    };
}

export function getAssignmentStats() {
    return assignments.map(assignment => {
        let completed = 0;
        let late = 0;
        let missing = 0;

        students.forEach(student => {
            const status = submissions[student.id]?.[assignment.id]?.status || "Missing";

            if (status === "Completed") completed++;
            else if (status === "Late") late++;
            else missing++;
        });

        return { ...assignment, completed, late, missing };
    });
}
