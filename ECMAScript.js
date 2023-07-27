// 1 Let, const
// 2 template Literals
// 3 Multi-line String
// 4 Arrow function
// 5 classes
// 6 Default parameter values
// 7 Destructuring
// 8 Rest Parameters
// 9 Spread
// 10 Enhanced object literals
// 11 Tagged template literals
// 12 Modules 

//1 var/ let, const:scope,hosting   
// 2 Const/ Var, Let: Assignment

// code block: if, else, loop, {}., ...
// code thuần : var
// babel: const, let

// var a=1;
// a=1000;
// console.log(a);

// arrow function

// function logger(log){
//     console.log(log);
// }

// const logger= function(log){
//     console.log(log);
// }

// const logger = (log)=> {
//     console.log(log);
// }
// logger('message...')



// const sum=(a,b) => a+ b;
// console.log(3+5);

// const logger = log =>console.log(log);
// logger('Message...')


// const course= {
//     name: 'JavaScript basis',
//     getName: function(){
//         // return this.name;
//         return this;// context 
//     }
// };

// console.log(course.getName());









//classes

// function Course(name , price){
//     this.name= name;
//     this.price=price;
        // this.getName=function(){
        //     return this.name;
        // }
        // const isSuccess= false;

// }






// class Course{
//     constructor(name, price){
//         this.name = name;
//         this.price = price;

//     }
//     getName(){
//         return this.name;
//     }
//     getName(){
//         return this.price;
//     }
// }
// const PHpcourse= new Course('PHP', 1000);
// const javacourse= new Course('javascript', 4000);
// console.log(PHpcourse);
// console.log(javacourse);



// enhanded

// định nghĩa key cho 1 object
// định nghĩa  method cho một object


// var name='javascript';
// var price= 10000; 

// // var course= {
// //     name: name,
// //     price: price
// // };
// var course= {
//     name,
//     price,
//     getName(){
//         return price;
//     }
// };
// console.log(course.getName);









// default parameter
// function logger(log){
//     if(typeof log==='undefined'){
//         log='gia trị mặc định!';
//     }
//     console.log(log);

// }
// logger ('con thư mách mách')
// logger(undefined)


// function logger(log=' giá trị mặc định!'){
//         console.log(log);
    
//     }
//     // logger (undefined)
//     logger ('con thư mách mách')



// function logger(log, isAlert=true){
//     if(isAlert) return alert(log);
//     console.log(log);
// }

// logger('Message...', true);





// destructuring
// rest lấy những phần tử còn lại trong mảng
// var array= ['javascript', 'PHP', 'Ruby'];
//     var[a, ...rest]=array;

// // var a=array[0];
// // var b=array[1];
// // var c=array[2];
// console.log(a);
// console.log(rest);



// var course={
//     name:'javascrip',
//     price: 10000,
//     image: " images",
//     children:{
//         name:"java"
//     }
// };

// // var {name ,  ...rest}= course;
// // console.log(name );
// // console.log(rest);
// // dùng newObject để xóa đi một phần tử trong đối tượng đó ở đây mình xóa đi thằng name 
// // var {name ,  ...newObject}= course;
// // console.log(newObject);

// var {name:parentName, children:{name:childrenName}}=course;
// console.log(childrenName);
// console.log(parentName);








//spread in javascript(...)


var array=['javascript', 'ruby', 'PHP'];
var array1=['ReactJS',';Laravel'];
var array2=[...array, ...array1];
console.log(array2)