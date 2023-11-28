import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../store/UserSlice';
import { userNameChecker } from './ProfileTools';

export default function Profile() {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const [edit, setEdit] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleUserEdit = (e) => {
        e.preventDefault();
        if (userNameChecker(user.body.firstName, user.body.lastName, firstName, lastName)) {
            const token = localStorage.getItem('jwtToken');
            const data = { token: token, user: { firstName, lastName } };
            dispatch(updateUserProfile(data));
            handleResetInput();
        }
    };

    const handleResetInput = () => {
        setEdit(false);
        setFirstName('');
        setLastName('');
    };

    return (
        <main className="main bg-dark">
            <div className="header">
                <h1>
                    Welcome back
                    <br />
                    {edit ? (
                        <form id="userEditForm" onSubmit={handleUserEdit}>
                            <div className="user-name-input-wrapper">
                                <input
                                    type="text"
                                    id="firstName"
                                    placeholder={user.body.firstName}
                                    value={firstName}
                                    onChange={(e) =>
                                        setFirstName(e.target.value)
                                    }
                                />
                                <input
                                    type="text"
                                    id="lastName"
                                    placeholder={user.body.lastName}
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="edit-buttons-wrapper">
                                <button className="edit-button" type="submit">
                                    Save
                                </button>
                                <button
                                    className="edit-button"
                                    type="button"
                                    onClick={handleResetInput}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    ) : (
                        <span>
                            {user.body.firstName} {user.body.lastName}
                        </span>
                    )}
                </h1>

                {edit ? (
                    <></>
                ) : (
                    <button
                        className="edit-button"
                        type="button"
                        onClick={() => setEdit(true)}
                    >
                        Edit Name
                    </button>
                )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">
                        Argent Bank Checking (x8349)
                    </h3>
                    <p className="account-amount">$2,082.79</p>
                    <p className="account-amount-description">
                        Available Balance
                    </p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">
                        View transactions
                    </button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">
                        Argent Bank Savings (x6712)
                    </h3>
                    <p className="account-amount">$10,928.42</p>
                    <p className="account-amount-description">
                        Available Balance
                    </p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">
                        View transactions
                    </button>
                </div>
            </section>
            <section className="account">
                <div className="account-content-wrapper">
                    <h3 className="account-title">
                        Argent Bank Credit Card (x8349)
                    </h3>
                    <p className="account-amount">$184.30</p>
                    <p className="account-amount-description">
                        Current Balance
                    </p>
                </div>
                <div className="account-content-wrapper cta">
                    <button className="transaction-button">
                        View transactions
                    </button>
                </div>
            </section>
        </main>
    );
}
