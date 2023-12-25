function isUserNameNotEmpty(firstName, lastName) {
    if (firstName.length > 0 && lastName.length > 0) return true;
    return false;
}

function isUserNameDifferent(
    firstName,
    lastName,
    newFirstName,
    newLastName
) {
    if (firstName !== newFirstName || lastName !== newLastName) return true;
    return false;
}

export function userNameChecker(
    firstName,
    lastName,
    newFirstName,
    newLastName
) {
    if (
        isUserNameNotEmpty(newFirstName, newLastName) &&
        isUserNameDifferent(firstName, lastName, newFirstName, newLastName)
    )
        return true;
    return false;
}
