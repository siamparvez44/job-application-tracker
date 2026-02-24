const allJobsBtn = document.getElementById("all-jobs")
const interviewJobsBtn = document.getElementById("interview-jobs")
const rejectedJobsBtn = document.getElementById("rejected-jobs")

// const buttons = document.querySelectorAll(".tab");

const buttons = [allJobsBtn, interviewJobsBtn, rejectedJobsBtn]

buttons.forEach(button => {
    button.addEventListener("click", function () {
        buttons.forEach(button => button.classList.remove("btn-info", "text-white"))
        buttons.forEach(button => button.classList.add("text-slate-500"))

        this.classList.add("btn-info", "text-white");
    })
})