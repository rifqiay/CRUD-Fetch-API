const url =
  "https://crudcrud.com/api/fb2e86fe08644c6eb2e1fb24d91d8899/postingan";

const listPost = document.getElementById("container-postingan");
const inputJudul = document.getElementById("judul");
const inputContent = document.getElementById("content");
const btnUpdate = document.getElementById("btnUpdate");
const addPostForm = document.getElementById("addPost");

const resetInput = () => {
  document.getElementById("judul").value = "";
  document.getElementById("content").value = "";
};

// GET
const getData = () => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((element) => {
        const col = document.createElement("div");
        col.classList.add("col");
        col.classList.add("col-lg-6");
        col.classList.add("col-sm-12");
        col.classList.add("col-12");
        col.classList.add("mt-3");

        const card = document.createElement("div");
        card.classList.add("card");
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");
        cardBody.setAttribute("data-id", element._id);
        col.appendChild(card);
        card.appendChild(cardBody);

        cardBody.innerHTML = `
  <h1 class="judul">${element.judul}</h1>
  <p class="content">${element.content}</p>
  <button class="btn btn-warning btn-sm" id="edit">Edit</button>
  <button class="btn btn-danger btn-sm" id="hapus">Hapus</button>
  `;
        listPost.appendChild(col);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
getData();

// POST
addPostForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const judul = document.getElementById("judul").value;
  const content = document.getElementById("content").value;
  const newData = {
    judul: judul,
    content: content,
  };
  console.log(newData);
  fetch(url, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(newData),
  })
    .then((res) => res.json())
    .then((data) => {
      alert(`Berhasil Menambahkan Postingan`);
      listPost.innerHTML = "";
      getData();
      resetInput();
    })
    .catch((error) => {
      console.log(error);
    });
});

listPost.addEventListener("click", (e) => {
  let editButton = e.target.id == "edit";
  let hapusButton = e.target.id == "hapus";

  const id = e.target.parentElement.dataset.id;

  if (editButton) {
    const parent = e.target.parentElement;
    let judul = parent.querySelector(".judul").textContent;
    let content = parent.querySelector(".content").textContent;
    console.log(content);

    inputJudul.value = judul;
    inputContent.value = content;
  }

  // Edit post
  btnUpdate.addEventListener("click", (e) => {
    e.preventDefault();
    const newJudul = inputJudul.value;
    const newContent = inputContent.value;
    const updateData = {
      judul: newJudul,
      content: newContent,
    };
    fetch(`${url}/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updateData),
    })
      .then((res) => {
        console.log(res);
      })
      .then((data) => {
        location.reload();
        resetInput();
        getData();
      });
  });

  if (hapusButton) {
    fetch(`${url}/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        alert(`Berhasil Menghapus`);
        listPost.innerHTML = "";
        getData();
      })
      .catch((error) => {
        console.log(error);
      });
  }
});
