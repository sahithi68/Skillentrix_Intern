/* =====================================================
   SAHITHI PORTFOLIO — JAVASCRIPT
===================================================== */


/* ================= THEME ================= */

const themeToggle =
    document.getElementById("themeToggle");


const savedTheme =
    localStorage.getItem("theme");


if (savedTheme === "light") {

    document.body.classList.remove("dark");

    themeToggle.textContent = "🌙";

} else {

    document.body.classList.add("dark");

    themeToggle.textContent = "☀️";
}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const isDark =
        document.body.classList.contains("dark");


    if (isDark) {

        themeToggle.textContent = "☀️";

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        themeToggle.textContent = "🌙";

        localStorage.setItem(
            "theme",
            "light"
        );
    }

});


/* ================= CONTACT FORM ================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const name =
            document.getElementById("name")
            .value
            .trim();


        const email =
            document.getElementById("email")
            .value
            .trim();


        const message =
            document.getElementById("message")
            .value
            .trim();


        if (!name || !email || !message) {

            formMessage.textContent =
                "Please fill in all fields.";

            return;
        }


        const newResponse = {

            id: Date.now(),

            name: name,

            email: email,

            message: message,

            timestamp:
                new Date().toLocaleString()
        };


        let responses =
            JSON.parse(
                localStorage.getItem("responses")
            ) || [];


        responses.push(newResponse);


        localStorage.setItem(
            "responses",
            JSON.stringify(responses)
        );


        formMessage.textContent =
            "✓ Message sent successfully!";


        contactForm.reset();


        setTimeout(() => {

            formMessage.textContent = "";

        }, 4000);

    }
);


/* ================= ADMIN LOGIN ================= */

const adminForm =
    document.getElementById("adminForm");

const loginMessage =
    document.getElementById("loginMessage");

const responsesSection =
    document.getElementById("responsesSection");

const responsesContainer =
    document.getElementById("responsesContainer");


const ADMIN_USERNAME = "admin";

const ADMIN_PASSWORD = "1234";


adminForm.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const username =
            document.getElementById(
                "adminUsername"
            ).value.trim();


        const password =
            document.getElementById(
                "adminPassword"
            ).value.trim();


        if (
            username === ADMIN_USERNAME &&
            password === ADMIN_PASSWORD
        ) {

            loginMessage.textContent =
                "✓ Login successful";


            adminForm.classList.add(
                "hidden"
            );


            responsesSection.classList.remove(
                "hidden"
            );


            sessionStorage.setItem(
                "adminLoggedIn",
                "true"
            );


            displayResponses();


        } else {

            loginMessage.textContent =
                "✕ Invalid username or password.";

            responsesSection.classList.add(
                "hidden"
            );
        }

    }
);


/* ================= DISPLAY RESPONSES ================= */

function displayResponses() {

    responsesContainer.innerHTML = "";


    const responses =
        JSON.parse(
            localStorage.getItem("responses")
        ) || [];


    if (responses.length === 0) {

        responsesContainer.innerHTML = `

            <div class="response-card">

                <h3>No responses yet</h3>

                <p>
                    Messages submitted through
                    the contact form will appear here.
                </p>

            </div>

        `;

        addLogoutButton();

        return;
    }


    const heading =
        document.createElement("div");


    heading.className =
        "response-card";


    heading.innerHTML = `

        <h3>
            ${responses.length}
            Response${responses.length !== 1 ? "s" : ""}
            Received
        </h3>

        <p>
            All messages submitted through
            the contact form.
        </p>

    `;


    responsesContainer.appendChild(
        heading
    );


    responses
        .slice()
        .reverse()
        .forEach((response) => {

            const card =
                document.createElement("div");


            card.className =
                "response-card";


            card.innerHTML = `

                <h3>
                    ${escapeHTML(response.name)}
                </h3>

                <p>
                    <strong>Email:</strong>
                    ${escapeHTML(response.email)}
                </p>

                <p>
                    <strong>Message:</strong>
                    ${escapeHTML(response.message)}
                </p>

                <p class="timestamp">
                    Received:
                    ${escapeHTML(response.timestamp)}
                </p>

            `;


            responsesContainer.appendChild(card);

        });


    addClearButton();

    addLogoutButton();

}


/* ================= CLEAR BUTTON ================= */

function addClearButton() {

    const clearButton =
        document.createElement("button");


    clearButton.textContent =
        "Clear All Responses";


    clearButton.className =
        "secondary-btn";


    clearButton.style.marginTop =
        "20px";


    clearButton.addEventListener(
        "click",
        clearResponses
    );


    responsesContainer.appendChild(
        clearButton
    );
}


/* ================= LOGOUT BUTTON ================= */

function addLogoutButton() {

    const logoutButton =
        document.createElement("button");


    logoutButton.textContent =
        "Logout";


    logoutButton.className =
        "secondary-btn";


    logoutButton.style.marginTop =
        "10px";


    logoutButton.addEventListener(
        "click",
        adminLogout
    );


    responsesContainer.appendChild(
        logoutButton
    );
}


/* ================= CLEAR RESPONSES ================= */

function clearResponses() {

    const confirmation =
        confirm(
            "Are you sure you want to delete all responses?"
        );


    if (!confirmation) {
        return;
    }


    localStorage.removeItem(
        "responses"
    );


    displayResponses();
}


/* ================= LOGOUT ================= */

function adminLogout() {

    sessionStorage.removeItem(
        "adminLoggedIn"
    );


    responsesSection.classList.add(
        "hidden"
    );


    adminForm.classList.remove(
        "hidden"
    );


    adminForm.reset();


    loginMessage.textContent =
        "You have been logged out.";
}


/* ================= SECURITY ================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


/* ================= RESTORE SESSION ================= */

window.addEventListener(
    "load",
    function() {

        const loggedIn =
            sessionStorage.getItem(
                "adminLoggedIn"
            );


        if (loggedIn === "true") {

            adminForm.classList.add(
                "hidden"
            );


            responsesSection.classList.remove(
                "hidden"
            );


            loginMessage.textContent =
                "✓ Admin session restored";


            displayResponses();
        }

    }
);