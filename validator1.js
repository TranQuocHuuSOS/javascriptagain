function Validator(options){

    var selectorRules= {};
    // hàm thực hiện validate 
    function validate(inputElement,rule){
        var errorElement= inputElement.parentElement.querySelector(options.errorSelector); 
        var errorMessage;
        var rules= selectorRules[rule.selector];
          // lặp qua từng rule và kiểm tra
        // nếu lỗi dừng kiểm tra 
        for(var i=0; i< rules.length ; ++i){
              errorMessage =rules[i](inputElement.value);
                if( errorMessage)  break;
        }

        if(errorMessage){
            errorElement.innerText=errorMessage;
            inputElement.parentElement.classList.add('invalid');
        }
        else{
            errorElement.innerText='';
            inputElement.parentElement.classList.remove('invalid');
        }
        return !errorMessage;
    }

    // lấy element của forn cần validate
    var formElement =document.querySelector(options.form);
    
    if(formElement){
        // khi submit form
        formElement.onsubmit= function(e){
            e.preventDefault();

            var isFormValid=true;
            // thực hiện lặp qua từng rule và validate
            options.rules.forEach(function(rule){
                var inputElement= formElement.querySelector(rule.selector);
                var isValid=  validate(inputElement, rule);
                if(!isValid){
                    isFormValid= false;
                }
            });
           
            if(isFormValid){

                // Trường hợp submit với javascript
               if(typeof options.onSubmit==='function'){
                var enableInputs =formElement.querySelectorAll('[name]');
                var formValues = Array.from(enableInputs).reduce(function(values, input){
                    values[input.name ] = input.value;
                    return values;
                },{});
                 options.onSubmit(formValues)
               }

               // trường hợp mặc định   
               else{
                    formElement.submit();
               }
            //    console.log(formValues);
            }

            else{
                console.log('có lỗi')
            }
        }
        // lặp qua mỗi rule ( lắng nghe sự kiện)
        options.rules.forEach(function(rule){
            // lưu lại các rules cho mỗi input
           if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test);
           }else{
            selectorRules[rule.selector]= [rule.test];
           }
            // selectorRules[rule.selector]= rule.test;

           var inputElement= formElement.querySelector(rule.selector);
           
           if(inputElement){
            inputElement.onblur = function(){
              
                validate(inputElement, rule)
            }
            inputElement.oninput= function(){
                var errorElement= inputElement.parentElement.querySelector('.form-message'); 
                // console.log(inputElement.value)
                errorElement.innerText='';
                inputElement.parentElement.classList.remove('invalid');
            }
           }
        })
    }
}

// định nghĩa các rules
Validator.isRequired =function(selector ,message){
    return{
        selector: selector,
        test: function(value){
            return value.trim() ? undefined :  message ||'vui lòng nhập trường này '
        }
    }
}
Validator.isEmail= function(selector, message){
    return{
        selector : selector,
        test: function(value){
           var regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
           return regex.test(value) ? undefined :  message ||"Trường này phải là email"
        }
    }
}

    Validator.minLength= function(selector, min, message){
        return{
        selector : selector,
        test: function(value){
          
           return value.length >= min ? undefined :  message ||`Mật khẩu tối thiểu ${min} kí tự`
        }
    }
}

Validator.isConfirmed= function(selector,getConfirmValue, message){
    return{
    selector : selector,
    test: function(value){
      
       return value === getConfirmValue() ? undefined : message || 'Gía trị nhập vào không chính xác'
    }
}
}