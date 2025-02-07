import moment from 'moment'

export function getPrettyDateTime(dateStr) {
    return getMomentDate(dateStr).format('MMMM Do YYYY, h:mm:ss a')
}

export function getPrettyDate(dateStr) {
    return getMomentDate(dateStr).format('MMMM Do YYYY')
}

export function getMomentDate(dateS) {
    return moment(dateS*1000)
}

export const getUserFromResponse = response => {
    return {
        email: response.email,
        roles: response.roles,
        firstName: response.firstName,
        healthFacilityName: response.healthFacilityName,
        userId: response.userId,
        vhtList: response.vhtList
    }
}
