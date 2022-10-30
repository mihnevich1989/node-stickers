window.onload = function () {

  //---my-stickers page
  if (window.location.pathname === '/my-stickers') {
  }
  //end---my-stickers page

  //---my-sticker/create
  if (window.location.pathname === '/my-stickers/create') {

    const inputsGroupRepetition = `
    <li class="position-relative">
      <span type="button" class='trash btn btn-outline-secondary border-0 bi bi-file-earmark-minus'>
      </span>
      <div class="input-group input-group-sm mb-1">
        <span class="input-group-text">Note</span>
        <input type="text" aria-label="note" name="note" class="check-valid form-control add-note is-invalid" required>
      </div>
    </li>`;

    const exercise = `
    <div class="data-group">
      <div class="input-group mb-1">
        <span class="input-group-text">Ex.</span>
        <input type="text" aria-label="exercise" name="exercise" class="check-valid form-control add-ex is-invalid" required>
      </div>
      <ul class="list-repetition">
        <button class="btn btn-outline-secondary add-repetition border-0 bi bi-file-earmark-plus"></button>
      </ul>
    </div>`;

    //---trash
    function trash() {
      const trashBtns = document.querySelectorAll('.trash');

      trashBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const target = e.target;
          const parent = target.parentElement;
          parent.remove();
        });
      });
    }
    trash();
    //end---trash

    //---add validation class
    function addValidation() {
      const fillInputs = document.querySelectorAll('.check-valid');
      fillInputs.forEach(input => {
        input.addEventListener('input', (e) => {
          checkValidInput(e.target);
        });
      });
    }

    function checkValidInput(target) {
      if (target.value.length > 0) {
        target.classList.replace('is-invalid', 'is-valid');
      } else {
        target.classList.replace('is-valid', 'is-invalid');
      }
    }
    addValidation();
    //end---validation class

    //---add weight and repetiotion
    function addEventToNextRepetition(allBtns) {
      allBtns[allBtns.length - 1].addEventListener('click', (e) => {
        e.target.insertAdjacentHTML('beforeBegin', inputsGroupRepetition);
        addValidation(); //---add validation class
        trash(); //---trash
      });
    }
    let addRepetition = document.querySelectorAll('.add-repetition');
    addEventToNextRepetition(addRepetition);
    //end---weight and repetiotion

    //---add exercise
    const btnAddSaveClose = document.querySelector('.btn-add-save-close');
    const addExercise = document.querySelector('#add-exercise');
    addExercise.addEventListener('click', () => {
      btnAddSaveClose.insertAdjacentHTML('beforeBegin', exercise);
      addRepetition = document.querySelectorAll('.add-repetition');
      addEventToNextRepetition(addRepetition); //---add weight and repetiotion
      addValidation(); //---add validation class
      trash(); //---trash
    });
    //end---exercise

    //---fetch with data
    const save = document.querySelector('#save-sticker');
    let dataExercise = {};

    save.addEventListener('click', () => {
      const dataGroups = document.querySelectorAll('.data-group');
      const validStatusForAllInputs = document.querySelectorAll('.is-invalid');
      const toastLiveExample = document.getElementById('liveToast');
      const header = document.querySelector('.add-header').value;

      if (validStatusForAllInputs.length > 0) {
        const toast = new bootstrap.Toast(toastLiveExample);
        return toast.show();
      }

      dataGroups.forEach((el, i) => {
        const exercise = el.querySelector('input[name="exercise"]').value;
        dataExercise[`${exercise} (${i + 1})`] = { note: [] };
        el.querySelectorAll('.list-repetition li .input-group').forEach(listElem => {
          dataExercise[`${exercise} (${i + 1})`].note.push(listElem.querySelector('input[name="note"]').value);
          listElem.scrollIntoView();
        });
      });

      let data = {
        header,
        data: dataExercise
      };

      fetch('/my-stickers/create', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }).then(res => {
        return res.json();
      }).then(res => {
        if (res.result) {
          window.location.assign(`${res.path}`);
        }
      });
    });
    //end---fetch




  }
  //end---my-sticker/create



};
