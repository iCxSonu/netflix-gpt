

export const CheckValidate = (email, password,name) => {

    const isEmailValidate = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email)
    // const isPasswordValidate = /^ (?=.*\d)(?=.* [a - z])(?=.* [A - Z])(?=.* [a - zA - Z]).{ 8,} $/.test(password)
    // const isPasswordValidate = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$).{8, 20}$/.test(password)
    // const isPasswordValidate = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)

    const isPasswordValidate = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password)

    // creating for the name validation
    // const isNameValidate = /(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/.test(name)

    if (!isEmailValidate) return "Email is Not Valid"
    if (!isPasswordValidate) return "Password is Not Valid"
    // if (!isNameValidate) return "Name Is Not Valid"
    
    return null
    
}