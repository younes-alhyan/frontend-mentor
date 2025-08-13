document.addEventListener('DOMContentLoaded', () => {
    const url = 'https://api.adviceslip.com/advice';
    const title = document.getElementById('advice-title');
    const advice = document.getElementById('advice');
    const button = document.getElementById('dice-button');
    async function generateAdvice() {
        const responce = await fetch(url,{
            cache: 'no-cache' // Disable caching
        });
        const data = await responce.json();
        title.innerText = `ADVICE #${data.slip.id}`;
        advice.innerHTML = `&ldquo;${data.slip.advice}&rdquo;`
    }
    button.addEventListener('click',generateAdvice);
})
