
const baseUrl = 'https://api-prd.spi.co.th/fair-event-order'


const config = () => {
    // localStorage.setItem("token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJ1c2VybmFtZSI6InBvcm5jaGFpIiwidXNlcl9pZCI6MSwicGFzc19lZGl0IjoiMSIsInJvbGVzIjp7InZpcCI6dHJ1ZSwiaG9tZSI6dHJ1ZSwiYWRtaW4iOnRydWUsImRvbmF0ZSI6dHJ1ZSwiZXhwb3J0Ijp0cnVlLCJtZ3VzZXIiOnRydWUsInBlcmlvZCI6dHJ1ZSwic2VsbGVyIjp0cnVlLCJjb250YWN0Ijp0cnVlLCJwcm9maWxlIjp0cnVlLCJzaGlwcGluZyI6dHJ1ZSwiZGFzaGJvYXJkIjp0cnVlLCJwbGFuc2V0dXAiOnRydWUsInNhaGFncm91cCI6dHJ1ZSwiZG9uYXRlYWRtaW4iOnRydWUsInBhcmtpbmd0aWNrZXQiOnRydWUsInNhaGFncm91cEFkbWluIjp0cnVlfSwibGluZW5hbWUiOm51bGwsInJlZ2lzcmVmIjpudWxsLCJjdXNfbnVtYmVyIjoiNTEwMDA1IiwiY3VzX2NvbXBhbnkiOiLguJrguKPguLTguKnguLHguJcg4LmA4Lia4Liq4LiX4LmMIOC5geC4n-C4hOC4leC4reC4o-C4teC5iCDguYDguK3guLLguJfguYzguYDguKXguYfguJcg4LiI4Liz4LiB4Lix4LiUIiwiY3VzX2FkZHJlc3MiOiI2Mjkg4Lir4Lih4Li54LmIIDExIOC4luC4meC4meC4quC4uOC4guC4suC4oOC4tOC4muC4suC4pSA4IiwiY3VzX2Rpc3RyaWN0Ijoi4Lit4Liz4LmA4Lig4Lit4Lio4Lij4Li14Lij4Liy4LiK4LiyIiwiY3VzX3Byb3ZpbmNlIjoi4LiI4Lix4LiH4Lir4Lin4Lix4LiU4LiK4Lil4Lia4Li44Lij4Li1IiwiY3VzX3ppcGNvZGUiOiIyMDIzMCIsImN1c190YXhpZCI6IjAyNTU1MzcwMDAyNjAiLCJpZCI6MX0sInVzZXJBYmlsaXRpZXMiOnsiYWRtaW4iOnRydWUsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE3MTU3MzgwMjEsImV4cCI6MTcxNTc1MjQyMX0.mb7BTQrIDKK18R6vz6HWKiHz0IfzfrEqTpScq3ayzdM")
    const getToken = localStorage.getItem("token")
    // console.log("getToken", getToken)
    if (getToken === null) {

        window.location.replace('https://sahagroup.com/fair/views/login.html')

    }

    return {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken}`
                // 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRGF0YSI6eyJ1c2VybmFtZSI6ImthY2hhdGhvbiIsInVzZXJfaWQiOjMsInBhc3NfZWRpdCI6IjEiLCJyb2xlcyI6eyJ2aXAiOnRydWUsImhvbWUiOnRydWUsImFkbWluIjp0cnVlLCJkb25hdGUiOnRydWUsImV4cG9ydCI6dHJ1ZSwibWd1c2VyIjp0cnVlLCJwZXJpb2QiOnRydWUsInNlbGxlciI6dHJ1ZSwiY29udGFjdCI6dHJ1ZSwicHJvZmlsZSI6dHJ1ZSwic2hpcHBpbmciOnRydWUsImRhc2hib2FyZCI6dHJ1ZSwicGxhbnNldHVwIjp0cnVlLCJzYWhhZ3JvdXAiOnRydWUsImRvbmF0ZWFkbWluIjp0cnVlLCJwYXJraW5ndGlja2V0Ijp0cnVlLCJzYWhhZ3JvdXBBZG1pbiI6dHJ1ZX0sImxpbmVuYW1lIjpudWxsLCJyZWdpc3JlZiI6bnVsbCwiY3VzX251bWJlciI6IjUxMDAwNSIsImN1c19jb21wYW55Ijoi4Lia4Lij4Li04Lip4Lix4LiXIOC5gOC4muC4quC4l-C5jCDguYHguJ_guITguJXguK3guKPguLXguYgg4LmA4Lit4Liy4LiX4LmM4LmA4Lil4LmH4LiXIOC4iOC4s-C4geC4seC4lCIsImN1c19hZGRyZXNzIjoiNjI5IOC4q-C4oeC4ueC5iCAxMSDguJbguJnguJnguKrguLjguILguLLguKDguLTguJrguLLguKUgOCIsImN1c19kaXN0cmljdCI6IuC4reC4s-C5gOC4oOC4reC4qOC4o-C4teC4o-C4suC4iuC4siIsImN1c19wcm92aW5jZSI6IuC4iOC4seC4h-C4q-C4p-C4seC4lOC4iuC4peC4muC4uOC4o-C4tSIsImN1c196aXBjb2RlIjoiMjAyMzAiLCJjdXNfdGF4aWQiOiIwMjU1NTM3MDAwMjYwIiwiaWQiOjN9LCJ1c2VyQWJpbGl0aWVzIjp7ImFkbWluIjp0cnVlLCJyb2xlIjoiYWRtaW4ifSwiaWF0IjoxNzE0MDE1NjA3LCJleHAiOjE3MjQwMjUwMDd9.7XQjqDjxXZUOycuHOo716wjkwTRIuVutSkfZ0u2ngLk '

            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        // body: JSON.stringify(data) // body data type must match "Content-Type" header
    }
}


export const getFormItem = async (masterId, formId) => {
    console.log("masterId", masterId);
    const url = ` ${baseUrl}/fair/${masterId}/forms/${formId}`

    const response = await fetch(url, config())
    const dataOBJ = await response.json()


    return dataOBJ

}

export const getFormHistory = async () => {
    const url = ` ${baseUrl}/forms/history`

    const response = await fetch(url, config())
    const dataOBJ = await response.json()


    return dataOBJ

}

export const getForm = async (masterId) => {
    const url = ` ${baseUrl}/fair/${masterId}/forms`

    const response = await fetch(url, config())
    const dataOBJ = await response.json()


    return dataOBJ

}

export const cancelForm = async (id_fair, id_tran, id_form_q) => {
    const url = ` ${baseUrl}/forms/${id_fair}/form_request/${id_tran}/${id_form_q}`

    const response = await fetch(url, { ...config(), method: "PATCH" })
    const dataOBJ = await response.json()


    return dataOBJ

}

export const delForm = async (id_fair, id_tran, id_form_q) => {
    const url = ` ${baseUrl}/forms/${id_fair}/form_request/${id_tran}/${id_form_q}`

    const response = await fetch(url, { ...config(), method: "DELETE" })
    const dataOBJ = await response.json()


    return dataOBJ

}


export const AddForm = async (data, id) => {
    const url = ` ${baseUrl}/forms/${id}`

    const response = await fetch(url, { ...config(), method: "POST", body: JSON.stringify({ ...data }) })
    const dataOBJ = await response.json()


    return dataOBJ

}

export const getAddress = async () => {
    const url = ` ${baseUrl}/address`

    const response = await fetch(url, config())
    const dataOBJ = await response.json()


    return dataOBJ

}

export const insertAddress = async (data) => {
    const url = ` ${baseUrl}/address`
    const response = await fetch(url, { ...config(), method: "POST", body: JSON.stringify({ ...data }) })
    const dataOBJ = await response.json()

    return dataOBJ

}

export const updateAddress = async (data, id) => {
    const url = ` ${baseUrl}/address/${id}`
    const response = await fetch(url, { ...config(), method: "PATCH", body: JSON.stringify({ ...data }) })
    const dataOBJ = await response.json()

    return dataOBJ

}

export const delAddress = async (id) => {
    const url = ` ${baseUrl}/address/${id}`
    const response = await fetch(url, { ...config(), method: "DELETE" })

    const dataOBJ = await response.json()

    return dataOBJ

}


export const getTrans = async (masterId) => {
    const url = ` ${baseUrl}/fair/${masterId}/trans`

    const response = await fetch(url, config())
    const dataOBJ = await response.json()


    return dataOBJ

}

export const getProvinces = async () => {
    const url = ` ${baseUrl}/address/provinces`

    const response = await fetch(url, { ...config(), method: "POST" })
    const dataOBJ = await response.json()


    return dataOBJ

}

export const getAmphures = async (province_id) => {
    const url = ` ${baseUrl}/address/amphures`

    const response = await fetch(url, { ...config(), method: "POST", body: JSON.stringify({ province_id }) })
    const dataOBJ = await response.json()


    return dataOBJ

}

export const getDistricts = async (amphure_id) => {
    const url = ` ${baseUrl}/address/districts`

    const response = await fetch(url, { ...config(), method: "POST", body: JSON.stringify({ amphure_id }) })
    const dataOBJ = await response.json()


    return dataOBJ

}

