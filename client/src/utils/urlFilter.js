export const urlFilter = (name) =>{
    if(!name){
        return ""
    }
    const url = `${name.replaceAll(" ","-").replaceAll(",","-").replaceAll("&","-")}`
    return url
}

