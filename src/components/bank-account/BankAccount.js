import React from 'react';

/**
 * Component of the bank account descriptions
 * Shows the available balance of the account
 * The transaction button will redirect to the account detail
 */

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
