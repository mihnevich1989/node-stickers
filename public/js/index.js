window.onload = function () {

  //-------------------my-stickers page
  if (window.location.pathname === '/my-stickers') {
  }


  //-------------------my-sticker/create
  if (window.location.pathname === '/my-stickers/create') {
    const inputsGroupRepetition = `
    <li>
      <div class="input-group input-group-sm mb-1">
        <span class="input-group-text">Wg.</span>
        <input type="number" aria-label="weight" name="weight" class="form-control add-wg" required>
        <span class="input-group-text">Rep.</span>
        <input type="number" aria-label="repetitions" name="repetitions" class="form-control add-rep" required>
      </div>
    </li>`;
    const exercise = `
    <div class="data-group">
      <div class="input-group mb-1">
        <span class="input-group-text">Ex.</span>
        <input type="text" aria-label="exercise" name="exercise" class="form-control add-ex" required>
      </div>
      <ul class="list-repetition">
        ${inputsGroupRepetition}
        <button class="btn btn-outline-secondary add-repetition">+</button>
      </ul>
    </div>`;
    let addRepetition = document.querySelectorAll('.add-repetition');
    const addExercise = document.querySelector('#add-exercise');
    const btnAddSaveClose = document.querySelector('.btn-add-save-close');
    let dataGroups = document.querySelectorAll('.data-group');
    
    function addEventToNextRepetition(allBtns) {
      allBtns[allBtns.length - 1].addEventListener('click', (e) => {
        e.target.insertAdjacentHTML('beforeBegin', inputsGroupRepetition);
      });
    }
    addEventToNextRepetition(addRepetition);

    addExercise.addEventListener('click', () => {
      btnAddSaveClose.insertAdjacentHTML('beforeBegin', exercise);
      addRepetition = document.querySelectorAll('.add-repetition');
      addEventToNextRepetition(addRepetition);
    });

    //---fetch with data---
    const save = document.querySelector('#save-sticker');
    

    save.addEventListener('click', () => {
      console.log(dataGroups);
    });





  }








};
