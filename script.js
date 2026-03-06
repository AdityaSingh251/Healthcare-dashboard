const username = "coalition";
const password = "skills-test";

const auth = btoa(username + ":" + password);

fetch("https://fedskillstest.coalitiontechnologies.workers.dev",{
headers:{
"Authorization":"Basic " + auth
}
})
.then(res => res.json())
.then(data => {

const patient = data.find(p => p.name === "Jessica Taylor");

document.getElementById("name").innerText = patient.name;
document.getElementById("dob").innerText = "DOB: " + patient.date_of_birth;
document.getElementById("gender").innerText = patient.gender;
document.getElementById("phone").innerText = patient.phone_number;
document.getElementById("profilePic").src = patient.profile_picture;

document.getElementById("resp").innerText =
patient.diagnosis_history[0].respiratory_rate.value + " bpm";

document.getElementById("temp").innerText =
patient.diagnosis_history[0].temperature.value + " °F";

document.getElementById("heart").innerText =
patient.diagnosis_history[0].heart_rate.value + " bpm";

const labels = patient.diagnosis_history.map(d => d.month);

const systolic = patient.diagnosis_history.map(
d => d.blood_pressure.systolic.value
);

const diastolic = patient.diagnosis_history.map(
d => d.blood_pressure.diastolic.value
);


const ctx = document.getElementById("bpChart");

new Chart(ctx,{
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

const list = document.getElementById("patientsList");

data.forEach(p=>{
const li = document.createElement("li");
li.innerText = p.name;
list.appendChild(li);
});
});
