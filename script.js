async function getPatients(){

const response = await fetch(
"https://fedskillstest.coalitiontechnologies.workers.dev",
{
headers:{
"Authorization":"Basic " + btoa("coalition:skills-test")
}
}
);

const data = await response.json();

displayPatients(data);

const jessica = data.find(p => p.name === "Jessica Taylor");

displayPatientInfo(jessica);
displayVitals(jessica);
displayDiagnostics(jessica);
displayChart(jessica);

}

getPatients();



function displayPatients(patients){

const list = document.getElementById("patientList");

patients.forEach(p => {

const li = document.createElement("li");

li.textContent = p.name;

list.appendChild(li);

});

}



function displayPatientInfo(patient){

document.getElementById("patientName").innerText = patient.name;
document.getElementById("dob").innerText = patient.date_of_birth;
document.getElementById("gender").innerText = patient.gender;
document.getElementById("phone").innerText = patient.phone_number;
document.getElementById("insurance").innerText = patient.insurance_type;

}



function displayVitals(patient){

const latest = patient.diagnosis_history[0];

document.getElementById("respRate").innerText =
latest.respiratory_rate.value + " bpm";

document.getElementById("temperature").innerText =
latest.temperature.value + " °F";

document.getElementById("heartRate").innerText =
latest.heart_rate.value + " bpm";

}



function displayDiagnostics(patient){

const table = document.getElementById("diagnosticTable");

patient.diagnostic_list.forEach(d => {

const row = `
<tr>
<td>${d.name}</td>
<td>${d.description}</td>
<td>${d.status}</td>
</tr>
`;

table.innerHTML += row;

});

}



function displayChart(patient){

const history = patient.diagnosis_history;

const labels = history.map(h => h.month);

const systolic = history.map(
h => h.blood_pressure.systolic.value
);

const diastolic = history.map(
h => h.blood_pressure.diastolic.value
);

new Chart(document.getElementById("bpChart"), {

type:"line",

data:{
labels:labels,
datasets:[
{
label:"Systolic",
data:systolic,
borderColor:"purple",
fill:false
},
{
label:"Diastolic",
data:diastolic,
borderColor:"blue",
fill:false
}
]
}

});

}
