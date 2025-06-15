export const urlFilter = (name) =>{
    const url = `${name.replaceAll(" ","-").replaceAll(",","-").replaceAll("&","-")}`
    return url
}

