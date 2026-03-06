const username = "coalition";
const password = "skills-test";

const encoded = btoa(username + ":" + password);

fetch("https://fedskillstest.coalitiontechnologies.workers.dev",{

headers:{
"Authorization":"Basic " + encoded
}

})
.then(res => res.json())
.then(data => {

const patient = data.find(p => p.name === "Jessica Taylor");

displayPatient(patient);

drawChart(patient.diagnosis_history);

populateDiagnosis(patient.diagnostic_list);

populatePatients(data);

});



function displayPatient(patient){

document.getElementById("patientName").innerText = patient.name;

document.getElementById("dob").innerText = patient.date_of_birth;

document.getElementById("gender").innerText = patient.gender;

document.getElementById("phone").innerText = patient.phone_number;


const latest = patient.diagnosis_history[0];

document.getElementById("heartRate").innerText =
latest.heart_rate.value + " bpm";

document.getElementById("temperature").innerText =
latest.temperature.value + "°F";

document.getElementById("respiratoryRate").innerText =
latest.respiratory_rate.value + " bpm";

}



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



function populateDiagnosis(list){

const table = document.getElementById("diagnosisList");

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



function populatePatients(patients){

const ul = document.getElementById("patientList");

patients.forEach(p => {

ul.innerHTML += `<li>${p.name}</li>`;

});
  function displayPatient(patient){

document.getElementById("patientName").innerText = patient.name;
document.getElementById("dob").innerText = patient.date_of_birth;
document.getElementById("gender").innerText = patient.gender;
document.getElementById("phone").innerText = patient.phone_number;

document.getElementById("profileImage").src = patient.profile_picture;

const latest = patient.diagnosis_history[0];

document.getElementById("heartRate").innerText =
latest.heart_rate.value + " bpm";

document.getElementById("temperature").innerText =
latest.temperature.value + "°F";

document.getElementById("respiratoryRate").innerText =
latest.respiratory_rate.value + " bpm";


/* Lab Results */

const labList = document.getElementById("labResults");

patient.lab_results.forEach(item => {

labList.innerHTML += `
<li>
${item}
<i class="fa-solid fa-download"></i>
</li>
`;

});

}

}
