export function gerarEAN() {
    const prefixo = 789
    const randomNumber = Math.floor(Math.random() * 9999999999)
    const EAN = `${prefixo}${randomNumber}`;
    return Number(EAN);
}

