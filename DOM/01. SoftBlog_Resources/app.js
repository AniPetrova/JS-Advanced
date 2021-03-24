function solve(){
  let allInputs = document.querySelector('form').children;

  let authoreEl = allInputs[0].children[1];
  let titleEl = allInputs[1].children[1];
  let categoryEl = document.getElementById('category');
  let contentEl = allInputs[3].children[1];
  let  createElBtn = allInputs[4];
  let allPosts = document.querySelector('.site-content > main > section');

  let archiveOl = document.querySelector('.archive-section > ol');
  let allLi = [];



  createElBtn.addEventListener('click', (e)=> {
    e.preventDefault();
    let author = authoreEl.value;
    let title = titleEl.value;
    let categ = categoryEl.value;
    let content = contentEl.value;

   //  authoreEl.value = '';
   //  titleEl.value = '';
   //  categoryEl.value = '';
   //  contentEl.value = '';

   let newArtEl  = document.createElement('article');
       let h1El = document.createElement('h1');
       h1El.textContent = title;
       newArtEl.appendChild(h1El);

       let p0El = document.createElement('p');
       p0El.textContent = 'Category:';

          let strong0El = document.createElement('strong');
          strong0El.textContent = categ;
          p0El.appendChild(strong0El);
       newArtEl.appendChild(p0El);

       let pEl = document.createElement('p');
       pEl.textContent = 'Creator:';

          let strongEl = document.createElement('strong');
          strongEl.textContent = author;
          pEl.appendChild(strongEl);
       newArtEl.appendChild(pEl);

       let p2El = document.createElement('p');
       p2El.textContent = content;
       newArtEl.appendChild(p2El);

      let divBtns = document.createElement('div');
      divBtns.setAttribute('class', 'buttons');
         let delBtn = document.createElement('button');
         
         delBtn.setAttribute('class', 'btn delete');
         delBtn.textContent = 'Delete';
         delBtn.addEventListener('click', (e) => {
           e.currentTarget.parentElement.parentElement.remove();
         })
         divBtns.appendChild(delBtn);

         let arcBtn = document.createElement('button');
       
         arcBtn.setAttribute('class', 'btn archive');
         arcBtn.textContent = 'Archive';
         arcBtn.addEventListener('click', (e) => {
          allLi.push(e.currentTarget.parentElement.parentElement.firstElementChild.innerHTML);
          archiveOl.textContent = '';
           
          allLi.sort((a,b) => a.localeCompare(b)).forEach( e => {
            let newLi = document.createElement('li');
            newLi.textContent = e;
            archiveOl.appendChild(newLi);
          })

          e.currentTarget.parentElement.parentElement.remove()
          

         })
         divBtns.appendChild(arcBtn);

      newArtEl.appendChild(divBtns);

   allPosts.appendChild(newArtEl);
      
      
  });
 }
