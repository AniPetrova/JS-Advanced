class VeterinaryClinic {
    constructor(clinicName, capacity) {
        this.clinicName = clinicName;
        this.capacity  = capacity;
        this.clients = [];
        this.totalProfit = 0;
        this.currentWorkload = 0;        
    }
  

    newCustomer(ownerName, petName, kind, procedures) {

        if (this.currentWorkload >= this.capacity) {
            throw new Error(`Sorry, we are not able to accept more patients!`);
        }

        let check = this.clients.find(client => client.name === ownerName );
      

        if (check == undefined) {
            let newOwner = {name: ownerName, pets: []}
            let newpet={petName: petName, kind: kind.toLowerCase(), owner: ownerName, procedures: procedures};
            newOwner.pets.push(newpet);
            this.clients.push(newOwner);
            this.currentWorkload++;
            return `Welcome ${petName}!`;
        } else {
              
         let checkpet = check.pets.find(pet => pet.petName===petName);
        
           if (checkpet == undefined) {
            let newpet={petName: petName, kind: kind.toLowerCase(), owner: ownerName, procedures: procedures};
            check.pets.push(newpet);          
            this.currentWorkload++;
            return `Welcome ${petName}!`;
           } else {
               if (checkpet.procedures.length>0) {
                throw new Error(`This pet is already registered under ${checkpet.owner} name! ${checkpet.petName} is on our lists, waiting for ${checkpet.procedures.join(', ')}.`)
               } else {
                   checkpet.procedures = procedures;
                   this.currentWorkload++;
                   return `Welcome ${petName}!`;
               }
           }
                        
         }
                   
    
        
    }

    onLeaving (ownerName, petName) {
        
        let check = this.clients.find(client => client.name === ownerName );
      
        if (check == undefined) {
            throw new Error(`Sorry, there is no such client!`);            
        } else {              
         let checkpet = check.pets.find(pet => pet.petName===petName);
            if (checkpet == undefined || checkpet.procedures.length==0) {
                throw new Error(`Sorry, there are no procedures for ${petName}!`)
            } else {
                   this.totalProfit += 500*checkpet.procedures.length;
                   checkpet.procedures = [];
                   this.currentWorkload--;
                   return `Goodbye ${petName}. Stay safe!`;
                 }
        }

    }


    toString () {
        let info = `${this.clinicName} is ${(this.currentWorkload/this.capacity)*100}% busy today!\nTotal profit: ${this.totalProfit.toFixed(2)}$\n`;

        this.clients
        .sort((a,b) => a.name.localeCompare(b.name))
        .forEach(client =>{
            info += `${client.name} with:\n`;
            client.pets.sort((a,b) => a.petName.localeCompare(b.petName))
                       .forEach(animal => {
                           info += `---${animal.petName} - a ${animal.kind} that needs: ${animal.procedures.join(', ')}\n`
                       })})

        return info.trim();

    }
}

let clinic = new VeterinaryClinic('SoftCare', 10);
console.log(clinic.newCustomer('Jim Jones', 'Tom', 'Cat', ['A154B', '2C32B', '12CDB']));
console.log(clinic.newCustomer('Anna Morgan', 'Max', 'Dog', ['SK456', 'DFG45', 'KS456']));
console.log(clinic.newCustomer('Jim Jones', 'Tiny', 'Cat', ['A154B'])); 
console.log(clinic.onLeaving('Jim Jones', 'Tiny'));
console.log(clinic.toString());
clinic.newCustomer('Jim Jones', 'Sara', 'Dog', ['A154B']); 
console.log(clinic.toString());
