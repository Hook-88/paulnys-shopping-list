export default function getCapString(string) {

    return string[0] ? string[0].toUpperCase() + string.slice(1).toLowerCase() : ""
}
