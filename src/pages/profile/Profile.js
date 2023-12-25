import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../store/UserSlice';
import { userNameChecker } from './ProfileTools';
import AccountData from '../../mock/AccountData.json' 
import BankAccount from '../../components/bank-account/BankAccount';

/**
 * Profile pages of the user
 * Only accessible when connected
 * Retrieves the user state and shows his accounts' data (the data are placeholders for now)
 */

export default function Profile() {
    // Retrieves user state
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    // Edit checks if the user is currently editing his first name and last name
    const [edit, setEdit] = useState(false);

    // Changes when the user is currently editing their infos
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    // Handler when the user clicks "Save" when editing their infos
    const handleUserEdit = (e) => {
        e.preventDefault();
        if (userNameChecker(user.body.firstName, user.body.lastName, firstName, lastName)) {
            const token = localStorage.getItem('jwtToken');
            const data = { token: token, user: { firstName, lastName } };
            dispatch(updateUserProfile(data));
            handleResetInput();
        }
    };

    // Handler when the user clicks "Cancel" when editing their infos
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
            {AccountData.map(({accountName, accountAmount, description}, index) => {
                return <BankAccount key={index} accountName={accountName} accountAmount={accountAmount} description={description}/>
            })}
        </main>
    );
}
