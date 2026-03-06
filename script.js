const username = "coalition";
const password = "skills-test";

const auth = btoa(username + ":" + password);

fetch("https://fedskillstest.coalitiontechnologies.workers.dev",{

headers:{
Authorization:"Basic "+auth
}

})
.then(res=>res.json())
.then(data=>{

const patient = data.find(p=>p.name==="Jessica Taylor");
  console.log(patient.diagnostic_list);


/* PROFILE */

document.getElementById("name").innerText = patient.name;

document.getElementById("dob").innerText =
"Date of Birth: "+patient.date_of_birth;

document.getElementById("gender").innerText =
"Gender: "+patient.gender;

document.getElementById("phone").innerText =
"Phone: "+patient.phone_number;

document.getElementById("profilePic").src =
patient.profile_picture;



/* METRICS */

document.getElementById("resp").innerText =
patient.diagnosis_history[0].respiratory_rate.value+" bpm";

document.getElementById("temp").innerText =
patient.diagnosis_history[0].temperature.value+" °F";

document.getElementById("heart").innerText =
patient.diagnosis_history[0].heart_rate.value+" bpm";



/* CHART */

const months = patient.diagnosis_history.map(d=>d.month);

const systolic = patient.diagnosis_history.map(
d=>d.blood_pressure.systolic.value
);

const diastolic = patient.diagnosis_history.map(
d=>d.blood_pressure.diastolic.value
);

const ctx = document.getElementById("bpChart");

new Chart(ctx,{

type:"line",

data:{

labels:months,

datasets:[

{
label:"Systolic",
data:systolic,
borderColor:"#8A5CF6",
tension:0.4
},

{
label:"Diastolic",
data:diastolic,
borderColor:"#00BCD4",
tension:0.4
}

]

}

});



/* PATIENT LIST */

const list = document.getElementById("patientsList");

data.forEach(p=>{

const li = document.createElement("li");

li.innerHTML=`
<img src="${p.profile_picture}">
<span>${p.name}</span>
`;

list.appendChild(li);

});



/* DIAGNOSTIC LIST */

const table = document.getElementById("diagnosticList");

patient.diagnostic_list.forEach(d => {

const row = document.createElement("tr");

row.innerHTML = `
<td>${d.problem}</td>
<td>${d.description}</td>
<td>${d.status}</td>
`;

table.appendChild(row);

});


/* LAB RESULTS */

const labs = document.getElementById("labResults");

patient.lab_results.forEach(l=>{

const div = document.createElement("div");

div.className="lab-item";

div.innerHTML=`

<span>${l}</span>

<span>⬇</span>

`;

labs.appendChild(div);

});

});
