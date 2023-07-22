export const generateId = () => {
    const random = Math.random().toString(36).substring(2);
    const date = Date.now().toString(36);
    return random + date;
}

export const generateDate = () => {
    const date = new Date();
    const config = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
    return date.toLocaleDateString('en-US', config);
}

export const formatBudget = (amount) => {
    return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
    })
}