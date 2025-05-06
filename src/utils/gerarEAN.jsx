export function gerarEAN() {
    const prefixo = '789'
    const randomNumber = String(Math.floor(Math.random() * 9999999999))
    const EAN = prefixo + randomNumber
    return EAN
}

