document.addEventListener('DOMContentLoaded', () => {

    const portfolioForm = document.querySelector('.generator-form');
    const previewContainer = document.getElementById('portfolio-preview');
    portfolioForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const fullName = document.getElementById('fullName').value;
        const jobTitle = document.getElementById('jobTitle').value;
        const bio = document.getElementById('bio').value;
        const skillsInput = document.getElementById('skills').value;
        const skills = skillsInput.split(',').map(skill => skill.trim()).filter(skill => skill); 
        const portfolioData = {
            name: fullName,
            title: jobTitle,
            description: bio,
            skillList: skills
        };
        const generatedHTML = `
            <h2 style="text-align: center; margin-top: 3rem; margin-bottom: 1rem;">Preview Portofoliu</h2>
            <header class="portfolio-header">
                <h1>${portfolioData.name || 'Numele Tău'}</h1>
                <p>${portfolioData.title || 'Titlul Tău Profesional'}</p>
            </header>
            <section class="portfolio-section">
                <h2>Despre Mine</h2>
                <p>${portfolioData.description || 'Descrierea ta va apărea aici.'}</p>
            </section>
            <section class="portfolio-section">
                <h2>Abilități Tehnice</h2>
                <ul class="skills-list">
                    ${portfolioData.skillList.map(skill => `<li>${skill}</li>`).join('')}
                </ul>
            </section>
        `;
        previewContainer.innerHTML = generatedHTML;
    });
});