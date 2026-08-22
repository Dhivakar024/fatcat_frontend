const savedUser = localStorage.getItem("fatcatUser");

if (!savedUser) {
    window.location.href =  "../login/login.html";
}

const user = JSON.parse(savedUser);

// ======== USER NAME========
const firstName =  user.firstName || "Student";
document.getElementById( "welcomeName").textContent = firstName;
document.getElementById( "profileName").textContent = firstName;
document.getElementById( "profileInitial").textContent = firstName.charAt(0).toUpperCase();

// ====DATE==========
const today = new Date();
document.getElementById( "currentDate").textContent =
    today.toLocaleDateString(
        "en-IN",
        {
            day: "numeric",
            month: "short",
            year: "numeric"
        }
    );

// =======COURSE DATA==============
const courses = [
    {
        id: 1,
        title: "Stock Market Basics",
        category: "Stock Market",
        description: "Learn the fundamentals of the stock market.",
        icon: "fa-chart-line",
        progress: 65,
        lessons: "13 / 20 Lessons",
        enrolled: true
    },

    {
        id: 2,
        title: "Mutual Fund Mastery",
        category:"Mutual Funds",
        description: "Understand mutual funds and smart investing.",
        icon: "fa-chart-pie",
        progress: 30,
        lessons: "6 / 20 Lessons",
        enrolled: true
    },

    {
        id: 3,
        title: "Personal Finance",
        category: "Finance",
        description: "Build strong personal money management skills.",
        icon:"fa-wallet",
        progress: 0,
        lessons:"0 / 15 Lessons",
        enrolled: false
    },

    {
        id: 4,
        title: "Investment Planning",
        category: "Investment",
        description: "Learn how to create a long-term investment plan.",
        icon: "fa-money-bill-trend-up",
        progress: 0,
        lessons: "0 / 18 Lessons",
        enrolled: false
    },

    {
        id: 5,
        title: "Insurance Essentials",
        category: "Insurance",
        description: "Understand insurance and financial protection.",
        icon: "fa-shield-halved",
        progress: 0,
        lessons: "0 / 14 Lessons",
        enrolled: false
    },

    {
        id: 6,
        title: "Financial Freedom",
        category: "Advanced",
        description: "Create a roadmap towards financial independence.",
        icon: "fa-bullseye",
        progress: 0,
        lessons: "0 / 16 Lessons",
        enrolled: false
    }
];

// ====/ GET ENROLLED COURSES=====
function getEnrolledCourses() {
    return courses.filter(
        course => course.enrolled
    );
}

// ========== GET RECOMMENDED=========
function getRecommendedCourses() {
    return courses.filter(
        course => !course.enrolled
    );
}

// ======= UPDATE STATS========
function updateStats() {
    const enrolled = getEnrolledCourses();
    const completed =  enrolled.filter( course => course.progress === 100 );
    const progress = enrolled.filter( course => course.progress > 0 && course.progress < 100 );

    document.getElementById( "enrolledCount" ).textContent = enrolled.length;
    document.getElementById( "completedCount" ).textContent = completed.length;
    document.getElementById( "progressCount" ).textContent = progress.length;
}

// ======== COURSE CARD==========
function createCourseCard(course) {
    const buttonText = course.enrolled ? "Continue Learning" : "Enroll Now";
    const buttonClass = course.enrolled ? "course-btn" : "course-btn enroll";

    return `
        <div class="course-card">
            <div class="course-image">
                <i class="fa-solid ${course.icon}"></i>
            </div>

            <div class="course-body">
                <span class="course-category"> ${course.category} </span>
                <h3>  ${course.title}  </h3>
                <p> ${course.description} </p>

                ${
                    course.enrolled
                    ?
                    `
                    <div class="course-progress">
                        <div class="course-progress-top">
                            <span> ${course.lessons}  </span>
                            <span> ${course.progress}% </span>
                        </div>

                        <div class="course-progress-bar">
                            <div
                                class="course-progress-fill"
                                style="width:${course.progress}%"
                            ></div>
                        </div>
                    </div>
                    `
                    :
                    ""
                }

                <button
                    class="${buttonClass}"
                    onclick="handleCourse(${course.id})"
                >
                    ${buttonText}
                </button>
            </div>
        </div>

    `;
}

// =====/ DISPLAY MY COURSES=====
function renderMyCourses() {
    const container = document.getElementById( "myCoursesGrid" );
    const enrolled = getEnrolledCourses();
    if (enrolled.length === 0) {
        container.innerHTML = `
            <div class="empty-course">
                <h3> You haven't enrolled in any courses yet. </h3>
                <p> Explore our courses and start learning today. </p>
            </div>
        `;
        return;
    }
    container.innerHTML =  enrolled .map(createCourseCard) .join("");

}


// ===== DISPLAY RECOMMENDED======
function renderRecommended() {
    const container = document.getElementById( "recommendedGrid" );
    const recommended = getRecommendedCourses();
    container.innerHTML = recommended .map(createCourseCard) .join("");
}

// =====CONTINUE LEARNING======
function renderContinueLearning() {
    const container = document.getElementById( "continueLearning" );
    const course = getEnrolledCourses() .find( course => course.progress > 0 && course.progress < 100);
    if (!course) {
        container.innerHTML = `
            <div class="continue-info">
                <small>  START YOUR JOURNEY </small>
                <h3>  No course in progress</h3>
                <p> Enroll in a course and start learning. </p>
            </div>

            <button
                class="continue-btn"
                onclick="document.getElementById('recommended').scrollIntoView()"
            >
                Explore Courses
            </button>
        `;
        return;
    }

    container.innerHTML = `

        <div class="continue-info">
            <small> CONTINUE WHERE YOU LEFT OFF </small>
            <h3> ${course.title} </h3>
            <p> ${course.lessons} </p>

            <div class="progress-container">
                <div class="progress-bar">
                    <div
                        class="progress-fill"
                        style="width:${course.progress}%"
                    ></div>

                </div>


                <div class="progress-text">
                    <span>  ${course.progress}% completed</span>
                    <span> Keep going! </span>
                </div>
            </div>

        </div>

        <button
            class="continue-btn"
            onclick="handleCourse(${course.id})"
        >
            Continue Learning
        </button>
    `;
}

// ===== COURSE ACTION=========
function handleCourse(id) {

    const course = courses.find( course => course.id === id );
    if (!course) {
        return;
    }

    if (!course.enrolled) {
        course.enrolled = true;
        course.progress = 0;
        course.lessons = "0 / 15 Lessons";
        alert( `${course.title} enrolled successfully!`);
        updateDashboard();
        return;
    }
    alert( `Opening ${course.title}...` );
}

// ========== UPDATE EVERYTHING=========
function updateDashboard() {
    updateStats();
    renderMyCourses();
    renderRecommended();
    renderContinueLearning();
}

// ========== COURSE SEARCH===========
const courseSearch = document.getElementById( "courseSearch" );
courseSearch.addEventListener(
    "input",
    function () {
        const value =  this.value  .toLowerCase() .trim();
        const cards = document.querySelectorAll( ".course-card" );
        cards.forEach(card => {
            const text = card.textContent .toLowerCase();
            card.style.display =  text.includes(value) ? "" : "none";
        });
    }
);

// ==========/ MOBILE SIDEBAR========
const menuBtn =
    document.getElementById(
        "menuBtn"
    );


const sidebar = document.querySelector( ".sidebar" );

menuBtn.addEventListener(
    "click",
    () => {
        sidebar.classList.toggle(
            "open"
        );
    }
);

document.getElementById(
    "logoutBtn"
).addEventListener(
    "click",
    () => {
        localStorage.removeItem( "isLoggedIn" );
        window.location.href ="../login/login.html";
    }
);

updateDashboard();