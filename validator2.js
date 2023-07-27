function Validator(formSelector, options){
    if(!options){
        options={}; 
    }
    function getParent(element, selector){
        while(element.parentElement){
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element=  element.parentElement;
        }   
    }
    var formRules={};
    // quy ước tạo rule
    // nếu có lỗi return lại " errorMessage"
    // nếu không có lỗi trả lại undefined
    var validatorRules={
        required: function(value){
            return value ? undefined:' vui lòng nhập trường này';
        },
        email: function(value){
            var regex=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined:' vui lòng nhập email';
        },
        min: function(min){
           return function(value){
            return value.length >= min ? undefined:`Nhập tối thiểu ít nhất ${min} kí tự`;
        }
        },
        max: function(max){
            return function(value){
             return value.length <= max ? undefined:`Nhập tối đa ${max} kí tự`;
         }
         },
    };
    var ruleName ='required';
    console.log(validatorRules[ruleName])
    // lấy ra form element trong DOM thep formSelector
    var formElement= document.querySelector(formSelector);

    // chỉ xử lý khi có element trong  DoM
    if(formElement){
        var inputs = formElement.querySelectorAll('[name][rules]');
        for (var input of inputs){
            var rules= input.getAttribute('rules').split('|');
            for(var rule of rules){
                var ruleInfo;
                var isRuleHasValue= rule.includes(':');
                if (isRuleHasValue){
                    ruleInfo  = rule.split(':'); 
                    rule= ruleInfo[0];
                    // console.log(validatorRules[rule](ruleInfo[1]))
                }
                var ruleFunc = validatorRules[rule];
                if(isRuleHasValue){
                    ruleFunc= ruleFunc(ruleInfo[1]);
                }
                if(Array.isArray(formRules[input.name])){
                    formRules[input.name].push(ruleFunc);
                }
                else{
                    formRules[input.name]=[ruleFunc];
                }
            }
            //  lắng nghe sự kiện để validate (blur , onchange)
            input.onblur= handleValidate;
            input.oninput= handleClearError;
        }
        // hàm thực hiện validate 
        function handleValidate(event){
            var rules=formRules[event.target.name];
            var errorMessage;
             rules.find(function(rule){
                errorMessage= rule(event.target.value);
                return errorMessage;
            });
            // nếu có lỗi
            if(errorMessage){
                var formGroup = getParent(event.target,'.form-group');
                if(formGroup) {
                    formGroup.classList.add('invalid');
                    var formMessage=formGroup.querySelector('.form-message');
                    if(formMessage){
                        formMessage.innerText= errorMessage;
                    }
            }
        }
        return !errorMessage;
        }
    function handleClearError(event){
        var formGroup= getParent(event.target,'.form-group');
        if(formGroup.classList.contains('invalid')){
            formGroup.classList.remove('invalid');
            var formMessage=formGroup.querySelector('.form-message');
                if(formMessage){
                    formMessage.innerText= '';
                }
        }
    }
    }   
    formElement.onsubmit= function(event){
        event.preventDefault();
        var inputs= formElement.querySelectorAll('[name][rules]');
        var isValid =true;
        for( var input of inputs){
            if(!handleValidate({
                target: input
            })){
                isValid= false;
            }

        }
       
        // khi không có lỗi submit form
        if(isValid){
            
            if(typeof options.onSubmit === 'function'){
                return options.onSubmit();
            }
            formElement.submit();
        }
    }
    // console.log(formRules)
}