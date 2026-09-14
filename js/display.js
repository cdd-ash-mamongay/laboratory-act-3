// Display module: responsible only for rendering information in the webpage.

import {
    calculateFinalGrade,
    getAcademicStatus,
    getPerformanceRemark,
    calculateClassAverage,
    countPassingStudents,
    getTopStudent
} from "./gradeUtils.js";

const studentList = document.getElementById("studentList");
const classAverage = document.getElementById("classAverage");
const passingCount = document.getElementById("passingCount");
const displayedCount = document.getElementById("displayedCount");
const topStudent = document.getElementById("topStudent");
const messageArea = document.getElementById("messageArea");

export function displayStudents(students) {
    studentList.innerHTML = "";

    if (students.length === 0) {
        studentList.innerHTML = '<p class="student-card">No students found</p>';
        return;
    }

    students.forEach(student => {
        const { id, name, block, quiz, lab, exam } = student;
        const finalGrade = calculateFinalGrade(student);
        const academicStatus = getAcademicStatus(finalGrade);
        const performanceRemark = getPerformanceRemark(finalGrade);

        const card = document.createElement("article");
        card.className = "student-card";

        card.innerHTML = `
            <header>
                <div>
                    <h2>${name}</h2>
                    <p class="student-id">Student ID: ${id}</p>
                </div>
                <span class="block-badge">${block}</span>
            </header>

            <div class="scores">
                <div class="score">
                    <span>Quiz (25%)</span>
                    <strong>${quiz}</strong>
                </div>
                <div class="score">
                    <span>Laboratory (35%)</span>
                    <strong>${lab}</strong>
                </div>
                <div class="score">
                    <span>Prelim Exam (40%)</span>
                    <strong>${exam}</strong>
                </div>
            </div>

            <div class="result-row">
                <div>
                    <span>Final Grade</span>
                    <div class="final-grade">${finalGrade.toFixed(2)}</div>
                </div>
                <div>
                    <span>Academic Status</span>
                    <div class="status">${academicStatus}</div>
                </div>
            </div>

            <div class="remark">
                <strong>Performance Remark:</strong> ${performanceRemark}
            </div>
        `;

        studentList.appendChild(card);
    });
}

export function displaySummary(students) {
    const average = calculateClassAverage(students);
    const passing = countPassingStudents(students);
    const top = getTopStudent(students);

    classAverage.textContent = average.toFixed(2);
    passingCount.textContent = passing;
    displayedCount.textContent = students.length;
    topStudent.textContent = top
        ? `${top.name} (${calculateFinalGrade(top).toFixed(2)})`
        : "None";
}

export function displayMessage(message) {
    messageArea.textContent = message;
}
