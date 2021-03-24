function solve() {
    let buttonElement = document.querySelector('#container button');
    let inputElements= Array.from(document.querySelectorAll('#container input'));
    
    let [name, age, kind, owner] = inputElements;
    let adoptionElement = document.querySelector('#adoption ul');
    let adoptedEl = document.querySelector('#adopted ul');

    buttonElement.addEventListener('click', e=> {
      e.preventDefault();
       
      if(!inputElements.every(x => x.value))  {
          return;
      }

      if (!Number(age.value)) {
          return;
      }

      let liElement =document.createElement('li');
      let pElement = document.createElement('p');
      let spanElement = document.createElement('span');
      let buttoneEl = document.createElement('button');

      pElement.innerHTML = `<strong>${name.value}</strong> is a <strong>${age.value}</strong> year old <strong>${kind.value}</strong>`;
       spanElement.textContent = `Owner: ${owner.value}`;
       buttoneEl.textContent = `Contact with owner`;

      
      liElement.appendChild(pElement);
      liElement.appendChild(spanElement);
      liElement.appendChild(buttoneEl);
      adoptionElement.appendChild(liElement);
      
       name.value = '';
       age.value = '';
       kind.value = '';
       owner.value = '';


       buttoneEl.addEventListener('click', contact);
    });

    function contact(e) {
             
        let parent = e.currentTarget.parentElement;
        e.currentTarget.remove();
        let dive = document.createElement('div');
        let inputEl = document.createElement('input');
        let takeButton = document.createElement('button');


        inputEl.setAttribute('placeholder',`Enter your names`);
        takeButton.textContent= `Yes! I take it!`;
        dive.appendChild(inputEl);
        dive.appendChild(takeButton);
        
         parent.appendChild(dive);
         takeButton.addEventListener('click', onTakeBt);
    }
    
    function onTakeBt(e) {
        let parBt = e.currentTarget.parentElement;
        let grandPar = e.currentTarget.parentElement.parentElement;
        

        let newname = grandPar.querySelector('input').value;
        if (!newname) {
            return;
        }

        let ownSpan = grandPar.querySelector('span');
        ownSpan.textContent = `New Owner: ${newname}`;

        adoptedEl.appendChild(grandPar);

        parBt.remove();

        let buttonCheck = document.createElement('button');
        buttonCheck.textContent = 'Checked';
        grandPar.appendChild(buttonCheck);

        buttonCheck.addEventListener('click', e=> {
            grandPar.remove();
        })

    }
            
 
}

