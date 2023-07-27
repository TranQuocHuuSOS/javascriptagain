// var promise = new Promise(
//     function(resolve, reject) {
//        resolve();
//     })


// promise
//     .then(function(){
//         return new Promise(function(resolve){
//             setTimeout(function() {
//                 resolve([1,2,3]);
//             }, 3000);
//         }) ;
//     })
   
//     .then(function(data){
//         console.log(data);
//     })
//     .catch(function(error){
//         console.log(error);
//     })
//     .finally(function(){
//         console.log('Done!');
//     })





// function sleep(ms){
//     return new Promise(function(resolve){
//         setTimeout(resolve, ms);
//     });
// }
// sleep(1000)
//     .then(function(){
//         console.log(1);
//         return sleep(1000);
//     })
//     .then(function(){
//         console.log(2);
//         return sleep(1000);
//     })
//     .then(function(){
//         console.log(3);
//         return sleep(1000);
//     })
//     .then(function(){
//         console.log(4);
//         return sleep(1000);
//     })




// promise.resolve, reject , chúng ta chỉ cần thay resolve thành reject là được 
// var promise =Promise.resolve('success');
// promise
//     .then(function(result){
//         console.log('result:' , result);

//     })
//     .catch(function(err){
//         console.log('err: ',err);
//     })





var promise1= new Promise(
    function(resolve){
        setTimeout(function(){
            resolve([1]);
        },2000);
    }
);
var promise2= new Promise(
    function(resolve){
        setTimeout(function(){
            resolve([2,3]);
        },5000)
})

Promise.all([promise1, promise2])
    // .then(function(result){
    //    var result1= result[0];
    //    var result2= result[1];
    //    console.log(result1.concat(result2));
    // })
        .then(function([result1, result2]){
            console.log(result1.concat(result2))
        });