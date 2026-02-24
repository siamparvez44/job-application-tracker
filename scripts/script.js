let interviewList = [];
let rejectedList = [];
let currentFilter = 'allJobs';

let totalJobCount = document.getElementById("total-job-count");
let interviewJobCount = document.getElementById("interview-job-count");
let rejectedJobCount = document.getElementById("rejected-job-count");

let currentJobCount = document.getElementById("current-job-count");

const allJobsFilterBtn = document.getElementById("all-jobs-btn");
const interviewJobsFilterBtn = document.getElementById("interview-jobs-btn");
const rejectedJobsFilterBtn = document.getElementById("rejected-jobs-btn");

const mainContainer = document.querySelector(".main-container")
const allJobsSection = document.getElementById("all-jobs");
const filteredSection = document.getElementById("filtered-jobs")
const noJobsSection = document.getElementById("no-jobs");

function countJobs() {
    totalJobCount.innerText = allJobsSection.children.length;
    interviewJobCount.innerText = interviewList.length; 
    rejectedJobCount.innerText = rejectedList.length; 
}


function getCurrentJobCount() {
    if (currentFilter == "interview-jobs-btn") {
        currentJobCount.innerText = `${interviewList.length} Jobs`;
        if (interviewList.length != 0) {
            noJobsSection.classList.add("hidden");
            noJobsSection.classList.remove("flex");
        } else {
            noJobsSection.classList.remove("hidden");
            noJobsSection.classList.add("flex");
        }
    } else if (currentFilter == "rejected-jobs-btn") {
        currentJobCount.innerText = `${rejectedList.length} Jobs`;
        if (rejectedList.length != 0) {
            noJobsSection.classList.add("hidden");
            noJobsSection.classList.remove("flex");
        } else {
            noJobsSection.classList.remove("hidden");
            noJobsSection.classList.add("flex");
        }
    } else {
        currentJobCount.innerText = `${allJobsSection.children.length} Jobs`;
        if (allJobsSection.children.length != 0) {
            noJobsSection.classList.add("hidden");
            noJobsSection.classList.remove("flex");
        } else {
            noJobsSection.classList.remove("hidden");
            noJobsSection.classList.add("flex");
        }
    }
} 


countJobs();
getCurrentJobCount();



function toggleTabs(id) {
    allJobsFilterBtn.classList.add('text-slate-500');
    interviewJobsFilterBtn.classList.add('text-slate-500');
    rejectedJobsFilterBtn.classList.add('text-slate-500');

    allJobsFilterBtn.classList.remove('btn-info', 'text-white');
    interviewJobsFilterBtn.classList.remove('btn-info', 'text-white');
    rejectedJobsFilterBtn.classList.remove('btn-info', 'text-white');


    const selectedFilter = document.getElementById(id);

    currentFilter = id;
    selectedFilter.classList.remove('text-slate-500');
    selectedFilter.classList.add('btn-info', 'text-white');
    
    if (id == 'interview-jobs-btn') {
        allJobsSection.classList.add('hidden');
        allJobsSection.classList.remove('flex', "flex-col", "gap-4");
        
        filteredSection.classList.remove('hidden');
        filteredSection.classList.add("flex", "flex-col", "gap-4");

        renderInterviewedJobs();

    } else if (id == 'rejected-jobs-btn') {
        allJobsSection.classList.add('hidden');
        allJobsSection.classList.remove('flex', "flex-col", "gap-4");

        filteredSection.classList.remove('hidden');
        filteredSection.classList.add("flex", "flex-col", "gap-4");
        
        renderRejectedJobs();

    } else {
        allJobsSection.classList.remove('hidden');
        allJobsSection.classList.add('flex', "flex-col", "gap-4");
            
        filteredSection.classList.add('hidden');
        filteredSection.classList.remove("flex", "flex-col", "gap-4");
    }
    getCurrentJobCount();
}

mainContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains("interview-btn")) {
        const parentNode = event.target.parentNode.parentNode;

        const companyName = parentNode.querySelector('.company-name').innerText;
        const position = parentNode.querySelector('.position').innerText;
        const location = parentNode.querySelector('.location').innerText;
        const type = parentNode.querySelector('.type').innerText;
        const salary = parentNode.querySelector('.salary').innerText;
        const description = parentNode.querySelector('.description').innerText;

        parentNode.querySelector('.job-status').innerText = 'Interview';
        parentNode.querySelector('.job-status').classList.add("btn-success", "border-success");
        parentNode.querySelector('.job-status').classList.remove("btn-info", "border-info", "btn-error", "border-error");

        parentNode.classList.add("border-l-4", "border-success");
        parentNode.classList.remove("border-error");

        const jobInfo = {
            companyName,
            position,
            location,
            type,
            salary,
            description,
            status: 'Interview'
        };
        
        const jobExists = interviewList.find(item => (item.companyName == jobInfo.companyName && item.position == jobInfo.position));
        if (!jobExists) {
            interviewList.push(jobInfo);
        }
        
        rejectedList = rejectedList.filter(item => (item.companyName != jobInfo.companyName && item.position != jobInfo.position));
        if (currentFilter == "rejected-jobs-btn") {
            renderRejectedJobs();
        }
        countJobs();
        getCurrentJobCount();
    } else if (event.target.classList.contains("rejected-btn")) {
        const parentNode = event.target.parentNode.parentNode;

        const companyName = parentNode.querySelector('.company-name').innerText;
        const position = parentNode.querySelector('.position').innerText;
        const location = parentNode.querySelector('.location').innerText;
        const type = parentNode.querySelector('.type').innerText;
        const salary = parentNode.querySelector('.salary').innerText;
        const description = parentNode.querySelector('.description').innerText;

        parentNode.querySelector('.job-status').innerText = 'Rejected';
        parentNode.querySelector('.job-status').classList.add("btn-error", "border-error");
        parentNode.querySelector('.job-status').classList.remove("btn-info", "border-info", "btn-success", "border-success");
        parentNode.classList.add("border-l-4", "border-error");
        parentNode.classList.remove("border-success");

        const jobInfo = {
            companyName,
            position,
            location,
            type,
            salary,
            description,
            status: 'Rejected'
        };
        
        const jobExists = rejectedList.find(item => (item.companyName == jobInfo.companyName && item.position == jobInfo.position));
        if (!jobExists) {
            rejectedList.push(jobInfo);
        }
        
        interviewList = interviewList.filter(item => (item.companyName != jobInfo.companyName && item.position != jobInfo.position));
        if (currentFilter == "interview-jobs-btn") {
            renderInterviewedJobs();
        }
        countJobs();
        getCurrentJobCount();
    }
})

function renderInterviewedJobs() {
    filteredSection.innerHTML = '';
    for (let interview of interviewList) {
        let div = document.createElement('div');
        div.innerHTML = `
         <div
            class="bg-base-100 border-base-300 flex flex-col gap-4 p-6 transition-all rounded border-l-4 border-success"
          >
            <div class="flex justify-between">
              <div>
                <h2 class="company-name text-lg font-semibold">
                  ${interview.companyName}
                </h2>
                <h3
                  class="position md:text-base text-slate-500 text-sm font-normal"
                >
                  ${interview.position}
                </h3>
              </div>
              <button
                class="btn btn-circle btn-outline border-base-300 text-neutral-400 hover:bg-red-100 hover:text-red-300 btn-sm md:btn-md"
              >
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
            <p class="text-slate-500 text-sm">
              <span class="location">${interview.location}</span> •
              <span class="type">${interview.type}</span> •
              <span class="salary">${interview.salary}</span>
            </p>
            <div class="space-y-3">
              <button
                class="btn btn-soft btn-success border-success btn-sm md:btn-md job-status font-medium uppercase border"
              >
                ${interview.status}
              </button>
              <p class="description sm:text-sm text-xs">
                ${interview.description}
              </p>
            </div>
            <div class="flex gap-3">
              <button
                class="btn btn-outline btn-success btn-sm md:btn-md interview-btn uppercase"
              >
                Interview
              </button>
              <button
                class="btn btn-outline btn-error btn-sm md:btn-md rejected-btn uppercase"
              >
                Rejected
              </button>
            </div>
          </div>
        `;
        filteredSection.appendChild(div);
    }
}


function renderRejectedJobs() {
    filteredSection.innerHTML = '';
    for (let rejected of rejectedList) {
        let div = document.createElement('div');
        div.innerHTML = `
         <div
            class="bg-base-100 border-base-300 flex flex-col gap-4 p-6 transition-all rounded border-l-4 border-error"
          >
            <div class="flex justify-between">
              <div>
                <h2 class="company-name text-lg font-semibold">
                  ${rejected.companyName}
                </h2>
                <h3
                  class="position md:text-base text-slate-500 text-sm font-normal"
                >
                  ${rejected.position}
                </h3>
              </div>
              <button
                class="btn btn-circle btn-outline border-base-300 text-neutral-400 hover:bg-red-100 hover:text-red-300 btn-sm md:btn-md"
              >
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
            <p class="text-slate-500 text-sm">
              <span class="location">${rejected.location}</span> •
              <span class="type">${rejected.type}</span> •
              <span class="salary">${rejected.salary}</span>
            </p>
            <div class="space-y-3">
              <button
                class="btn btn-soft btn-error border-error btn-sm md:btn-md job-status font-medium uppercase border"
              >
                ${rejected.status}
              </button>
              <p class="description sm:text-sm text-xs">
                ${rejected.description}
              </p>
            </div>
            <div class="flex gap-3">
              <button
                class="btn btn-outline btn-success btn-sm md:btn-md interview-btn uppercase"
              >
                Interview
              </button>
              <button
                class="btn btn-outline btn-error btn-sm md:btn-md rejected-btn uppercase"
              >
                Rejected
              </button>
            </div>
          </div>
        `;
        filteredSection.appendChild(div);
    }
}