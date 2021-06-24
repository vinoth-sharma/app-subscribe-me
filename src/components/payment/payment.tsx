import { ChangeEvent, Dispatch, useEffect, useRef, useState } from "react";
import {
  getGlobalStorageData,
  setUserSelection,
} from "../../service/global.service";
import "./payment.scss";

interface PaymentProp {
  validHandler : Dispatch<boolean>
}
export function PaymentDetails( {validHandler}:PaymentProp ) {
  const [first, setFirst] = useState("");
  const [second, setSec] = useState("");
  const [third, setThird] = useState("");
  const [fourth, setFourth] = useState("");

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [cvv, setCvv] = useState("");

  let input1Ref = null;
  let input2Ref = null;
  let input3Ref = null;
  let input4Ref = null;
  let inputM = null;
  let inputY = null;
  let inputCvv = null;


  useEffect(() => {
    let data = getGlobalStorageData();
    setFirst(data.card_no_1);
    setSec(data.card_no_2);
    setThird(data.card_no_3);
    setFourth(data.card_no_4);
    setMonth(data.expiry__m);
    setYear(data.expiry__y);
    setCvv(data.cvv);
  }, []);

  useEffect(()=>{
    const validateCardData = () => {
      if (
        first.length === 4 &&
        second.length === 4 &&
        third.length === 4 &&
        fourth.length === 4 &&
        month.length === 2 &&
        year.length === 2 &&
        cvv.length === 3
      ) {
        validHandler(true);
        
      }
      else{
        validHandler(false);
      }
    };
    validateCardData();
  },[first,second,third,fourth,month,year,cvv,validHandler])

  const handleCardNoInput = (e:ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      let name = e.target.name;
      let value = e.target.value;
      if (name === "card_no_1") { 
        if(value.length === 4) input2Ref.focus();
        setFirst(value);
      }
      else if (name === "card_no_2"){
        if(value.length === 4) input3Ref.focus();
        setSec(value);
      } 
      else if (name === "card_no_3"){
        if(value.length === 4) input4Ref.focus();
        setThird(value);
      } 
      else if (name === "card_no_4"){
        if(value.length === 4) inputM.focus();
        setFourth(value);
      } 
      else if (name === "expiry__m"){
        if(value.length === 2) inputY.focus();
        setMonth(value);
      } 
      else if (name === "expiry__y") {
        if(value.length === 2) inputCvv.focus();
        setYear(value);
      }
      else setCvv(value);
      setUserSelection(name, value);
    }
  };



  return (
    <>
      <div className="credit-card-container">
        <div className="visa">VISA</div>
        <div>Platinum</div>
        <div className="card-no">
          <input
            autoFocus
            ref={(btn)=>{input1Ref=btn}}
            placeholder="****"
            maxLength={4}
            onChange={handleCardNoInput}
            name="card_no_1"
            value={first}
          />
          <input
            ref={(btn)=>{input2Ref=btn}}
            placeholder="****"
            maxLength={4}
            onChange={handleCardNoInput}
            name="card_no_2"
            value={second}
          />
          <input
            ref={(btn)=>{input3Ref=btn}}
            placeholder="****"
            maxLength={4}
            onChange={handleCardNoInput}
            name="card_no_3"
            value={third}
          />
          <input
            ref={(btn)=>{input4Ref=btn}}
            placeholder="****"
            maxLength={4}
            onChange={handleCardNoInput}
            name="card_no_4"
            value={fourth}
          />
        </div>
        <div className="ccv-row flex">
          <div className="year-month">
            <div>MM/YY</div>
            <div className="flex">
              <input
            ref={(btn)=>{inputM=btn}}
                placeholder="mm"
                maxLength={2}
                onChange={handleCardNoInput}
                name="expiry__m"
                value={month}
              />
              <span>/</span>
              <input
            ref={(btn)=>{inputY=btn}}
                placeholder="yy"
                maxLength={2}
                onChange={handleCardNoInput}
                name="expiry__y"
                value={year}
              />
            </div>
          </div>
          <div className="ccv">
            <div>CVV</div>
            <div className="flex">
              <input
            ref={(btn)=>{inputCvv=btn}}
                placeholder="***"
                maxLength={3}
                onChange={handleCardNoInput}
                name="cvv"
                value={cvv}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
