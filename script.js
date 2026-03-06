const username = "coalition";
const password = "skills-test";

const encoded = btoa(username + ":" + password);

fetch("https://fedskillstest.coalitiontechnologies.workers.dev", {
  headers: {
    "Authorization": "Basic " + encoded
  }
})
.then(res => res.json())
.then(data => {

  const patient = data.find(p => p.name === "Jessica Taylor");

  displayPatient(patient);
  drawChart(patient.diagnosis_history);
  populateDiagnosis(patient.diagnostic_list);
  populatePatients(data);
  populateLabResults(patient.lab_results);

});



/* ================= PATIENT PROFILE ================= */

function displayPatient(patient){

document.getElementById("profilePic").src = patient.profile_picture;
function displayPatient(patient){

document.getElementById("profilePic").src = patient.profile_picture;

document.getElementById("patientName").innerText = patient.name;

document.getElementById("dob").innerText = patient.date_of_birth;

document.getElementById("gender").innerText = patient.gender;

document.getElementById("phone").innerText = patient.phone_number;

document.getElementById("emergency").innerText = patient.emergency_contact;

document.getElementById("insurance").innerText = patient.insurance_type;

}
const latest = patient.diagnosis_history[0];

document.getElementById("heartRate").innerText =
latest.heart_rate.value + " bpm";

document.getElementById("temperature").innerText =
latest.temperature.value + "°F";

document.getElementById("respiratoryRate").innerText =
latest.respiratory_rate.value + " bpm";

}



/* ================= CHART ================= */

function drawChart(history){

const labels = history.map(item => item.month);

const systolic = history.map(item => item.blood_pressure.systolic.value);
const diastolic = history.map(item => item.blood_pressure.diastolic.value);

const ctx = document.getElementById("bpChart");

new Chart(ctx,{
type:"line",

data:{
labels:labels,
datasets:[

{
label:"Systolic",
data:systolic,
borderColor:"#e46dd5",
fill:false
},

{
label:"Diastolic",
data:diastolic,
borderColor:"#4a8df8",
fill:false
}

]

}

});

}



/* ================= DIAGNOSIS LIST ================= */

function populateDiagnosis(list){

const table = document.getElementById("diagnosisList");

table.innerHTML = "";

list.forEach(item => {

table.innerHTML += `
<tr>
<td>${item.name}</td>
<td>${item.description}</td>
<td>${item.status}</td>
</tr>
`;

});

}



/* ================= PATIENT SIDEBAR ================= */

function populatePatients(patients){

const ul = document.getElementById("patientList");

ul.innerHTML = "";

patients.forEach(p => {

const active = p.name === "Jessica Taylor" ? "activePatient" : "";

ul.innerHTML += `<li class="${active}">${p.name}</li>`;

});

}



/* ================= LAB RESULTS ================= */

function populateLabResults(labs){

const labList = document.getElementById("labResults");

labList.innerHTML = "";

labs.forEach(item => {

labList.innerHTML += `
<li class="lab-item">
${item}
<i class="fa-solid fa-download"></i>
</li>
`;

});

}
