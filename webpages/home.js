function add_skill() {
  let skillForm = document.querySelector(".skillForm");
  skillForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let skill_input = document
      .querySelector(".skill_input")
      .value.toUpperCase();

    fetch(`${webhosting-production.up.railway.app}/add_skill`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ skill_name: skill_input }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "success") {
          read_skills();
          skillForm.reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

add_skill();

function read_skills() {
  let skills_list = document.querySelector(".skills_list");
  skills_list.innerHTML = "";

  fetch(`${webhosting-production.up.railway.app}/read_skill`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      for (let i = data.skills.length - 1; i >= 0; i--) {
        let skill_wrapper = document.createElement("div");
        skill_wrapper.className = "skill_wrapper";

        let item = document.createElement("div");
        item.className = "item";
        item.innerText = data.skills[i].skill_name;

        let delBtn = document.createElement("div");
        delBtn.className = "delBtn";
        delBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>
        </svg>
        `;

        let id = data.skills[i].id;

        delBtn.addEventListener("click", () => {
          fetch(`${webhosting-production.up.railway.app}/delete_skill?id=${id}`, {
            method: "DELETE",
          })
            .then((response) => response.json())
            .then((data) => {
              read_skills();
            })
            .catch((error) => {
              console.log(error);
            });
        });

        skill_wrapper.append(item, delBtn);

        skills_list.append(skill_wrapper);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

read_skills();
