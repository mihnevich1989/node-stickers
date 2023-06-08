window.onload = function () {

  //---my-stickers page
  if (window.location.pathname === '/my-stickers') {
    //---delete sticker
    const stickersTrash = document.querySelectorAll('.sticker-trash');
    stickersTrash.forEach(sticker => {
      sticker.addEventListener('click', (e) => {
        const target = e.target;
        fetch(`/my-stickers/delete?id=${target.dataset.stickerid}`, {
          method: 'delete'
        }).then(res => {
          return res.json();
        }).then(res => {
          if (res.result) {
            target.parentElement.remove();
          }
        });
      });
    });
  };

  const stickerCards = document.querySelectorAll('.sticker-card');
  stickerCards.forEach(el => {
    el.addEventListener('click', (e) => {
      const target = e.target;
      fetchToEditCard(el.dataset.stickerid);


    }, true);
  });
  //---go to edit sticker card page
  function fetchToEditCard(id) {
    window.location.href = `/my-stickers/edit?id=${id}`;
  }
  //end---go to edit sticker card page

  //end---my-stickers page

  //---my-sticker/create
  if (window.location.pathname === '/my-stickers/create') {
    const btnAddSaveClose = document.querySelector('.btn-add-save-close');
    const addExercise = document.querySelector('#add-exercise');
    const save = document.querySelector('#save-sticker');

    const inputsGroupRepetition = `
    <li class="position-relative">
      <span type="button" class='trash-minus btn btn-outline-secondary border-0 bi bi-file-earmark-minus'>
      </span>
      <div class="input-group input-group-sm mb-1">
        <span class="input-group-text">Note</span>
        <input type="text" aria-label="note" name="note" class="check-valid form-control add-note is-invalid" required>
      </div>
    </li>`;

    const exercise = `
    <div class="exercise-block">
      <div class="input-group mb-1">
        <span class="input-group-text">Ex.</span>
        <input type="text" aria-label="exercise" name="exercise" class="check-valid form-control add-ex is-invalid" required>
      </div>
      <ul class="list-note">
        <button class="btn btn-outline-secondary add-note border-0 bi bi-file-earmark-plus"></button>
      </ul>
    </div>
    `;

    //---trash
    function trash() {
      const trashBtns = document.querySelectorAll('.trash-minus');

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

    //---add note
    function addEventToNextRepetition(allBtns) {
      allBtns[allBtns.length - 1].addEventListener('click', (e) => {
        e.target.insertAdjacentHTML('beforeBegin', inputsGroupRepetition);
        addValidation(); //---add validation class
        trash(); //---trash
        btnAddSaveClose.scrollIntoView();
      });
    }
    let addRepetition = document.querySelectorAll('.add-note');
    addEventToNextRepetition(addRepetition);
    //end---note

    //---add exercise
    addExercise.addEventListener('click', () => {
      btnAddSaveClose.insertAdjacentHTML('beforeBegin', exercise);
      addRepetition = document.querySelectorAll('.add-note');
      addEventToNextRepetition(addRepetition); //---add note
      addValidation(); //---add validation class
      trash(); //---trash
      btnAddSaveClose.scrollIntoView();
    });
    //end---exercise

    //---fetch with data
    let dataExercise = {};

    save.addEventListener('click', (e) => {
      const exerciseBlocks= document.querySelectorAll('.exercise-block');
      const validStatusForAllInputs = document.querySelectorAll('.is-invalid');
      const header = document.querySelector('.add-header').value;

      if (validStatusForAllInputs.length > 0) {
        const toastBlock = `
        <div id="liveToast" class="w-50 toast align-items-center text-bg-danger position-absolute border-0 start-50 translate-middle-x "
            role="alert" aria-live="assertive" aria-atomic="true" data-bs-delay="1500">
            <div class="d-flex justify-content-center content">
              <div class="toast-body ">
                Fill in all the fields!
              </div>
            </div>
        </div>
      `;
        e.target.insertAdjacentHTML('afterend', toastBlock);
        const toastLiveExample = document.getElementById('liveToast');
        const toast = new bootstrap.Toast(toastLiveExample);
        toast.show();
        setTimeout(() => {
          toastLiveExample.remove();
        }, 1500);
        return;
      }

      exerciseBlocks.forEach((el, i) => {
        const exercise = el.querySelector('input[name="exercise"]').value;
        dataExercise[`${exercise} (${i + 1})`] = { note: [] };
        el.querySelectorAll('.list-note li .input-group').forEach(listElem => {
          dataExercise[`${exercise} (${i + 1})`].note.push(listElem.querySelector('input[name="note"]').value);
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
