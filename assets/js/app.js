const DEFAULT_DATA = {
  name: "Jeem Babu 21",
  title: "Creator • Developer • Professional",
  bioShort: "Welcome to my personal digital world.",
  bioFull: "This is my personal website. You can add your own information, skills, experience and projects here.",
  location: "Bangladesh",
  phone: "Your Phone",
  email: "Your Email",

  social: {
    facebook: "",
    instagram: "",
    tiktok: "",
    youtube: "",
    whatsapp: "",
    telegram: ""
  },

  skills: [
    "HTML",
    "CSS",
    "JavaScript"
  ],

  education: [
    "Add your education"
  ],

  experience: [
    "Add your experience"
  ],

  projects: [],

  theme: "vip"
};


/* =========================
   LOAD / SAVE
========================= */

function loadData() {
  try {
    const saved = localStorage.getItem("jeemSiteData");

    if (!saved) {
      return JSON.parse(JSON.stringify(DEFAULT_DATA));
    }

    const data = JSON.parse(saved);

    return {
      ...DEFAULT_DATA,
      ...data,
      social: {
        ...DEFAULT_DATA.social,
        ...(data.social || {})
      }
    };

  } catch (error) {
    return JSON.parse(JSON.stringify(DEFAULT_DATA));
  }
}


function saveData(data) {
  localStorage.setItem(
    "jeemSiteData",
    JSON.stringify(data)
  );
}


/* =========================
   SECURITY NOTE
========================= */

const ADMIN_PASSWORD = "jeem21";


/* =========================
   HTML ESCAPE
========================= */

function escapeHTML(value) {

  if (value === null || value === undefined) {
    return "";
  }

  return String(value).replace(
    /[&<>"']/g,
    function(char) {

      const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
      };

      return map[char];
    }
  );
}


/* =========================
   SOCIAL URL SAFETY
========================= */

function safeURL(url) {

  if (!url) return "";

  const value = String(url).trim();

  if (
    value.startsWith("https://") ||
    value.startsWith("http://") ||
    value.startsWith("mailto:") ||
    value.startsWith("tel:")
  ) {
    return value;
  }

  return "";
}


/* =========================
   RENDER WEBSITE
========================= */

function render() {

  const data = loadData();


  /* BASIC */

  const elements = {

    navName: data.name,
    navTitle: data.title,

    homeName: data.name,
    homeTitle: data.title,
    homeBio: data.bioShort,

    aboutName: data.name,
    aboutBio: data.bioFull,

    infoLocation: data.location,
    infoPhone: data.phone,
    infoEmail: data.email,

    contactEmail: data.email,
    footerName: data.name

  };


  Object.keys(elements).forEach(function(id) {

    const element = document.getElementById(id);

    if (element) {
      element.textContent = elements[id] || "";
    }

  });


  /* PROFILE PHOTO */

  const profilePhoto =
    document.getElementById("profilePhoto");

  const aboutPhoto =
    document.getElementById("aboutPhoto");

  const photo =
    "assets/images/profile.jpg";


  if (profilePhoto) {
    profilePhoto.src = photo;
  }

  if (aboutPhoto) {
    aboutPhoto.src = photo;
  }


  /* SOCIAL */

  renderSocial(
    document.getElementById("socialLinks"),
    data.social
  );

  renderSocial(
    document.getElementById("contactSocial"),
    data.social
  );


  /* SKILLS */

  const skills =
    document.getElementById("skills");

  if (skills) {

    skills.innerHTML = "";

    (data.skills || []).forEach(function(skill) {

      const item =
        document.createElement("span");

      item.className = "chip";

      item.textContent = skill;

      skills.appendChild(item);

    });

  }


  /* EDUCATION */

  renderList(
    document.getElementById("education"),
    data.education
  );


  /* EXPERIENCE */

  renderList(
    document.getElementById("experience"),
    data.experience
  );


  /* PROJECTS */

  renderProjects(data.projects);


  /* THEME */

  applyTheme(data.theme);

}


/* =========================
   SOCIAL RENDER
========================= */

function renderSocial(container, social) {

  if (!container) return;

  container.innerHTML = "";

  const icons = {

    facebook: "📘",
    instagram: "📷",
    tiktok: "🎵",
    youtube: "▶️",
    whatsapp: "💬",
    telegram: "✈️"

  };


  Object.keys(icons).forEach(function(platform) {

    const url =
      safeURL(social?.[platform]);

    if (!url) return;


    const link =
      document.createElement("a");

    link.className = "social-btn";

    link.href = url;

    link.target = "_blank";

    link.rel = "noopener noreferrer";

    link.textContent =
      icons[platform] +
      " " +
      platform.charAt(0).toUpperCase() +
      platform.slice(1);


    container.appendChild(link);

  });

}


/* =========================
   LIST RENDER
========================= */

function renderList(container, list) {

  if (!container) return;

  container.innerHTML = "";

  if (!list || !list.length) {

    container.innerHTML =
      '<div class="item">No information added yet.</div>';

    return;
  }


  list.forEach(function(value) {

    const item =
      document.createElement("div");

    item.className = "item";

    item.textContent = value;

    container.appendChild(item);

  });

}


/* =========================
   PROJECTS
========================= */

function renderProjects(projects) {

  const grid =
    document.getElementById("projectsGrid");

  if (!grid) return;

  grid.innerHTML = "";


  if (!projects || !projects.length) {

    grid.innerHTML = `
      <div class="card glass">
        <div>
          <h4>No projects yet</h4>
          <p>Projects can be added from the hidden Edit panel.</p>
        </div>
      </div>
    `;

    return;
  }


  projects.forEach(function(project) {

    const card =
      document.createElement("article");

    card.className =
      "card glass";


    const image =
      escapeHTML(
        project.image ||
        "assets/images/project.jpg"
      );


    const title =
      escapeHTML(
        project.title ||
        "Untitled Project"
      );


    const description =
      escapeHTML(
        project.description ||
        "No description."
      );


    const demo =
      safeURL(project.demo);

    const github =
      safeURL(project.github);


    let buttons = "";


    if (demo) {

      buttons += `
        <a
          class="btn primary"
          href="${escapeHTML(demo)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Live Demo
        </a>
      `;

    }


    if (github) {

      buttons += `
        <a
          class="btn secondary"
          href="${escapeHTML(github)}"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      `;

    }


    card.innerHTML = `

      <img
        src="${image}"
        alt="${title}"
        loading="lazy"
      >

      <div>

        <h4>${title}</h4>

        <p>${description}</p>

        <div
          style="
            display:flex;
            flex-wrap:wrap;
            gap:8px;
            margin-top:15px;
          "
        >
          ${buttons}
        </div>

      </div>

    `;


    grid.appendChild(card);

  });

}


/* =========================
   THEME
========================= */

function applyTheme(theme) {

  const site =
    document.getElementById("site");

  if (!site) return;


  site.classList.remove(
    "vip-style",
    "premium-style",
    "theme-auto",
    "theme-dark",
    "theme-light"
  );


  document.body.style.background = "";


  if (theme === "vip") {

    site.classList.add("vip-style");

    setColors(
      "#ffd166",
      "#7b2ff7"
    );

  }


  else if (theme === "premium") {

    site.classList.add("premium-style");

    setColors(
      "#00e0b8",
      "#0066ff"
    );

  }


  else if (theme === "auto") {

    site.classList.add("theme-auto");

    setColors(
      "#ff5f6d",
      "#7b61ff"
    );

  }


  else if (theme === "dark") {

    site.classList.add("theme-dark");

    setColors(
      "#9be15d",
      "#00b09b"
    );

  }


  else if (theme === "light") {

    site.classList.add("theme-light");

    setColors(
      "#4447ff",
      "#ff7ab6"
    );

  }

}


function setColors(color1, color2) {

  document.documentElement.style.setProperty(
    "--accent1",
    color1
  );

  document.documentElement.style.setProperty(
    "--accent2",
    color2
  );

}


/* =========================
   EDITOR
========================= */

function openPasswordModal() {

  const modal =
    document.getElementById("passwordModal");

  const input =
    document.getElementById("passwordInput");

  if (!modal || !input) return;

  modal.classList.remove("hidden");

  input.value = "";

  setTimeout(function() {
    input.focus();
  }, 100);

}


function closePasswordModal() {

  const modal =
    document.getElementById("passwordModal");

  const input =
    document.getElementById("passwordInput");

  if (modal) {
    modal.classList.add("hidden");
  }

  if (input) {
    input.value = "";
  }

}


function openEditor() {

  const editor =
    document.getElementById("editor");

  if (!editor) return;

  editor.classList.remove("hidden");

  fillEditorFields();

}


function closeEditor() {

  const editor =
    document.getElementById("editor");

  if (editor) {
    editor.classList.add("hidden");
  }

}


/* =========================
   FILL EDITOR
========================= */

function fillEditorFields() {

  const data = loadData();


  setValue("editName", data.name);

  setValue("editTitle", data.title);

  setValue("editBio", data.bioShort);

  setValue("editAbout", data.bioFull);

  setValue("editLocation", data.location);

  setValue("editPhone", data.phone);

  setValue("editEmail", data.email);


  setValue(
    "editFacebook",
    data.social.facebook
  );

  setValue(
    "editInstagram",
    data.social.instagram
  );

  setValue(
    "editTikTok",
    data.social.tiktok
  );

  setValue(
    "editYouTube",
    data.social.youtube
  );

  setValue(
    "editWhatsApp",
    data.social.whatsapp
  );

  setValue(
    "editTelegram",
    data.social.telegram
  );


  setValue(
    "editSkills",
    (data.skills || []).join(", ")
  );


  setValue(
    "editEducation",
    (data.education || []).join("\n")
  );


  setValue(
    "editExperience",
    (data.experience || []).join("\n")
  );


  setValue(
    "editProjects",
    (data.projects || [])
      .map(function(project) {

        return [
          project.title || "",
          project.description || "",
          project.image || "",
          project.demo || "",
          project.github || ""

        ].join(" | ");

      })
      .join("\n")
  );


  setValue(
    "themeSelect",
    data.theme || "vip"
  );

}


function setValue(id, value) {

  const element =
    document.getElementById(id);

  if (element) {
    element.value = value || "";
  }

}


/* =========================
   SAVE EDITOR
========================= */

function saveEditor() {

  const data = loadData();


  data.name =
    getValue("editName");

  data.title =
    getValue("editTitle");

  data.bioShort =
    getValue("editBio");

  data.bioFull =
    getValue("editAbout");

  data.location =
    getValue("editLocation");

  data.phone =
    getValue("editPhone");

  data.email =
    getValue("editEmail");


  data.social.facebook =
    getValue("editFacebook");

  data.social.instagram =
    getValue("editInstagram");

  data.social.tiktok =
    getValue("editTikTok");

  data.social.youtube =
    getValue("editYouTube");

  data.social.whatsapp =
    getValue("editWhatsApp");

  data.social.telegram =
    getValue("editTelegram");


  data.skills =
    getValue("editSkills")
      .split(",")
      .map(function(item) {
        return item.trim();
      })
      .filter(Boolean);


  data.education =
    getValue("editEducation")
      .split("\n")
      .map(function(item) {
        return item.trim();
      })
      .filter(Boolean);


  data.experience =
    getValue("editExperience")
      .split("\n")
      .map(function(item) {
        return item.trim();
      })
      .filter(Boolean);


  data.projects =
    getValue("editProjects")
      .split("\n")
      .map(function(line) {

        const parts =
          line.split("|")
            .map(function(part) {
              return part.trim();
            });


        return {

          title: parts[0] || "",

          description: parts[1] || "",

          image: parts[2] || "",

          demo: parts[3] || "",

          github: parts[4] || ""

        };

      })
      .filter(function(project) {

        return (
          project.title ||
          project.description
        );

      });


  data.theme =
    getValue("themeSelect") ||
    "vip";


  saveData(data);

  render();

  closeEditor();


  alert(
    "Changes saved on this device."
  );

}


function getValue(id) {

  const element =
    document.getElementById(id);

  return element
    ? element.value.trim()
    : "";

}


/* =========================
   RESET
========================= */

function resetWebsite() {

  const confirmReset =
    confirm(
      "Reset all website information?"
    );

  if (!confirmReset) return;


  localStorage.removeItem(
    "jeemSiteData"
  );


  render();

  fillEditorFields();

}


/* =========================
   EVENTS
========================= */

document.addEventListener(
  "DOMContentLoaded",
  function() {


    render();


    /* SECRET LINE */

    const secret =
      document.getElementById(
        "secret-line"
      );


    if (secret) {

      let lastTap = 0;


      secret.addEventListener(
        "touchend",
        function(event) {

          event.preventDefault();

          const now =
            Date.now();


          if (
            now - lastTap <
            450
          ) {

            openPasswordModal();

          }


          lastTap = now;

        }
      );


      secret.addEventListener(
        "dblclick",
        function() {

          openPasswordModal();

        }
      );

    }


    /* PASSWORD */

    const passwordInput =
      document.getElementById(
        "passwordInput"
      );


    const passwordOK =
      document.getElementById(
        "pwOk"
      );


    const passwordCancel =
      document.getElementById(
        "pwCancel"
      );


    if (passwordCancel) {

      passwordCancel.addEventListener(
        "click",
        closePasswordModal
      );

    }


    if (passwordOK) {

      passwordOK.addEventListener(
        "click",
        function() {

          const password =
            passwordInput
              ? passwordInput.value
              : "";


          if (
            password ===
            ADMIN_PASSWORD
          ) {

            closePasswordModal();

            openEditor();

          }

          else {

            alert(
              "Incorrect password."
            );

          }

        }
      );

    }


    if (passwordInput) {

      passwordInput.addEventListener(
        "keydown",
        function(event) {

          if (
            event.key ===
            "Enter"
          ) {

            if (passwordOK) {
              passwordOK.click();
            }

          }

          if (
            event.key ===
            "Escape"
          ) {

            closePasswordModal();

          }

        }
      );

    }


    /* EDITOR */

    const closeButton =
      document.getElementById(
        "closeEditor"
      );


    if (closeButton) {

      closeButton.addEventListener(
        "click",
        closeEditor
      );

    }


    const saveButton =
      document.getElementById(
        "saveBtn"
      );


    if (saveButton) {

      saveButton.addEventListener(
        "click",
        saveEditor
      );

    }


    const resetButton =
      document.getElementById(
        "resetBtn"
      );


    if (resetButton) {

      resetButton.addEventListener(
        "click",
        resetWebsite
      );

    }


    /* THEME LIVE PREVIEW */

    const themeSelect =
      document.getElementById(
        "themeSelect"
      );


    if (themeSelect) {

      themeSelect.addEventListener(
        "change",
        function() {

          applyTheme(
            themeSelect.value
          );

        }
      );

    }


    /* DARK / LIGHT BUTTON */

    const modeButton =
      document.getElementById(
        "modeBtn"
      );


    if (modeButton) {

      modeButton.addEventListener(
        "click",
        function() {

          const data =
            loadData();


          if (
            data.theme ===
            "light"
          ) {

            data.theme = "dark";

          }

          else {

            data.theme = "light";

          }


          saveData(data);

          render();

        }
      );

    }


  }
);
