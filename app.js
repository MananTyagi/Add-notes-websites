console.log("yes i did it ");
showNotes();
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener('click', function(e) {
    let addtxt = document.getElementById("addtxt");
    let addtit = document.getElementById("addtit");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    } else {
        notesobj = JSON.parse(notes);
    }
    temp = [addtxt.value, addtit.value]
    notesobj.push(temp);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addtxt.value = "";
    addtit.value = "";

    // console.log(notesobj);
    showNotes();

});
// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function(element, index) {
        html += `
              <div class="noteCard my-2 mx-2 card" style="width: 18rem;>
                      <div class="card-body" id="Note${index + 1}">
                          <h6 class="card-title">${index + 1}: ${element[1]}</h6>
                          <p class="card-text"> ${element[0]}</p>
                          <button id="${index}"onclick="deleteNote(this.id)" class="btn btn-outline-danger btn-sm">Delete Note</button>
                          <div class="form-check form-switch my-2">
  <input class="form-check-input" onclick="markimportant(this.id)" type="checkbox" id="imp${index + 1}" >
  <label class="form-check-label" for="flexSwitchCheckChecked"> Mark for important </label>
</div>
                      </div>
                  </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

function deleteNote(index) {
    //   console.log("I am deleting", index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}
//search functinality through description
let search = document.getElementById('searchTxt');
search.addEventListener("input", function() {

        let inputVal = search.value.toLowerCase();
        // console.log('Input event fired!', inputVal);
        let noteCards = document.getElementsByClassName('noteCard');
        Array.from(noteCards).forEach(function(element) {
            let cardTxt = element.getElementsByTagName("p")[0].innerText;
            if (cardTxt.includes(inputVal)) {
                console.log(element.style.display)
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
            console.log(cardTxt);
        })
    })
    //  search functionality through title
let sbytit = document.getElementById('searchTit');
sbytit.addEventListener("input", function() {

        let inp = sbytit.value.toLowerCase();
        // console.log('Input event fired!', inp);
        let noteCards = document.getElementsByClassName('noteCard');
        Array.from(noteCards).forEach(function(e) {
            let cardTxt = e.getElementsByTagName("h6")[0].innerText;
            // if (cardTxt == "3 Django") {

            //     console.log(cardTxt.includes(inp))
            // }

            if (cardTxt.toLowerCase().includes(inp)) {
                // console.log("find card", cardTxt, inp);

                e.style.display = "block";
            } else {
                // console.log("no find ")
                e.style.display = "none";
            }

        })
    })
    // add to important so that they can be highlighted in other way
function markimportant(idofinput) {
    let ret = idofinput.replace('imp', '');
    // console.log(ret)
    let ele = document.getElementById("Note" + ret)
        // console.log(ele)
    ele.style.backgroundColor = "green";
}