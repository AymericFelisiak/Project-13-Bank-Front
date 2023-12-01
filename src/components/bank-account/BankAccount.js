import React from 'react';

export default function BankAccount({
    accountName,
    accountAmount,
    description
}) {
    return (
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">{accountName}</h3>
                <p className="account-amount">${accountAmount}</p>
                <p className="account-amount-description">{description}</p>
            </div>
            <div className="account-content-wrapper cta">
                <button className="transaction-button">
                    View transactions
                </button>
            </div>
        </section>
    );
}
