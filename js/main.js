// Main/controller module: connects data, utilities, display, and UI events.

import { students } from "./students.js";
import {
    searchStudents,
    filterStudentsByBlock,
    filterStudentsByStatus
} from "./gradeUtils.js";
import {
    displayStudents,
    displaySummary,
    displayMessage
} from "./display.js";

const searchInput = document.getElementById("searchInput");
const blockFilter = document.getElementById("blockFilter");
const statusFilter = document.getElementById("statusFilter");
const applyBtn = document.getElementById("applyBtn");
const resetBtn = document.getElementById("resetBtn");

function getFilteredStudents() {
    let result = searchStudents(students, searchInput.value);
    result = filterStudentsByBlock(result, blockFilter.value);
    result = filterStudentsByStatus(result, statusFilter.value);
    return result;
}

function updateDashboard() {
    const result = getFilteredStudents();

    displayStudents(result);
    displaySummary(result);

    if (result.length === 0) {
        displayMessage("No students found");
    } else {
        displayMessage("");
    }
}

function resetDashboard() {
    searchInput.value = "";
    blockFilter.value = "All";
    statusFilter.value = "All";

    displayStudents(students);
    displaySummary(students);
    displayMessage("");
}

applyBtn.addEventListener("click", updateDashboard);

resetBtn.addEventListener("click", resetDashboard);

searchInput.addEventListener("input", updateDashboard);

blockFilter.addEventListener("change", updateDashboard);

statusFilter.addEventListener("change", updateDashboard);

// Initial page load.
displayStudents(students);
displaySummary(students);
displayMessage("");
