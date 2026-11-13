"use strict";

document.addEventListener("DOMContentLoaded", function () {
  var clock = document.querySelector("[data-clock]");
  var year = document.querySelector("[data-year]");

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  function updateClock() {
    if (!clock) return;
    clock.textContent = new Intl.DateTimeFormat("en-BD", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Dhaka"
    }).format(new Date());
  }

  updateClock();
  if (clock) window.setInterval(updateClock, 30000);

  var loginForm = document.querySelector("[data-login-form]");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var username = loginForm.querySelector("[name='username']").value.trim();
      if (window.confirm("Continue with the username “" + username + "”?")) {
        window.alert("This is a demo login form. Please connect it to the school's secure sign-in system.");
      }
    });
  }

  var resultForms = document.querySelectorAll("[data-result-form]");
  var resultOutput = document.querySelector("[data-result-output]");
  var sampleResults = [
    { id: "24018", name: "Nafisa Islam", className: "Eight", grade: "A+", exam: "Annual Examination 2025" },
    { id: "24027", name: "Rafi Ahmed", className: "Seven", grade: "A", exam: "Annual Examination 2025" },
    { id: "24035", name: "Maliha Chowdhury", className: "Nine", grade: "A+", exam: "Annual Examination 2025" },
    { id: "24018", name: "Nafisa Islam", className: "Eight", grade: "A", exam: "Half-Yearly Examination 2025" }
  ];

  function showResult(content) {
    if (resultOutput) resultOutput.innerHTML = content;
  }

  resultForms.forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var selects = form.querySelectorAll("select");
      var selectedExam = form.dataset.resultForm === "class" ? selects[1].value : selects[0].value;
      var matches;

      if (form.dataset.resultForm === "student") {
        var studentId = form.querySelector("input").value.trim();
        matches = sampleResults.filter(function (result) {
          return result.id === studentId && result.exam === selectedExam;
        });
        if (matches.length === 0) {
          showResult('<div class="alert alert-warning" role="status">No sample result found for that student ID and examination. Please check the details or contact the school office.</div>');
          return;
        }
        var student = matches[0];
        showResult('<div class="alert alert-success" role="status"><strong>' + student.name + '</strong> · Student ID ' + student.id + ' · Class ' + student.className + ' · ' + student.exam + ' · Grade <strong>' + student.grade + '</strong><div class="small mt-1">Sample result for demonstration only.</div></div>');
        return;
      }

      var className = selects[0].value;
      matches = sampleResults.filter(function (result) {
        return result.className === className && result.exam === selectedExam;
      });
      if (matches.length === 0) {
        showResult('<div class="alert alert-warning" role="status">There are no sample results for this class and examination. Please contact the school office for official records.</div>');
        return;
      }
      var rows = matches.map(function (result) {
        return "<tr><td>" + result.id + "</td><td>" + result.name + "</td><td>" + result.className + "</td><td><span class=\"grade-pill\">" + result.grade + "</span></td></tr>";
      }).join("");
      showResult('<div class="result-table-wrap"><div class="p-3 fw-bold">Sample results · ' + className + ' · ' + selectedExam + '</div><table class="table align-middle mb-0"><thead><tr><th>Student ID</th><th>Student</th><th>Class</th><th>Grade</th></tr></thead><tbody>' + rows + '</tbody></table></div>');
    });
  });
});
