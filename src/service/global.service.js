import { Subject } from 'rxjs';

var globalStorage = {
    duration : 12,
    gb : 5,
    upfrontPayment : "no",
    card_no_1 : "",
    card_no_2 : "",
    card_no_3 : "",
    card_no_4 : "",
    expiry__m : "",
    expiry__y : "",
    cvv : "",
    email : "",
    acceptTerms : false,
    step_completion : [false,false,false],
    price_data : [{"duration_months":3,"price_usd_per_gb":3},{"duration_months":6,"price_usd_per_gb":2.5},{"duration_months":12,"price_usd_per_gb":2}],
    total_payable : null
}


const valueChanges = new Subject();
export const onValueChanges = () => {
    return valueChanges.asObservable();
  };

export function setUserSelection(type,value){
    globalStorage[type] = value;
    calcTotalPrice();
    valueChanges.next(globalStorage);
}

export function setStepCompletion(step){
  globalStorage.step_completion[step] = true;
}

export const getGlobalStorageData = ()=> JSON.parse(JSON.stringify(globalStorage))

export const resetGlobalStorage = () => {
    globalStorage = {
        duration : 12,
        gb : 5,
        upfrontPayment : "no",
        card_no_1 : "",
        card_no_2 : "",
        card_no_3 : "",
        card_no_4 : "",
        expiry__m : "",
        expiry__y : "",
        cvv : "",
        email : "",
        acceptTerms : false,
        step_completion : [false,false,false],
        price_data : [{"duration_months":3,"price_usd_per_gb":3},{"duration_months":6,"price_usd_per_gb":2.5},{"duration_months":12,"price_usd_per_gb":2}],
        total_payable : null
    };

    calcTotalPrice();
    valueChanges.next(globalStorage);
}

function calcTotalPrice(){
  globalStorage.total_payable = globalStorage.price_data.find(ele=>ele.duration_months === globalStorage.duration).price_usd_per_gb * globalStorage.gb; 
}