const numberOperations = {
    powNumber: function (num) {
        return num * num;
    },
    numberChecker: function (input) {
        input = Number(input);

        if (isNaN(input)) {
            throw new Error('The input is not a number!');
        }

        if (input < 100) {
            return 'The number is lower than 100!';
        } else {
            return 'The number is greater or equal to 100!';
        }
    },
    sumArrays: function (array1, array2) {

        const longerArr = array1.length > array2.length ? array1 : array2;
        const rounds = array1.length < array2.length ? array1.length : array2.length;

        const resultArr = [];

        for (let i = 0; i < rounds; i++) {
            resultArr.push(array1[i] + array2[i]);
        }

        resultArr.push(...longerArr.slice(rounds));

        return resultArr
    }
};



//Tests 


const {describe} = require('mocha');
const {assert} = require('chai');

describe("Tests", () => {
    describe("Pow number check", ()  => {
        it("check Result", () => {
            assert.equal(numberOperations.powNumber(5), 25);
            assert.equal(numberOperations.powNumber(-5), 25);
            assert.equal(numberOperations.powNumber(0), 0);

        });
     });

     describe("Checker", ()  => {
        it("Not a number", () => {
            assert.throws(() => numberOperations.numberChecker('fg'), `The input is not a number!`);          

        });

        it("Lower than 100", () => {
            assert.equal(numberOperations.numberChecker(5), 'The number is lower than 100!');      
            assert.equal(numberOperations.numberChecker(-5), 'The number is lower than 100!');     
            assert.equal(numberOperations.numberChecker(99), 'The number is lower than 100!');         

        });

        it("Greater than 100", () => {
            assert.equal(numberOperations.numberChecker(100), 'The number is greater or equal to 100!');          
            assert.equal(numberOperations.numberChecker(101), 'The number is greater or equal to 100!');     
            assert.equal(numberOperations.numberChecker(100000), 'The number is greater or equal to 100!');         

        });
     });

     describe ('Test arrays', ()=> {
         it("Valid arrays",()=> {
             assert.deepEqual(numberOperations.sumArrays([1,2,3,4,5,], [1,2,3,4,5,]), [2,4,6,8,10]);
         })

         it("Longer arrays",()=> {
            assert.deepEqual(numberOperations.sumArrays([1,2,3,4,5,6], [1,2,3,4,5,]), [2,4,6,8,10,6]);
        })
     })
     
    




});
