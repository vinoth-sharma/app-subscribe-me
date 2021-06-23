import "./payment.scss";

export function PaymentDetails() {
  return (
    <>
      <div className="credit-card-container">
        <div className="visa">VISA</div>
        <div>Platinum</div>
        <div className="card-no">
          <input placeholder="****" maxLength={4} />
          <input placeholder="****" maxLength={4} />
          <input placeholder="****" maxLength={4} />
          <input placeholder="****" maxLength={4} />
        </div>
        <div className="ccv-row flex">
          <div className="year-month">
            <div>MM/YY</div>
            <div className="flex">
              <input placeholder="**" maxLength={2} />
              <span>/</span>
              <input placeholder="**" maxLength={2} />
            </div>
          </div>
          <div className="ccv">
            <div>CCV</div>
            <div className="flex">
              <input placeholder="***" maxLength={3} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
